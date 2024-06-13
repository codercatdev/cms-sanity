import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  type AuthProvider,
  setPersistence,
  signOut,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  type DocumentData,
  initializeFirestore,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { httpsCallable, getFunctions } from "firebase/functions";
import {
  getAnalytics,
  logEvent,
  type AnalyticsCallOptions,
} from "firebase/analytics";

import { getStorage } from "firebase/storage";
import { jwtDecode } from "jwt-decode";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};

export let app = getApps().at(0);

if (
  !app &&
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId &&
  firebaseConfig.measurementId
) {
  app = initializeApp(firebaseConfig);

  // As httpOnly cookies are to be used, do not persist any state client side.
  // setPersistence(auth, inMemoryPersistence);

  // Using both httpOnly cookies and local state in auth.
  //Indicates that the state will be persisted even when the browser window is closed or the activity is destroyed in React Native. An explicit sign out is needed to clear that state. Note that Firebase Auth web sessions are single host origin and will be persisted for a single domain only.
  setPersistence(getAuth(app), browserLocalPersistence);

  // If the client idToken changes lets make sure to update our cookie
  // TODO: Validate if expiration should change based on new token
  onAuthStateChanged(getAuth(app), async (user) => {
    const currentUser = getAuth(app).currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken(true);
      if (idToken) {
        await setCookies(idToken);
      }
    }
  });

  initializeFirestore(app, { ignoreUndefinedProperties: true });
  if (typeof window !== "undefined") {
    getAnalytics(app);
  }
  getStorage(app);
} else {
  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId ||
    !firebaseConfig.storageBucket ||
    !firebaseConfig.messagingSenderId ||
    !firebaseConfig.appId ||
    !firebaseConfig.measurementId
  )
    console.debug("Skipping Firebase Initialization, check firebaseconfig.");
}

/* AUTH */

const getUidFromIdtCookie = (): string | undefined => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("app.idt" + "=")) {
      const cookieJwt = cookie.substring("app.idt".length + 1);
      const jwt = jwtDecode(cookieJwt);
      return jwt.sub;
    }
  }
  return undefined;
};

const setCookies = async (idToken: string) => {
  // Sets HttpOnly cookie app.at (aka session cookie)
  // and JS available app.idt
  const sessionResp = await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken, redirectUrl: window.location.href }),
  });
  if (sessionResp.status !== 200) throw "Failed Fetch for Session Token";
};

export const ccdSignInWithPopUp = async (provider: AuthProvider) => {
  const appAuth = getAuth(app);
  const result = await signInWithPopup(appAuth, provider);
  const idToken = await result.user.getIdToken();

  if (!idToken) throw "Missing id Token";
  await setCookies(idToken);
};

export const ccdSignOut = async () => {
  const appAuth = getAuth(app);
  await signOut(appAuth);
};

/* DB */
export const updateUser = async (docRef: string, data: DocumentData) => {
  return setDoc(doc(getFirestore(), docRef), data, { merge: true });
};

/* STRIPE */
export const addSubscription = async (productRole: string) => {
  //Get app.idt cookie
  const uid = getUidFromIdtCookie();
  if (!uid) throw "Missing User ID";

  // Get Product
  const productsQuery = await query(
    collection(getFirestore(), "stripe-products"),
    where("active", "==", true),
    where("role", "==", productRole)
  );
  const productsSnapshot = await getDocs(productsQuery);
  const productId = productsSnapshot.docs[0].id;

  if (!productId) throw "Missing Product ID";

  // Get Price
  const pricesQuery = await query(
    collection(
      doc(collection(getFirestore(), "stripe-products"), productId),
      "prices"
    ),
    where("active", "==", true)
  );
  const pricesSnapshot = await getDocs(pricesQuery);
  const price = pricesSnapshot.docs[0].id;

  if (!price) throw "Missing Price ID";

  // Create Checkout Session

  const userDoc = doc(collection(getFirestore(), "stripe-customers"), uid);
  return await addDoc(collection(userDoc, "checkout_sessions"), {
    price,
    success_url: window.location.href,
    cancel_url: window.location.href,
  });
};

/* FUNCTIONS */
export const openStripePortal = async () => {
  const functionRef = httpsCallable(
    getFunctions(app),
    "ext-firestore-stripe-payments-createPortalLink"
  );
  const { data } = (await functionRef({
    returnUrl: window.location.href,
  })) as { data: { url: string } };
  window.location.assign(data.url);
};

/* Analytics */
export const analyticsLogPageView = async (
  eventParams?: {
    page_title?: string;
    page_location?: string;
    page_path?: string;
    [key: string]: any;
  },
  options?: AnalyticsCallOptions
) => {
  if (firebaseConfig.apiKey) {
    logEvent(getAnalytics(app), "page_view", eventParams, options);
  } else {
    console.debug("Skipping Firebase Analytics, no key specified.");
  }
};

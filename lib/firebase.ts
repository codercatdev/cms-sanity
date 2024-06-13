import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  type AuthProvider,
  type Auth,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signOut,
  getIdToken,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  Firestore,
  setDoc,
  type DocumentData,
  initializeFirestore,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import {
  httpsCallable,
  getFunctions,
  type Functions,
} from "firebase/functions";
import {
  getAnalytics,
  type Analytics,
  logEvent,
  type AnalyticsCallOptions,
} from "firebase/analytics";

import { getStorage, type FirebaseStorage } from "firebase/storage";
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
export let auth: Auth;
export let firestore: Firestore;
export let functions: Functions;
export let analytics: Analytics;
export let storage: FirebaseStorage;

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
  auth = getAuth(app);

  // As httpOnly cookies are to be used, do not persist any state client side.
  // setPersistence(auth, inMemoryPersistence);
  firestore = initializeFirestore(app, { ignoreUndefinedProperties: true });
  functions = getFunctions(app);
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
  storage = getStorage(app);
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

export const ccdSignInWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userResponse = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userResponse.user.getIdToken();
  await setCookies(idToken);
};

export const ccdSignUpWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const idToken = await userCredential.user.getIdToken();
  await setCookies(idToken);
};

export const ccdSignInWithPopUp = async (provider: AuthProvider) => {
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();

  if (!idToken) throw "Missing id Token";
  await setCookies(idToken);
};

export const ccdSignOut = async () => {
  const auth = getAuth(app);
  await signOut(auth);
};

/* DB */
export const updateUser = async (docRef: string, data: DocumentData) => {
  return setDoc(doc(firestore, docRef), data, { merge: true });
};

/* STRIPE */
export const addSubscription = async (productRole: string) => {
  //Get app.idt cookie
  const uid = getUidFromIdtCookie();
  if (!uid) throw "Missing User ID";

  // Get Product
  const productsQuery = await query(
    collection(firestore, "stripe-products"),
    where("active", "==", true),
    where("role", "==", productRole)
  );
  const productsSnapshot = await getDocs(productsQuery);
  const productId = productsSnapshot.docs[0].id;

  if (!productId) throw "Missing Product ID";

  // Get Price
  const pricesQuery = await query(
    collection(
      doc(collection(firestore, "stripe-products"), productId),
      "prices"
    ),
    where("active", "==", true)
  );
  const pricesSnapshot = await getDocs(pricesQuery);
  const price = pricesSnapshot.docs[0].id;

  if (!price) throw "Missing Price ID";

  // Create Checkout Session

  const userDoc = doc(collection(firestore, "stripe-customers"), uid);
  return await addDoc(collection(userDoc, "checkout_sessions"), {
    price,
    success_url: window.location.origin + "/stripe", // Forces session update
    cancel_url: window.location.origin,
  });
};

/* FUNCTIONS */
export const openStripePortal = async () => {
  const functionRef = httpsCallable(
    functions,
    "ext-firestore-stripe-payments-createPortalLink"
  );
  const { data } = (await functionRef({
    returnUrl: window.location.origin + "/stripe", // Forces session update
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
    logEvent(analytics, "page_view", eventParams, options);
  } else {
    console.debug("Skipping Firebase Analytics, no key specified.");
  }
};

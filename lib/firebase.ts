import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  type AuthProvider,
  type Auth,
  createUserWithEmailAndPassword,
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
import { redirect } from "next/dist/server/api-utils";

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
  // setPersistence(auth, browserSessionPersistence);
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

const setCookies = async (idToken: string) => {
  document.cookie = "app.idt=" + idToken + ";max-age=3600";

  // Sets HttpOnly cookie app.csrf
  const csrfResp = await fetch("/api/auth/csrf");
  if (csrfResp.status !== 200) throw "Failed Fetch for CSRF";

  // Sets HttpOnly cookie app.at (aka session cookie)
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

/* DB */
export const updateUser = async (docRef: string, data: DocumentData) => {
  return setDoc(doc(firestore, docRef), data, { merge: true });
};

/* STRIPE */
export const addSubscription = async (price: string, uid: string) => {
  const userDoc = doc(collection(firestore, "stripe-customers"), uid);
  return await addDoc(collection(userDoc, "checkout_sessions"), {
    price,
    success_url: window.location.href,
    cancel_url: window.location.href,
  });
};

/* FUNCTIONS */
export const openStripePortal = async () => {
  const functionRef = httpsCallable(
    functions,
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
    logEvent(analytics, "page_view", eventParams, options);
  } else {
    console.debug("Skipping Firebase Analytics, no key specified.");
  }
};

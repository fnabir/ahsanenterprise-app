import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getDatabase, Database } from "firebase/database";
import { getFirebaseConfig } from "./config";

// Initialize Firebase
const config = getFirebaseConfig();
const apps = getApps();
export const app =
  apps.length === 0 ? initializeApp(config) : (apps[0] as FirebaseApp);

const isDevelopment = process.env.NODE_ENV === "development";

if (typeof window !== "undefined") {
  if (isDevelopment) {
    (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(config.recaptchaV3SiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}

// Export ready-to-use instances
export const database: Database = getDatabase(app);

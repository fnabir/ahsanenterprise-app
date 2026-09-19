import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getFirebaseConfig } from "../config";

const config = getFirebaseConfig();
const apps = getApps();
export const app =
  apps.length === 0 ? initializeApp(config) : (apps[0] as FirebaseApp);

// Export native Firebase modules
export const database: Database = getDatabase(app);

const env = (import.meta as any).env || (window as any);

export const firebaseConfig = {
  apiKey: env['NG_APP_FIREBASE_API_KEY'] || '',
  authDomain: env['NG_APP_FIREBASE_AUTH_DOMAIN'] || '',
  projectId: env['NG_APP_FIREBASE_PROJECT_ID'] || '',
  appId: env['NG_APP_FIREBASE_APP_ID'] || '',
  measurementId: env['NG_APP_FIREBASE_MEASUREMENT_ID'] || '',
};

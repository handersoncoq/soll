import { environment } from './environment';

export const firebaseConfig = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
  appId: environment.firebase.appId,
  measurementId: environment.firebase.measurementId,
};

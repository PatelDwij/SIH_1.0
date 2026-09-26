import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  Auth,
  AuthError,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase App safely (prevent multiple instances in Next.js Fast Refresh)
export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export Auth instance
export const auth: Auth = getAuth(app);

// Export Auth listeners and utilities
export { onAuthStateChanged, updateProfile };
export type { User };

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Type definitions for helper responses
export interface AuthResult {
  user: User | null;
  error: string | null;
  credential?: UserCredential;
}

export interface SignOutResult {
  success: boolean;
  error: string | null;
}

/**
 * Format human-readable Firebase Auth error messages
 */
export function formatAuthError(error: unknown): string {
  if (!error) return "An unknown error occurred.";
  const authErr = error as AuthError;

  switch (authErr.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please verify your credentials.";
    case "auth/email-already-in-use":
      return "An account with this email address already exists.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact your IMD administrator.";
    case "auth/popup-closed-by-user":
      return "Google sign-in popup was closed before completion.";
    case "auth/popup-blocked":
      return "Sign-in popup was blocked by your browser. Please allow popups for this site.";
    case "auth/network-request-failed":
      return "Network connection failed. Please check your internet connectivity.";
    case "auth/too-many-requests":
      return "Too many failed login attempts. Access has been temporarily restricted for security.";
    default:
      return authErr.message || "Authentication failed. Please try again.";
  }
}

/**
 * Sign in an existing user with email and password
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return {
      user: credential.user,
      error: null,
      credential,
    };
  } catch (error) {
    return {
      user: null,
      error: formatAuthError(error),
    };
  }
}

/**
 * Register a new user with email, password, and optional display name
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (displayName && credential.user) {
      try {
        await updateProfile(credential.user, { displayName });
      } catch (profileErr) {
        console.warn("[Firebase] Could not update profile displayName:", profileErr);
      }
    }
    return {
      user: credential.user,
      error: null,
      credential,
    };
  } catch (error) {
    return {
      user: null,
      error: formatAuthError(error),
    };
  }
}

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const credential = await signInWithPopup(auth, googleProvider);
    return {
      user: credential.user,
      error: null,
      credential,
    };
  } catch (error) {
    return {
      user: null,
      error: formatAuthError(error),
    };
  }
}

/**
 * Sign out current authenticated user
 */
export async function signOutUser(): Promise<SignOutResult> {
  try {
    await signOut(auth);
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: formatAuthError(error),
    };
  }
}

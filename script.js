// Import Firebase SDKs (v10+ modular syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAA7IdiY_fg8yZpvy_pKgTT7LIjEkelN6U",
  authDomain: "sense-sync-c615a.firebaseapp.com",
  projectId: "sense-sync-c615a",
  storageBucket: "sense-sync-c615a.appspot.com",
  messagingSenderId: "179674607290",
  appId: "1:179674607290:web:27da9858c241babb1fdc83",
  measurementId: "G-M7WNNY76VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// =============================
// Google Login
// =============================
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`✅ Google login successful! Welcome ${user.displayName}`);
      console.log("User:", user);
    } catch (error) {
      console.error("Google login failed:", error.message);
      alert("❌ Google login failed: " + error.message);
    }
  });
}

// =============================
// Email/Password Auth
// =============================
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const emailLoginBtn = document.getElementById("emailLoginBtn");
const emailSignUpBtn = document.getElementById("emailSignUpBtn");
const resetPasswordBtn = document.getElementById("resetPasswordBtn");

// Sign Up
if (emailSignUpBtn) {
  emailSignUpBtn.addEventListener("click", async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      alert(`✅ Account created for ${userCred.user.email}`);
    } catch (error) {
      alert("❌ Sign-up failed: " + error.message);
    }
  });
}

// Login
if (emailLoginBtn) {
  emailLoginBtn.addEventListener("click", async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      alert(`✅ Logged in as ${userCred.user.email}`);
    } catch (error) {
      alert("❌ Login failed: " + error.message);
    }
  });
}

// Reset Password
if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener("click", async () => {
    try {
      await sendPasswordResetEmail(auth, emailInput.value);
      alert("📧 Password reset email sent!");
    } catch (error) {
      alert("❌ Reset failed: " + error.message);
    }
  });
}

// =============================
// Sign Out (optional button)
// =============================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("👋 Signed out");
  });
}

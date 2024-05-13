import { createContext, useState, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};


const firebaseapp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseapp);
const firebaseData = getDatabase(firebaseapp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
export default function FirebaseProvider(props) {
    const [uuid, Setuid] = useState("");
    const [name_user, Setname] = useState("");
    const [isLoading, Setloading] = useState(false);
    const [alerttoggle, SetAlert] = useState({ show: false, msg: "", type: "" });
    const changeAlert = (msg, type) => {
        SetAlert({ show: true, msg: msg, type: type });
        setTimeout(() => {
            SetAlert((prev) => {
                return { ...prev, show: false }
            });
        }, 2000)
    }
    const [login, Setlogin] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        Setlogin(false);
        Setloading(true);
        navigate('/');
        changeAlert("User logged out", "success");
        Setloading(false);
    }
    const loginUser = async (email, password) => {
        try {
            Setloading(true);
            const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
            const user = credentials.user;
            Setuid(user.uid)
            const dbRef = ref(firebaseData);
            const userRef = child(dbRef, `users/${user.uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                Setname(userData.name);
            } else {
                console.log("User data does not exist in the database.");
            }
            navigate('/connect');
            changeAlert("User logged in...", "success");
            Setlogin(true);

        } catch (error) {
            console.error("Error logging in:", error.message);
            switch (error.code) {
                case "auth/user-not-found":
                    changeAlert("There is no user record corresponding to this email.", "warning");
                    break;
                case "auth/invalid-credential":
                    changeAlert("The password is invalid for the given email.", "warning");
                    break;
                case "auth/too-many-requests":
                    changeAlert("Too many login attempts. Please try again later.", "warning");
                    break;
                case "auth/user-disabled":
                    changeAlert("This user account has been disabled.", "warning");
                    break;
                default:
                    changeAlert("An unknown error occurred. Please try again later.", "warning");
                    break;
            }
        } finally {
            Setloading(false);
        }
    }
    const createUser = async (email, password, name, phone, age) => {
        try {
            Setloading(true);
            const Usercreds = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const user = Usercreds.user;
            Setuid(user.uid);
            const userRef = ref(firebaseData, `users/${user.uid}`);
            await set(userRef, {
                name,
                email,
                phone,
                age
            }); 
            Setname(name);
            Setlogin(true);
            changeAlert("Welcome to the Application....", "success");
            navigate('/connect');
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    changeAlert("The email address is already in use by another account.", "danger");
                    break;
                case "auth/invalid-email":
                    changeAlert("The email address is not valid.", "danger");
                    break;
                case "auth/weak-password":
                    changeAlert("The password is too weak.", "danger");
                    break;
                case "auth/operation-not-allowed":
                    changeAlert("Email/password accounts are not enabled.", "danger");
                    break;
                default:
                    changeAlert("An unknown error occurred:", "danger");
                    break;
            }
        } finally {
            Setloading(false);
        }
    }
    const states = {
        alerttoggle,
        changeAlert,
        createUser,
        login,
        logout,
        loginUser,
        isLoading,
        uuid,
        name_user
    }
    return (
        <FirebaseContext.Provider value={states}>
            {props.children}
        </FirebaseContext.Provider>
    );
}
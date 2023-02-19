import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const logOut = () => {
   signOut(auth);
};

export default logOut;

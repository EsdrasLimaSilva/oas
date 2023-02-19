import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import nookies from "nookies";

const signIn = async (email: string, password: string) => {
   try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      nookies.set(undefined, "token", token, { path: "/admin" });

      return userCredential;
   } catch (error) {
      throw error;
   }
};

export default signIn;

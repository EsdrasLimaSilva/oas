import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const signIn = async (email: string, password: string) => {
   try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
   } catch (error) {
      throw error;
   }
};

export default signIn;

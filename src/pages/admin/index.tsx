import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import signIn from "@/services/signIn";
import Head from "next/head";
import { ImSpinner8 } from "react-icons/im";
import styles from "@/styles/admin.module.scss";

const Admin = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({ happened: false, message: "" });
   const router = useRouter();

   const handleSubmit = async (e: FormEvent) => {
      try {
         e.preventDefault();
         setLoading(true);
         const form = e.target as HTMLFormElement;

         const email = (form[0] as HTMLInputElement).value;
         const password = (form[1] as HTMLInputElement).value;

         await signIn(email, password);
         router.replace("/admin/dashboard");
      } catch (error: unknown) {
         const firebaseError = error as FirebaseError;

         switch (firebaseError.code) {
            case "auth/user-not-found":
               setError({ happened: true, message: "Usuário incorreto" });
               break;
            case "auth/wrong-password":
               setError({ happened: true, message: "Senha incorreta" });
               break;
            default:
               setError({ happened: true, message: "Algo deu errado" });
               break;
         }
      } finally {
         setLoading(false);

         setTimeout(() => setError({ happened: false, message: "" }), 4000);
      }
   };

   return (
      <>
         <Head>
            <title>0AS | Admin</title>
         </Head>
         <main className={styles.pageContainer}>
            <h1 className={styles.h1}>
               0AS <sub>admin</sub>
            </h1>

            <form onSubmit={handleSubmit} className={styles.adminForm}>
               <label>
                  usuário
                  <input type="email" required />
               </label>
               <label>
                  senha
                  <input type="password" name="" id="" required />
               </label>

               <button type="submit" className={styles.submitButton} disabled={loading && true}>
                  {loading ? <ImSpinner8 className={styles.spinner} /> : "entrar"}
               </button>
            </form>

            {error.happened && <p className={styles.errorParagraph}>{error.message}</p>}
         </main>
      </>
   );
};

export default Admin;

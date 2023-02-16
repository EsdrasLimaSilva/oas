"use client";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import signIn from "@/services/signIn";
import Head from "next/head";

const Admin = () => {
   const [error, setError] = useState({ happened: false, message: "" });
   const router = useRouter();

   const handleSubmit = async (e: FormEvent) => {
      try {
         e.preventDefault();
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
      }
   };

   return (
      <>
         <Head>
            <title>0AS | Admin</title>
         </Head>
         <main className="min-h-screen bg-neutral-200 flex justify-center items-center flex-col gap-4">
            <h1 className="logo text-4xl text-neutral-800 font-extrabold relative">
               0AS <sub className="font-normal text-xs absolute bottom-0 left-full">admin</sub>
            </h1>

            <form
               className="px-4 py-8 bg-neutral-100 flex flex-col gap-4 shadow-md"
               onSubmit={handleSubmit}
            >
               <label className="flex flex-col gap-2">
                  usuário
                  <input
                     type="email"
                     className="border-2 border-neutral-400 px-4 py-1 outline-none focus:border-primary-500"
                     required
                  />
               </label>
               <label className="flex flex-col gap-2">
                  senha
                  <input
                     type="password"
                     name=""
                     id=""
                     className="border-2 border-neutral-400 px-4 py-1 outline-none focus:border-primary-500"
                     required
                  />
               </label>

               <button
                  type="submit"
                  className="bg-action-500 font-bold text-neutral-100 py-2  mt-4 hover:bg-action-600 transition-all"
               >
                  entrar
               </button>
            </form>

            {error.happened && <p className="bg-error-300 px-4 py-2">{error.message}</p>}
         </main>
      </>
   );
};

export default Admin;

import { auth } from "@/services/firebaseConfig";
import { getIdToken, onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import nookies from "nookies";

export const AuthContext = createContext<{ user: User | null }>({ user: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      return onAuthStateChanged(auth, async (usr) => {
         if (!usr) {
            setUser(null);
            nookies.set(undefined, "token", "", { path: "/admin/dashboard" });
         } else {
            const token = await getIdToken(usr);
            setUser(usr);
            nookies.set(undefined, "token", token, { path: "/admin/dashboard" });
         }
      });
   }, []);

   return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

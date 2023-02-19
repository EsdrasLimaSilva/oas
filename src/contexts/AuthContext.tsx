import { onIdTokenChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import nookies from "nookies";
import { auth } from "@/services/firebaseConfig";

export const AuthContext = createContext<{ user: User | null }>({ user: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);

   return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

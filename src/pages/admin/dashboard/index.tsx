import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useContext } from "react";
import nookies from "nookies";
import { firebaseAdmin } from "@/services/firebaseAdmin";

const Dashboard = () => {
   const user = useContext(AuthContext);
   console.log(user);

   return (
      <>
         <Head>
            <title>0AS | Dashboard</title>
         </Head>
         <main>
            <h2>Este é o dashboard</h2>
         </main>
      </>
   );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
   try {
      const cookies = nookies.get(ctx);
      await firebaseAdmin.auth().verifyIdToken(cookies.token);

      return {
         props: {},
      };
   } catch (error) {
      ctx.res.writeHead(302, { location: "/admin" });
      ctx.res.end();

      return { props: {} as never };
   }
};

export default Dashboard;

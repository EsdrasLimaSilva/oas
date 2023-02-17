import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useContext } from "react";
import nookies from "nookies";
import { firebaseAdmin } from "@/services/firebaseAdmin";
import styles from "@/styles/dashboard.module.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import PostItem from "@/components/PostItem";

const Dashboard = () => {
   const user = useContext(AuthContext);

   return (
      <>
         <Head>
            <title>0AS | Dashboard</title>
         </Head>
         <main className={styles.pageContainer}>
            <h1>0AS</h1>

            <section className={styles.dashboardContainer}>
               <form className={styles.searchBar}>
                  <input type="text" placeholder="encontre um post" />
                  <button type="submit">ir</button>
               </form>

               <ul className={styles.postsList}>
                  <PostItem
                     postTitle="Elementos de hardware e arquitetura de Von Neumann"
                     postId="daçldfpodfa-dadlfçadjk"
                  />
                  <PostItem
                     postTitle="Elementos de hardware e arquitetura de Von Neumann"
                     postId="daçldfpodfa-dadlfçadjk"
                  />
                  <PostItem
                     postTitle="Elementos de hardware e arquitetura de Von Neumann"
                     postId="daçldfpodfa-dadlfçadjk"
                  />
                  <PostItem
                     postTitle="Elementos de hardware e arquitetura de Von Neumann"
                     postId="daçldfpodfa-dadlfçadjk"
                  />
                  <PostItem
                     postTitle="Elementos de hardware e arquitetura de Von Neumann"
                     postId="daçldfpodfa-dadlfçadjk"
                  />
                  <PostItem
                     postTitle="Elementos de hardware e arquitetura de Von Neumann"
                     postId="daçldfpodfa-dadlfçadjk"
                  />
               </ul>
            </section>
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

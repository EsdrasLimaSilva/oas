import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import nookies from "nookies";
import { firebaseAdmin } from "@/services/firebaseAdmin";
import styles from "@/styles/dashboard.module.scss";
import DashboardNewPostForm from "@/components/DashboardNewPostForm";
import { getRecentPosts, Post, ResponsePost } from "@/services/sanityClient";
import PostItem from "@/components/PostItem";

const Dashboard = ({ recentPosts }: { recentPosts: ResponsePost[] }) => {
   const [formVisible, setFormVisible] = useState(false);

   return (
      <>
         <Head>
            <title>0AS | Dashboard</title>
         </Head>
         <main className={styles.pageContainer}>
            {formVisible && <DashboardNewPostForm setVisible={setFormVisible} />}

            <h1>0AS</h1>

            <section className={styles.dashboardContainer}>
               <form className={styles.searchBar}>
                  <input type="text" placeholder="encontre um post" />
                  <button type="submit">ir</button>
               </form>

               <ul className={styles.postsList}>
                  {recentPosts.map((post) => (
                     <PostItem postId={post._id} postTitle={post.title} key={post._id} />
                  ))}
               </ul>
               <button
                  type="button"
                  className={styles.newPostButton}
                  onClick={() => setFormVisible(true)}
               >
                  novo post
               </button>
            </section>
         </main>
      </>
   );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
   try {
      const cookies = nookies.get(ctx);
      await firebaseAdmin.auth().verifyIdToken(cookies.token);

      const recentPosts = await getRecentPosts();

      return {
         props: {
            recentPosts: recentPosts[0].all,
         },
      };
   } catch (error) {
      ctx.res.writeHead(302, { location: "/admin" });
      ctx.res.end();

      return { props: {} as never };
   }
};

export default Dashboard;

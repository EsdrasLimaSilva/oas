import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.scss";
import DashboardNewPostForm from "@/components/DashboardNewPostForm";
import { deletePost, getRecentPosts, ResponsePost } from "@/services/sanityClient";
import PostItem from "@/components/PostItem";
import { BiLogOutCircle } from "react-icons/bi";
import logOut from "@/services/signOut";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";

import { firebaseAdmin } from "@/services/firebaseAdmin";
import DeleteWarning from "@/components/DeleteWarning";

const Dashboard = () => {
   const [recentPosts, setRecentPosts] = useState<ResponsePost[]>([]);
   const [deletePostInfo, setDeletePostInfo] = useState({
      confirmation: false,
      id: "",
      deleting: false,
   });
   const [formVisible, setFormVisible] = useState(false);
   const router = useRouter();

   const handleLogOut = () => {
      logOut();
      router.replace("/admin");
   };

   const handleDelete = (postId: string) => {
      setDeletePostInfo((prev) => ({ ...prev, confirmation: true, id: postId }));
   };

   const handleConfirmDelete = async () => {
      try {
         setDeletePostInfo((prev) => ({ ...prev, deleting: true }));
         await deletePost(deletePostInfo.id);
         const recentPosts = await getRecentPosts();
         setRecentPosts(recentPosts);
      } catch (error) {
         console.log(error);
      } finally {
         setDeletePostInfo((prev) => ({ ...prev, confirmation: false, id: "", deleting: false }));
      }
   };

   const handleCancelDelete = () => {
      setDeletePostInfo((prev) => ({ ...prev, confirmation: false, id: "" }));
   };

   useEffect(() => {
      (async () => {
         const recentPosts = await getRecentPosts();
         setRecentPosts(recentPosts);
      })();
   }, []);

   return (
      <>
         <Head>
            <title>0AS | Dashboard</title>
         </Head>
         <main className={styles.pageContainer}>
            {formVisible && (
               <DashboardNewPostForm setVisible={setFormVisible} setRecentPosts={setRecentPosts} />
            )}
            {deletePostInfo.confirmation && (
               <DeleteWarning
                  handleCancelDelete={handleCancelDelete}
                  handleConfirmDelete={handleConfirmDelete}
                  deletingPost={deletePostInfo.deleting}
               />
            )}

            <button type="button" className={styles.logoutButton} onClick={handleLogOut}>
               <BiLogOutCircle />
            </button>

            <h1>0AS</h1>

            <section className={styles.dashboardContainer}>
               <form className={styles.searchBar}>
                  <input type="text" placeholder="encontre um post" />
                  <button type="submit">ir</button>
               </form>

               <ul className={styles.postsList}>
                  {recentPosts.map((post) => (
                     <PostItem
                        postId={post._id}
                        postTitle={post.title}
                        key={post._id}
                        handleDelete={() => handleDelete(post._id)}
                     />
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

      return {
         props: {},
      };
   } catch (error) {
      ctx.res.writeHead(302, { Location: "/admin" });
      ctx.res.end();

      return { props: {} as never };
   }
};

export default Dashboard;

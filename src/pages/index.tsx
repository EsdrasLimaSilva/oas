import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomePost from "@/components/HomePost";
import { getRecentPosts, ResponsePost } from "@/services/sanityClient";
import Head from "next/head";
import styles from "@/styles/home.module.scss";

const Home = ({ recentPosts }: { recentPosts: ResponsePost[] }) => {
   return (
      <>
         <Head>
            <title>0AS | Home</title>
         </Head>
         <Header />
         <main>
            <section className={styles.recentPosts}>
               <h2>Recentes</h2>

               <div className={styles.postList}>
                  {recentPosts.map((post: any) => (
                     <HomePost
                        key={post._id}
                        title={post.title}
                        coverUrl={post.coverUrl}
                        description={post.description}
                     />
                  ))}
               </div>
            </section>
         </main>
         <Footer />
      </>
   );
};

export const getStaticProps = async () => {
   const recentPosts = await getRecentPosts();

   return {
      props: {
         recentPosts: recentPosts[0].all,
      },
   };
};

export default Home;

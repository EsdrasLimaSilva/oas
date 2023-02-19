import PostElement from "@/components/PostElement";
import { getRecentPosts, getSpecificPost, ResponsePost } from "@/services/sanityClient";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/post.module.scss";

const Post = ({ postData }: { postData: ResponsePost }) => {
   const [postContent] = useState(JSON.parse(postData.content));

   return (
      <>
         <Head>
            <title>{postData.title}</title>
            <meta name="description" content={postData.description} />
            <meta name="author" content="Esdras Silva" />
         </Head>
         <header className={styles.headerPostPage}>
            <a href="/">O Analista de Sistemas</a>
         </header>
         <main className={styles.main}>
            <section className={styles.postContent}>
               {postContent.map(
                  (element: {
                     tag: string;
                     key: string;
                     content?: string | undefined;
                     source?: string | undefined;
                     altText?: string | undefined;
                  }) => {
                     return (
                        <PostElement
                           key={element.key}
                           tag={element.tag}
                           content={element.content}
                           imageAltText={element.altText}
                           imageSource={element.source}
                        />
                     );
                  },
               )}
            </section>
         </main>
      </>
   );
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
   const postId = ctx.params!.postId;
   const postData = await getSpecificPost(String(postId));

   return {
      props: {
         postData,
      },

      revalidate: 60 * 60 * 24, // resets every 24 hours
   };
};

export const getStaticPaths = async () => {
   const recentPosts = await getRecentPosts();

   return {
      paths: [{ params: { postId: "9cbca383-f5a0-4397-be59-2cbdb4f77cc1" } }],
      fallback: "blocking",
   };
};

export default Post;

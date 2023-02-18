import EditorContainer from "@/components/EditorContainer";
import EditorPreview from "@/components/EditorPreview";
import EditorProvider from "@/contexts/EditorContext";
import Head from "next/head";
import styles from "@/styles/editor.module.scss";
import { GetServerSidePropsContext } from "next";
import { getRecentPosts, getSpecificPost } from "@/services/sanityClient";
import { useEffect } from "react";

const Editor = () => {
   return (
      <>
         <Head>
            <title>0AS | Editor</title>
         </Head>
         <main className={styles.pageContainer}>
            <EditorProvider>
               <EditorContainer />
               <EditorPreview />
            </EditorProvider>
         </main>
      </>
   );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
   const postId = String(ctx.query.postId);
   const sanityResponse = await getSpecificPost(postId);
   console.log(sanityResponse);

   if (sanityResponse.length === 0) {
      return {
         redirect: {
            permanent: false,
            destination: "/admin/dashboard",
         },
         props: {},
      };
   }

   return {
      props: {},
   };
};

export default Editor;

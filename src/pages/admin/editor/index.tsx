import EditorContainer from "@/components/EditorContainer";
import EditorPreview from "@/components/EditorPreview";
import EditorProvider from "@/contexts/EditorContext";
import Head from "next/head";
import styles from "@/styles/editor.module.scss";
import { GetServerSidePropsContext } from "next";
import { getSpecificPost, ResponsePost } from "@/services/sanityClient";

const Editor = ({ post }: { post: ResponsePost }) => {
   return (
      <>
         <Head>
            <title>0AS | Editor</title>
         </Head>
         <main className={styles.pageContainer}>
            <EditorProvider>
               <EditorContainer post={post} />
               <EditorPreview />
            </EditorProvider>
         </main>
      </>
   );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
   try {
      const postId = String(ctx.query.postId);
      const sanityResponse = await getSpecificPost(postId);

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
         props: {
            post: sanityResponse[0],
         },
      };
   } catch (err) {}
};

export default Editor;

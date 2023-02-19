import EditorContainer from "@/components/EditorContainer";
import EditorPreview from "@/components/EditorPreview";
import EditorProvider from "@/contexts/EditorContext";
import Head from "next/head";
import styles from "@/styles/editor.module.scss";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { firebaseAdmin } from "@/services/firebaseAdmin";

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

export default Editor;

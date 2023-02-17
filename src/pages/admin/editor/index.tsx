import EditorContainer from "@/components/EditorContainer";
import EditorPreview from "@/components/EditorPreview";
import EditorProvider from "@/contexts/EditorContext";
import Head from "next/head";
import styles from "@/styles/editor.module.scss";

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

export default Editor;

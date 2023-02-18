import { EditorContext } from "@/contexts/EditorContext";
import { getSpecificPost } from "@/services/sanityClient";
import styles from "@/styles/editor.module.scss";
import { GetServerSidePropsContext } from "next";
import { FormEvent, useContext, useEffect } from "react";
import EditorElement from "./EditorElement";
import EditorImageElement from "./EditorImageElement";
import Toolbar from "./Toolbar";

const EditorContainer = () => {
   const context = useContext(EditorContext);
   const { editorState, editorUtils, focusedElement } = context!;

   useEffect(() => {
      if (typeof window != undefined && localStorage.getItem("localData")) {
         const data = JSON.parse(localStorage.getItem("localData")!);
         editorUtils.setState(data);
      }
   }, [editorUtils]);

   useEffect(() => {
      document.getElementById(focusedElement)?.focus();
   }, [focusedElement]);

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      editorUtils.save();
      console.log(JSON.stringify(editorState));
   };

   return (
      <div
         className={styles.editorContainer}
         onKeyDown={(e) => {
            if (e.key == "Enter") {
               e.preventDefault();
               const relativeIndex = editorUtils.findElementIndex(
                  (e.target as HTMLTextAreaElement).id,
                  editorState,
               );
               editorUtils.appendParagraph(relativeIndex);
               return false;
            }
         }}
      >
         <Toolbar />

         {editorState.map((element) => {
            if (element.tag == "img") {
               return (
                  <EditorImageElement
                     key={element.key}
                     elementkey={element.key}
                     source={String(element.source)}
                     alt={String(element.altText)}
                     editorUtils={editorUtils}
                  />
               );
            } else {
               return (
                  <EditorElement
                     key={element.key}
                     elementKey={element.key}
                     elementTag={element.tag}
                     content={element.content || ""}
                     editorUtils={editorUtils}
                  />
               );
            }
         })}

         <form onSubmit={handleSubmit} className={styles.mainForm}>
            <h2>Meta data</h2>
            <input type="text" placeholder="título do post" required />
            <textarea cols={30} rows={10} placeholder="meta description" required></textarea>
            <input type="text" placeholder="tags, separadas, por vírgulas" required />

            <button type="submit">save</button>
         </form>
      </div>
   );
};

export default EditorContainer;

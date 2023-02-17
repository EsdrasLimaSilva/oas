import { EditorContext } from "@/contexts/EditorContext";
import styles from "@/styles/editor.module.scss";
import { useContext, useEffect } from "react";
import EditorElement from "./EditorElement";
import EditorImageElement from "./EditorImageElement";
import Toolbar from "./Toolbar";

const EditorContainer = () => {
   const context = useContext(EditorContext);
   const { editorState, editorUtils, focusedElement } = context!;

   useEffect(() => {
      editorUtils.pushElement("p");
      editorUtils.pushElement("p");
      editorUtils.pushElement("p");
   }, []);

   useEffect(() => {
      document.getElementById(focusedElement)?.focus();
   }, [focusedElement]);

   return (
      <div className={styles.editorContainer}>
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
      </div>
   );
};

export default EditorContainer;

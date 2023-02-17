import { EditorContext } from "@/contexts/EditorContext";
import styles from "@/styles/editor.module.scss";
import { useContext } from "react";
import PreviewElement from "./PreviewElement";

const EditorPreview = () => {
   const context = useContext(EditorContext);
   const { editorState } = context!;

   return (
      <div className={styles.previewContainer}>
         {editorState.map((element) => {
            return (
               <PreviewElement
                  key={element.key}
                  tag={element.tag}
                  content={element.content}
                  imageAltText={element.altText}
                  imageSource={element.source}
               />
            );
         })}
      </div>
   );
};

export default EditorPreview;

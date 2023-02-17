import { EditorUtilsType } from "@/contexts/EditorContext";
import { useRef } from "react";
import styles from "@/styles/editor.module.scss";

interface Props {
   elementkey: string;
   source: string;
   alt: string;
   editorUtils: EditorUtilsType;
}

const EditorImageElement = ({ elementkey, source, alt, editorUtils }: Props) => {
   const imageData = useRef({ source: source, alt: alt });

   const handleInput = (operation: string, text: string) => {
      if (operation == "source") {
         imageData.current.source = text;
      }

      if (operation == "alt") {
         imageData.current.alt = text;
      }

      editorUtils.updateImageData(imageData.current.source, imageData.current.alt, elementkey);
   };

   return (
      <div className={styles.editorImageElement}>
         <div>
            <p>img</p>

            <button type="button" onClick={() => editorUtils.removeElement(elementkey)}>
               remove
            </button>
         </div>

         <input
            id={elementkey}
            onInput={(e) => handleInput("source", String((e.target as HTMLInputElement).value))}
            defaultValue={source}
            placeholder="url da imagem"
         ></input>
         <input
            id={elementkey + "1"}
            onInput={(e) => handleInput("alt", String((e.target as HTMLInputElement).value))}
            defaultValue={alt}
            placeholder="texto alternativo"
         ></input>
      </div>
   );
};

export default EditorImageElement;

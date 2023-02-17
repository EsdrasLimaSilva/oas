import { EditorUtilsType } from "@/contexts/EditorContext";
import { useRef } from "react";

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
      <div className="editor-image-element">
         <div className="header w-fit bg-gray-800 overflow-hidden text-lg px-2 flex flex-row gap-2">
            <p className="text-gray-50 text-lg">img</p>

            <button
               type="button"
               className="text-gray-50"
               onClick={() => editorUtils.removeElement(elementkey)}
            >
               remove
            </button>
         </div>

         <input
            id={elementkey}
            className="border-2 border-gray-800 p-2 focus:border-blue-600 outline-none"
            onInput={(e) => handleInput("source", String((e.target as HTMLInputElement).value))}
            defaultValue={source}
            placeholder="url da imagem"
         ></input>
         <input
            id={elementkey + "1"}
            className="border-2 border-gray-800 p-2 focus:border-blue-600 outline-none"
            onInput={(e) => handleInput("alt", String((e.target as HTMLInputElement).value))}
            defaultValue={alt}
            placeholder="texto alternativo"
         ></input>
      </div>
   );
};

export default EditorImageElement;

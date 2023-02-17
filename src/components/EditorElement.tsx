import { EditorUtilsType } from "@/contexts/EditorContext";
import { ChangeEvent, memo } from "react";
import styles from "@/styles/editor.module.scss";

interface Props {
   elementKey: string;
   elementTag: string;
   content: string;
   editorUtils: EditorUtilsType;
}

const EditorElement = ({ elementTag, elementKey, content, editorUtils }: Props) => {
   function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
      const textArea = e.target as HTMLTextAreaElement;
      textArea.style.height = `0`;
      textArea.style.height = `${textArea.scrollHeight + 10}px`;
      editorUtils.updateContent(elementKey, String(textArea.value));
   }

   return (
      <div className={styles.editorElement}>
         <div className="editor-element-header">
            <select
               defaultValue={elementTag}
               className="bg-inherit border-none outline-none text-gray-50"
               onChange={(e) => editorUtils.changeElement(elementKey, e.target.value)}
            >
               <option value="p">p</option>
               <option value="h1">h1</option>
               <option value="h2">h2</option>
               <option value="h3">h3</option>
            </select>

            <button
               type="button"
               className="text-gray-50"
               onClick={() => editorUtils.removeElement(elementKey)}
            >
               remove
            </button>
         </div>

         <textarea id={elementKey} onChange={handleChange} value={content}></textarea>
      </div>
   );
};

export default memo(EditorElement);

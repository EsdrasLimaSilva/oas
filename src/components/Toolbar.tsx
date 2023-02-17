import { EditorContext } from "@/contexts/EditorContext";
import { useContext } from "react";
import { BsFillImageFill, BsParagraph } from "react-icons/bs";
import Toolbutton from "./Toolbutton";
import styles from "@/styles/editor.module.scss";

const Toolbar = () => {
   const context = useContext(EditorContext);
   const { editorUtils } = context!;

   return (
      <div className={styles.toolbar}>
         <Toolbutton onClick={() => editorUtils.pushElement("p")}>
            <BsParagraph />
         </Toolbutton>

         <Toolbutton onClick={() => editorUtils.pushImage()}>
            <BsFillImageFill />
         </Toolbutton>

         <Toolbutton onClick={() => editorUtils.pushElement("h1")}>h1</Toolbutton>
         <Toolbutton onClick={() => editorUtils.pushElement("h2")}>h2</Toolbutton>
         <Toolbutton onClick={() => editorUtils.pushElement("h3")}>h3</Toolbutton>
      </div>
   );
};

export default Toolbar;

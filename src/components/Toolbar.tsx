import styles from "@/styles/editor.module.scss";
import { BsFillImageFill, BsParagraph } from "react-icons/bs";
import Toolbutton from "./Toolbutton";

const Toolbar = () => {
   return (
      <div className={styles.toolbar}>
         <Toolbutton>
            <BsParagraph />
         </Toolbutton>

         <Toolbutton>
            <BsFillImageFill />
         </Toolbutton>

         <Toolbutton>h1</Toolbutton>
         <Toolbutton>h2</Toolbutton>
         <Toolbutton>h3</Toolbutton>
      </div>
   );
};

export default Toolbar;

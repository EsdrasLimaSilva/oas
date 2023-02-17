import { MouseEvent, ReactNode } from "react";

import styles from "@/styles/editor.module.scss";

interface Props {
   children: ReactNode;
   onClick(e: MouseEvent): void;
}

const Toolbutton = ({ children, onClick }: Props) => {
   return (
      <li>
         <button type="button" className={styles.toolbutton} onClick={onClick}>
            {children}
         </button>
      </li>
   );
};

export default Toolbutton;

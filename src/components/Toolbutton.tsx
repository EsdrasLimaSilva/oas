import { ReactNode } from "react";

import styles from "@/styles/editor.module.scss";

interface Props {
   children: ReactNode;
}

const Toolbutton = ({ children }: Props) => {
   return (
      <li>
         <button type="button" className={styles.toolbutton}>
            {children}
         </button>
      </li>
   );
};

export default Toolbutton;

import { MouseEvent, MouseEventHandler } from "react";
import styles from "@/styles/dashboard.module.scss";
import { ImSpinner8 } from "react-icons/im";

interface Props {
   handleConfirmDelete: Function;
   handleCancelDelete: Function;
   deletingPost: boolean;
}

const DeleteWarning = ({ handleCancelDelete, handleConfirmDelete, deletingPost }: Props) => {
   const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("overlay")) {
         handleCancelDelete();
      }
   };

   if (deletingPost) {
      return (
         <div className={"overlay " + styles.deleteWarning}>
            <div>
               <span className={styles.spinner}>
                  <ImSpinner8 />
               </span>
            </div>
         </div>
      );
   }

   return (
      <div className={"overlay " + styles.deleteWarning} onClick={handleClick}>
         <div>
            <p>Tem certeza que deseja deletar?</p>

            <div>
               <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => handleCancelDelete()}
               >
                  cancelar
               </button>
               <button
                  type="button"
                  className={styles.confirmButton}
                  onClick={() => handleConfirmDelete()}
               >
                  deletar
               </button>
            </div>
         </div>
      </div>
   );
};

export default DeleteWarning;

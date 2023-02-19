import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import styles from "@/styles/dashboard.module.scss";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface Props {
   postTitle: String;
   postId: String;
   handleDelete: MouseEventHandler;
}

const PostItem = ({ postTitle, postId, handleDelete }: Props) => {
   const router = useRouter();

   const edit = () => {
      router.replace(`/admin/editor?postId=${postId}`);
   };

   return (
      <li>
         {postTitle}
         <span className={styles.actionContainer}>
            <button type="button" onClick={edit}>
               <BsFillPencilFill />
            </button>
            <button type="button" onClick={handleDelete}>
               <FaTrash />
            </button>
         </span>
      </li>
   );
};

export default PostItem;

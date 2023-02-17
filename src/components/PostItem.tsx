import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import styles from "@/styles/dashboard.module.scss";

interface Props {
   postTitle: String;
   postId: String;
}

const PostItem = ({ postTitle, postId }: Props) => {
   return (
      <li>
         {postTitle}
         <span className={styles.actionContainer}>
            <button type="button">
               <BsFillPencilFill />
            </button>
            <button type="button">
               <FaTrash />
            </button>
         </span>
      </li>
   );
};

export default PostItem;

import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import styles from "@/styles/dashboard.module.scss";
import { useRouter } from "next/router";

interface Props {
   postTitle: String;
   postId: String;
}

const PostItem = ({ postTitle, postId }: Props) => {
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
            <button type="button">
               <FaTrash />
            </button>
         </span>
      </li>
   );
};

export default PostItem;

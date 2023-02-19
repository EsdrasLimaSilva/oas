import { createPost, getRecentPosts } from "@/services/sanityClient";
import styles from "@/styles/dashboard.module.scss";
import { FormEvent, MouseEvent, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

interface Props {
   setVisible: Function;
   setRecentPosts: Function;
}

const DashboardNewPostForm = ({ setVisible, setRecentPosts }: Props) => {
   const [creating, setCreating] = useState(false);

   const handleSubmit = async (e: FormEvent) => {
      try {
         e.preventDefault();
         setCreating(true);
         const title = String(((e.target as HTMLFormElement)[0] as HTMLInputElement).value);

         await createPost({
            title,
            description: "",
            content: "",
            category: "",
            tags: [],
            coverUrl: "",
         });
         setVisible(false);

         const recentPosts = await getRecentPosts();
         setRecentPosts(recentPosts);
      } catch (err) {
         console.log(err);
      } finally {
         setCreating(false);
      }
   };

   const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement).classList.contains("formOverlay")) {
         setVisible(false);
      }
   };

   return (
      <div className={"formOverlay " + styles.dashboardNewPostForm} onClick={handleClick}>
         <form onSubmit={handleSubmit}>
            <h2>Novo post</h2>

            <input type="text" placeholder="título" required />
            <button type="submit" disabled={creating || false}>
               {creating ? (
                  <span>
                     <ImSpinner8 />
                  </span>
               ) : (
                  "criar"
               )}
            </button>
         </form>
      </div>
   );
};

export default DashboardNewPostForm;

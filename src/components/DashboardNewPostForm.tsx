import { createPost, getRecentPosts } from "@/services/sanityClient";
import styles from "@/styles/dashboard.module.scss";
import { useRouter } from "next/router";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { ImSpinner10, ImSpinner7, ImSpinner8 } from "react-icons/im";

interface Props {
   setVisible: Function;
}

const DashboardNewPostForm = ({ setVisible }: Props) => {
   const [creating, setCreating] = useState(false);
   const router = useRouter();

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
         });
         setVisible(false);
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

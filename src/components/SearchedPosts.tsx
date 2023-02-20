import { ResponsePost } from "@/services/sanityClient";
import styles from "@/styles/home.module.scss";
import { MouseEventHandler } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import HomePost from "./HomePost";

interface Props {
   searchResult: ResponsePost[];
   resetSearch: MouseEventHandler;
}

const SearchedPosts = ({ searchResult, resetSearch }: Props) => {
   return (
      <section className={styles.searchedPosts}>
         <button type="button" onClick={resetSearch}>
            <BsArrowLeft /> Voltar
         </button>

         <h2>Resultados</h2>

         <div className={styles.postList}>
            {searchResult.map((post: any) => (
               <HomePost
                  key={post._id}
                  title={post.title}
                  coverUrl={post.coverUrl}
                  description={post.description}
                  postId={post._id}
               />
            ))}
         </div>
      </section>
   );
};

export default SearchedPosts;

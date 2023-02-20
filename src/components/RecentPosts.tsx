import { ResponsePost } from "@/services/sanityClient";
import styles from "@/styles/home.module.scss";
import HomePost from "./HomePost";

interface Props {
   recentPosts: ResponsePost[];
}

const RecentPosts = ({ recentPosts }: Props) => {
   return (
      <section className={styles.recentPosts}>
         <h2>Recentes</h2>

         <div className={styles.postList}>
            {recentPosts.map((post: any) => (
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

export default RecentPosts;

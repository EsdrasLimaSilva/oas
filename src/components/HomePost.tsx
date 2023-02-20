/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/home.module.scss";
import Link from "next/link";

const HomePost = ({
   title,
   coverUrl,
   description,
   postId,
}: {
   title: string;
   coverUrl: string;
   description: string;
   postId: string;
}) => {
   return (
      <div className={styles.post}>
         <img src={coverUrl} alt="capa do post" className={styles.cover} draggable={false} />
         <div className={styles.info}>
            <Link href={`/posts/${postId}`}>{title}</Link>
            <p>{description}</p>
         </div>
      </div>
   );
};

export default HomePost;

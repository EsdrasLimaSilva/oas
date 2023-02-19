import styles from "@/styles/home.module.scss";

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
         <div style={{ backgroundImage: `url(${coverUrl})` }} className={styles.cover} />
         <div className={styles.info}>
            <a href={`/posts/${postId}`}>{title}</a>
            <p>{description}</p>
         </div>
      </div>
   );
};

export default HomePost;

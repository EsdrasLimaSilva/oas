import styles from "@/styles/home.module.scss";

const HomePost = ({
   title,
   coverUrl,
   description,
}: {
   title: string;
   coverUrl: string;
   description: string;
}) => {
   return (
      <div className={styles.post}>
         <div style={{ backgroundImage: `url(${coverUrl})` }} className={styles.cover} />
         <div className={styles.info}>
            <a href="">{title}</a>
            <p>{description}</p>
         </div>
      </div>
   );
};

export default HomePost;

import { useEffect } from "react";
import { getPosts } from "@/services/sanityClient";

const Editor = () => {
   useEffect(() => {
      (async () => {
         const posts = await getPosts("fundamentos");
         console.log(posts);
      })();
   }, []);

   return <h2>Hello World</h2>;
};

export default Editor;

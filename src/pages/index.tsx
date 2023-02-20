import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecentPosts from "@/components/RecentPosts";
import SearchedPosts from "@/components/SearchedPosts";
import { getPosts, getRecentPosts, ResponsePost } from "@/services/sanityClient";
import Head from "next/head";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";

interface SearchType {
   searching: boolean;
   query: string;
   result: [] | ResponsePost[];
}

const Home = ({ recentPosts }: { recentPosts: ResponsePost[] }) => {
   const [search, setSearch] = useState<SearchType>({ searching: false, query: "", result: [] });

   const resetSearch = () => {
      setSearch({ searching: false, query: "", result: [] });
   };

   const startSearch = async (query: string) => {
      try {
         setSearch((prev) => ({ ...prev, searching: true, query }));
         const posts: ResponsePost[] = await getPosts(query);
         setSearch((prev) => ({ ...prev, result: [...posts] }));
      } catch (error) {
      } finally {
         setSearch((prev) => ({ ...prev, searching: false }));
      }
   };

   return (
      <>
         <Head>
            <title>0AS | Home</title>
         </Head>
         <Header startSearch={startSearch} />
         <main>
            {search.searching ? (
               <span className="searchSpinner">
                  <p>procurando posts</p>

                  <span>
                     <ImSpinner8 />
                  </span>
               </span>
            ) : search.result.length > 0 ? (
               <SearchedPosts searchResult={search.result} resetSearch={resetSearch} />
            ) : search.query == "" ? (
               <RecentPosts recentPosts={recentPosts} />
            ) : (
               <div className="noResults">
                  <button type="button" onClick={resetSearch}>
                     <BsArrowLeft /> voltar
                  </button>
                  <h2>Nada encontrado</h2>
               </div>
            )}
         </main>
         <Footer />
      </>
   );
};

export const getStaticProps = async () => {
   const recentPosts = await getRecentPosts();

   return {
      props: {
         recentPosts: recentPosts,
      },

      revalidate: 60 * 60 * 24, // resets every 24 hours
   };
};

export default Home;

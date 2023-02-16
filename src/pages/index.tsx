import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

const Home = () => {
   return (
      <>
         <Head>
            <title>0AS | Home</title>
         </Head>
         <Header />
         <main>
            <h2>Home</h2>
         </main>
         <Footer />
      </>
   );
};

export default Home;

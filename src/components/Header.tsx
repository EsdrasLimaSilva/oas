import { FormEvent } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Header = ({ startSearch }: { startSearch: Function }) => {
   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      const query = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;
      startSearch(query);
   };

   return (
      <header className="header-home">
         <div>
            <h1>0 Analista de Sistemas</h1>

            <form onSubmit={handleSubmit}>
               <input
                  type="search"
                  placeholder="encontre o que procura"
                  className="input-search"
                  required
               />
            </form>
         </div>

         <div className="social">
            <a href="https://github.com/EsdrasLimaSilva" target="_blank" rel="noreferrer">
               <FaGithub />
            </a>
            <a
               href="https://linkedin.com/in/esdras-silva-frontend"
               target="_blank"
               rel="noreferrer"
            >
               <FaLinkedin />
            </a>
         </div>
      </header>
   );
};

export default Header;

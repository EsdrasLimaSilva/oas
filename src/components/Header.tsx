import { FaGithub, FaLinkedin } from "react-icons/fa";

const Header = () => {
   return (
      <header className="header-home">
         <div>
            <h1>0 Analista de Sistemas</h1>

            <input type="search" placeholder="encontre o que procura" className="input-search" />
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

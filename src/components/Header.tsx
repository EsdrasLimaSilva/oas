const Header = () => {
   return (
      <header className="header-home">
         <div>
            <h1>0AS</h1>

            <input type="search" placeholder="encontre o que procura" className="input-search" />
         </div>
         <ul>
            <li>Fundamentos da computação</li>
            <li>Algorítmos</li>
            <li>Redes</li>
            <li>Estrutura de dados</li>
            <li>Linguagens de marcação</li>
         </ul>
      </header>
   );
};

export default Header;

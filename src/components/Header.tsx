const Header = () => {
   return (
      <header className="w-full bg-neutral-100 px-4 py-8 flex flex-col justify-center items-center gap-8">
         <div className="flex flex-row justify-between w-full max-w-[1100px]">
            <h1 className="logo font-bold text-4xl text-primary-700">0AS</h1>

            <input
               type="search"
               className="border-[2px] border-neutral-400 rounded-full px-8 py-1 outline-none transition-all focus:border-primary-400"
               placeholder="encontre o que procura"
            />
         </div>
         <ul className="w-full flex flex-row justify-between max-w-[1100px] font-bold text-primary-800">
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

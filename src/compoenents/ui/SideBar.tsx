import { useState } from 'react';
import { BiExit } from 'react-icons/bi';
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5';
import { RiCloseLine, RiMenu3Fill } from 'react-icons/ri';

function SideBar({ children }: any) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div
        className={`fixed top-0 w-80 h-full border-r border-[#FAFAFA] p-8 flex flex-col justify-between bg-[#FAFAFA] transition-all lg:left-0 z-50 ${showMenu ? 'left-0' : '-left-full'}`}
      >
        <div>
          <h1 className="text-black uppercase font-bold text-2xl tracking-[5px] mb-10">Tierra Deseable</h1>
          <ul>
            <li>
              <a
                href="#"
                className="text-black flex items-center gap-4 hover:bg-[#FAFAFA] py-3 px-4 rounded-xl transition-colors"
              >
                <IoGameControllerOutline />
                Juegos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black flex items-center gap-4 hover:bg-[#FAFAFA] py-3 px-4 rounded-xl transition-colors"
              >
                <IoSettingsOutline />
                Administración
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <a
                href="#"
                className="text-black flex items-center gap-4 hover:bg-[#FAFAFA] py-3 px-4 rounded-xl transition-colors"
              >
                <BiExit />
                Salir
              </a>
            </li>
          </ul>
        </div>
        {/* Btn Menu movil */}
        <button
          onClick={toggleMenu}
          className="lg:hidden bg-blue-600 text-black fixed bottom-6 right-4 p-2 text-lg rounded-full z-50"
        >
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </div>
      {/* Header */}
      <header className="fixed lg:pl-[340px] w-full flex flex-col md:flex-row items-start justify-between gap-4 p-8 bg-[#FAFAFA]">
        <nav className="flex items-center gap-4"></nav>
      </header>
      {/* Content */}
      <main className="lg:pl-[340px] p-8 pt-36">{children}</main>
    </div>
  );
}

export default SideBar;

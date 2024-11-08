import { Link } from "react-router-dom";
import { Carrinho } from "./Carrinho";
import { MenuMobile } from "./MenuMobile";
import { MdOutlineRestaurantMenu } from "react-icons/md";

export function Cabecalho() {
  return (
    <>
      <header className="h-20 p-3 md:px-10 w-full bg-red-600 z-[10] md:absolute">
        <nav className="h-full w-full flex items-center justify-between">
          <MdOutlineRestaurantMenu className="text-white text-5xl" />
          <div className="flex items-center gap-3 md:hidden">
            <Carrinho />
            <MenuMobile />
          </div>

          <div className="hidden md:flex items-center gap-4 mr-4">
            <Link to="/" className="text-white font-semibold">
              <span>Home</span>
            </Link>
            <Link to="/menu" className="text-white font-semibold">
              <span>Menu</span>
            </Link>
            <Carrinho />
            <Link
              to="/buscarpedido"
              className="w-auto h-10 px-3 bg-yellow-300 text-red-600 font-bold rounded-3xl text-center pt-2"
            >
              Buscar Pedido
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

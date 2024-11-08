import { IoMenu } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

export function MenuMobile() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <IoMenu className="text-white text-4xl" />
        </SheetTrigger>
        <SheetContent className="bg-[#fefefe] flex flex-col justify-items-start gap-8">
          <SheetTitle className="text-red-600">Links</SheetTitle>
          <Link to="/">
            <Button className="w-full bg-red-600 font-bold">
              <HomeIcon />
              <span>Home</span>
            </Button>
          </Link>
          <Link to="/menu">
            <Button className="w-full bg-red-600 font-bold">
              <MdOutlineRestaurantMenu />
              <span>Menu</span>
            </Button>
          </Link>
          <Link to="/buscarpedido">
            <Button className="w-full bg-red-600 font-bold">
              <FaSearch />
              <span>Buscar Pedido</span>
            </Button>
          </Link>
          <SheetFooter className="flex justify-between items-center"></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

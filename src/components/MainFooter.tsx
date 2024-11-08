import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

import { Separator } from "@/components/ui/separator";

export function MainFooter() {
  return (
    <>
      <footer className="px-2 py-10  md:py-12 max-w-full">
        <Separator className="mb-4 mt-4 bg-yellow-950 " />
        <nav className="flex flex-col md:flex-row justify-evenly items-center gap-4 py-3">
          <div className="flex flex-col gap-6">
            <span className="text-2xl text-red-600 max-w-[350px] font-bold text-center">
              redes sociais
            </span>
            <div className="flex gap-2">
              <a href="#">
                <div className="h-10 w-10 rounded-full border border-black flex items-center bg-white justify-center">
                  <BsInstagram className="text-black" />
                </div>
              </a>
              <a href="#">
                <div className="h-10 w-10 rounded-full border border-black flex items-center bg-white justify-center">
                  <BsFacebook className="text-black" />
                </div>
              </a>
              <a href="#">
                <div className="h-10 w-10 rounded-full border border-black flex items-center bg-white justify-center">
                  <BsTwitter className="text-black" />
                </div>
              </a>
              <a href="#">
                <div className="h-10 w-10 rounded-full border border-black flex items-center bg-white justify-center">
                  <BsYoutube className="text-black" />
                </div>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-xl text-red-600 max-w-[350px] font-bold text-center">
              Serviços
            </span>
            <div className="flex md:flex-col gap-4">
              <span className="text-xl text-black max-w-[350px] text-center">
                Reserva
              </span>
              <span className="text-xl text-black max-w-[350px]  text-center">
                Entrega
              </span>
              <span className="text-xl text-black max-w-[350px]  text-center">
                Menu
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-xl text-red-600 max-w-[350px] font-bold text-center">
              Ajuda
            </span>
            <div className="flex md:flex-col gap-4">
              <span className="text-xl text-black max-w-[350px] text-center">
                Contato
              </span>
              <span className="text-xl text-black max-w-[350px]  text-center">
                FAQ
              </span>
              <span className="text-xl text-black max-w-[350px]  text-center">
                Suporte
              </span>
            </div>
          </div>
        </nav>
      </footer>
    </>
  );
}

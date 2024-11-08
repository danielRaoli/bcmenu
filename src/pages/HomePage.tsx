import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { api } from "@/http";
import { toast } from "sonner";
import { Produto } from "@/interfaces/Produto";
import banner from "@/assets/banner.jpg";
export function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  useEffect(() => {
    const buscarProdutos = async () => {
      const response = await api.get("/popular");

      if (!response.data.isSucces) {
        toast("Recarregue a pagina para carregar os produtos");
      }

      setProdutos(response.data.data);
    };

    buscarProdutos();
  }, []);
  return (
    <>
      <main className="py-14 px-4 h-auto overflow-x-hidden max-w-full flex flex-col md:flex-row justify-evenly items-center relative">
        <div className="flex px-4 flex-col gap-10 md:max-w-[500px]">
          <div className="flex  flex-col items-center lg:items-start">
            <span className="text-red-600 font-bold text-7xl md:text-9xl md:mt-24">
              ITALIAN
            </span>
            <span className=" text-6xl  md:text-8xl text-slate-800">
              FLAVOURS
            </span>
          </div>

          <p className="font-semibold text-center lg:text-start">
            Nosso restaurante traz o autêntico sabor da Itália. Oferecemos
            massas artesanais,pizzas crocantes e pratos que celebram a
            verdadeira essência da culinária italiana. Venha se deliciar em um
            ambiente acolhedor e cheio de sabor
          </p>
          <Button className="bg-red-600 rounded-none hover:bg-yellow-500 w-min mx-auto lg:mx-0">
            <a className="text-white font-bold" href="/login">
              Explorar Restaurante
            </a>
          </Button>
        </div>
        <img src={banner} alt="" className=" hidden w-[45%] lg:block -mt-44 " />
      </main>
      <section className=" px-4 md:px-24 md:py-14 w-full h-auto">
        <h2 className="text-slate-800 font-bold text-4xl mb-20">
          Pedidos Populares
        </h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {produtos.map((produto) => (
              <CarouselItem
                key={produto.id}
                className="pl-1 md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">{<ProductCard produto={produto} />}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block" />
          <CarouselNext className="hidden md:block" />
        </Carousel>
      </section>
    </>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { IoStarSharp } from "react-icons/io5";
import { Produto } from "@/interfaces/Produto";
import { ItemPedido } from "@/interfaces/ItemPedido";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/reducer/cartslice";
import { Button } from "./ui/button";
import { LuShoppingCart } from "react-icons/lu";
import { BsCart2 } from "react-icons/bs";

interface Props {
  produto: Produto;
}

export function ProductCard({ produto }: Props) {
  const dispatch = useDispatch();

  const handleItem = (item: Produto) => {
    const itemPedido = {
      produtoId: item.id,
      produtoNome: item.nome,
      precoUnitario: item.preco,
      produtoImagem: item.imagem,
    } as ItemPedido;
    dispatch(addItemToCart(itemPedido));
  };

  return (
    <>
      <Card className="min-w-[150px] max-w-[350px] h-auto max-h-[300px]">
        <CardContent className="flex flex-col gap-1 aspect-square w-full h-auto p-4 relative rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1400 320"
            className="absolute top-0 left-0  w-full rounded-sm"
          >
            <path
              fill="#ff1515"
              fill-opacity="1"
              d="M0,192L60,186.7C120,181,240,171,360,144C480,117,600,75,720,85.3C840,96,960,160,1080,181.3C1200,203,1320,181,1380,170.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
          <img
            src={produto.imagem}
            alt="foto do lanche"
            className="max-h-[80px] w-auto mx-auto lg:mt-10 z-10 flex-1"
          />
          <div className="w-full flex flex-col justify-end gap-2 h-auto">
            <h3 className="text-black font-semibold text-xl">{produto.nome}</h3>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <IoStarSharp className="text-blue-400" />
              ))}
            </div>
            <p className="font-semibold hidden sm:block">{produto.descricao}</p>
            <div className="flex justify-between w-full items-center">
              <span className="text-black text-md  lg:text-xl font-bold">
                {produto.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>

              <Button
                onClick={() => handleItem(produto)}
                className="h-6 lg:h-10 w-auto rounded-full   text-white   sm:py-2 lg:px-8 hover:bg-red-700 border-yellow-400 flex items-center bg-red-600 justify-center"
              >
                <BsCart2 className="text-xl" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

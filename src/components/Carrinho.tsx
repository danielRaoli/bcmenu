import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

import { Input } from "./ui/input";

import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  BsBasket,
  BsDashSquare,
  BsPlus,
  BsPlusSquare,
  BsX,
} from "react-icons/bs";

import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { ItemPedido } from "@/interfaces/ItemPedido";
import { addItemToCart, removeItemFromCart } from "@/reducer/cartslice";
import { useState } from "react";
import { api } from "@/http";
import { toast } from "sonner";
import { RootState } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FormaPagamento = {
  PIX: 1,
  CARTAO: 2,
  ENTREGA: 3,
};

export function Carrinho() {
  const [nome, setNome] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [formaDePagamento, setFormaPagamento] = useState<number>(
    FormaPagamento.ENTREGA
  );

  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  ) as ItemPedido[];
  const totalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  ) as number;

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleItem = (item: ItemPedido) => {
    dispatch(addItemToCart(item));
  };

  async function concluirPedido() {
    const pedido = {
      formaDePagamento: formaDePagamento,
      endereco: endereco,
      telefoneCliente: telefone,
      nomeCliente: nome,
      items: cartItems.map((c) => ({
        precoUnitario: c.precoUnitario,
        produtoId: c.produtoId,
        quantidade: c.quantidade,
      })),
    };

    const response = await api.post("/pedido", pedido);

    if (!response.data.isSucces) {
      toast(response.data.message);
    }

    toast(response.data.message);
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          {cartItems.length > 0 ? (
            <div className="relative inline-flex">
              <Button
                variant="outline"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-red-600 flex items-center bg-white justify-center"
              >
                <BsBasket className="text-red-600 text-xl" />
              </Button>
              <Badge className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 p-1 flex items-center justify-center text-xs">
                {cartItems.length}
              </Badge>
            </div>
          ) : (
            <Button
              variant="outline"
              className="h-10 w-10 md:h-10 md:w-10 rounded-full border transition-all hover:scale-105  border-red-600 flex items-center bg-white justify-center"
            >
              <BsBasket className="text-red-600 text-xl" />
            </Button>
          )}
        </SheetTrigger>
        <SheetContent className="bg-[#fefefe] flex flex-col justify-evenly z-[100000000000]">
          <SheetHeader>
            <SheetTitle className="text-red-600">Seu Pedido</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 justify-start flex-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left text-red-600">
                Nome
              </Label>
              <Input
                required
                defaultValue={nome ? nome : ""}
                id="name"
                placeholder="Nome do remetente"
                className="col-span-3 border-black"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-left text-red-600">
                Endereço
              </Label>
              <Input
                required
                id="address"
                defaultValue={endereco ? endereco : ""}
                placeholder="Rua rio das cruzes n401 ap102"
                className="col-span-3 border-black"
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-left text-red-600">
                Telefone
              </Label>
              <Input
                required
                defaultValue={telefone ? telefone : ""}
                id="phone"
                placeholder="74998073272"
                className="col-span-3 border-black"
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Label htmlFor="pagamento" className="text-left text-red-600">
                Forma de Pagamento
              </Label>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea>
            <span className="font-bold text-red-600">Suas Compras</span>
            <div className="w-full flex-1 flex flex-col gap-3 mt-2">
              {cartItems.map((itemPedido) => (
                <Card
                  key={itemPedido.produtoId}
                  className="flex justify-around bg-white items-center p-1 relative"
                >
                  <img
                    src={itemPedido.produtoImagem}
                    alt="foto do lance"
                    className="h-24 w-24"
                  />
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold">
                      {itemPedido.produtoNome}
                    </span>
                    <Badge className="bg-red-600 text-yellow-300 font-bold">
                      R$ {itemPedido.precoUnitario}
                    </Badge>
                  </div>

                  <div className="flex gap-2 items-center">
                    <BsX className="absolute top-2 right-2" />

                    <BsDashSquare
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleRemoveItem(itemPedido.produtoId)}
                    />

                    <span className="text-red-600">
                      {itemPedido.quantidade}
                    </span>

                    <BsPlusSquare
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleItem(itemPedido)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <SheetFooter className="flex justify-between items-center">
            <span className="font-semibold text-red-600 mr-auto">
              Preço Total:{" "}
              <span className="font-semibold text-black">{totalAmount} R$</span>
            </span>

            <Button
              type="button"
              className="w-auto h-10 px-3 text-red-600 bg-yellow-400 rounded-3xl text-center pt-2"
              onClick={concluirPedido}
            >
              Concluir pedido
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/http";
import { Produto } from "@/interfaces/Produto";
import { useState } from "react";
import { toast } from "sonner";

interface Pedido {
  id: number;
  telefoneCliente: string;
  nomeCliente: string;
  endereco: string;
  items: [
    {
      produtoId: number;
      produto: Produto;
      pedidoId: number;
      quantidade: number;
      precoUnitario: number;
    }
  ];
  status: number;
  formaDePagamento: number;
  code: string;
  data: string;
  totalPrice: number;
}

export function BuscarPedido() {
  const [codigoPedido, setCodigoPedido] = useState<string>("");

  const [pedido, setPedido] = useState<Pedido | null>(null);

  async function buscarPedido() {
    const response = await api.post("/pedido/buscarpedido", {
      codigoProduto: codigoPedido,
    });

    if (!response.data.isSucces) {
      toast(response.data.message);
    }

    setPedido(response.data.data);
  }

  return (
    <>
      <div className="flex flex-col mt-[10%] items-center pb-8">
        <div className="flex w-full max-w-sm items-center space-x-2 mb-10">
          <Input
            type="text"
            className="bg-white"
            placeholder="Código do pedido"
            onChange={(e) => setCodigoPedido(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-yellow-950"
            onClick={() => buscarPedido()}
          >
            Buscar Pedido
          </Button>
        </div>
        {pedido ? (
          <>
            <h1>Informações sobre o pedido</h1>

            <Card className="min-w-[300px] max-w-[500px] p-8 mt-6 flex flex-col gap-4">
              <div className="flex gap-4">
                <span className="text-slate-400">
                  Código Pedido: {pedido.code}
                </span>
                <Badge className="bg-yellow-500">Pendente</Badge>
              </div>

              <span className="text-yellow-950">
                Endereço: {pedido.endereco}
              </span>
              <span className="text-yellow-950">
                Distanatário: {pedido.nomeCliente}
              </span>

              <ScrollArea>
                <span className="font-bold text-yellow-900">Suas Compras</span>
                <div className="w-full flex-1 flex flex-col gap-3 mt-2 max-h-[300px]">
                  {pedido.items.map((item) => (
                    <Card className="flex justify-around bg-white items-center p-1 relative">
                      <img
                        src={item.produto.imagem}
                        alt="foto do lance"
                        className="h-24 w-24"
                      />
                      <div className="flex flex-col gap-3">
                        <span className="font-semibold">
                          {item.quantidade}x {item.produto.nome}
                        </span>
                        <Badge className="bg-yellow-400 text-yellow-950 justify-center">
                          R$ {item.precoUnitario}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex w-full gap-4">
                <span className="text-yellow-950">
                  Total Pago: R$ {pedido.totalPrice}
                </span>
                <span className="text-yellow-950">
                  Forma: {pedido.formaDePagamento}
                </span>
              </div>
            </Card>
          </>
        ) : (
          <div>
            <span>Aguardando Localizar pedido</span>
          </div>
        )}
      </div>
    </>
  );
}

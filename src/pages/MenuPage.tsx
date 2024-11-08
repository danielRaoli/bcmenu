import { ProductCard } from "@/components/ProductCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import logo from "../assets/food-tray_6814198.png";
import { useEffect, useState } from "react";
import { api } from "@/http";
import { toast } from "sonner";
import { Produto } from "@/interfaces/Produto";

export function MenuPage() {
  interface Categoria {
    id: number;
    nome: string;
    imagem: string;
    produtos: Produto[];
  }

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const buscarProdutos = async () => {
    const response = await api.get("/produto");

    if (!response.data.isSucces) {
      toast.info("Recarregue a pagina");
    }

    setProdutos(response.data.data);
  };

  useEffect(() => {
    const buscarCategorias = async () => {
      const response = await api.get("/categoria");

      if (!response.data.isSucces) {
        toast.info("Recarregue a pagina");
      }

      setCategorias(response.data.data);
    };

    buscarProdutos();
    buscarCategorias();
  }, []);

  async function filtrarPorCategoria(categoriaId: number) {
    setProdutos(produtos.filter((p) => p.categoriaId === categoriaId));
  }

  return (
    <>
      <main className="flex flex-col gap-8 py-16 md:py-36 px-2 md:px-10 lg:px-24  bg-slate-100">
        <div className="w-full">
          <ToggleGroup
            type="single"
            className="gap-5 w-full flex flex-wrap"
            defaultValue="todos"
          >
            <ToggleGroupItem
              value="todos"
              className="rounded-lg  flex-1 data-[state=on]:bg-red-600 data-[state=on]:text-white py-6  text-slate-500 flex items-center bg-white justify-center "
              aria-label="Toggle bold"
              onClick={() => buscarProdutos()}
            >
              Todos
            </ToggleGroupItem>
            {categorias.map((categoria) => (
              <ToggleGroupItem
                key={categoria.id}
                value={categoria.nome}
                className="flex-1 rounded-lg   data-[state=on]:bg-red-600 data-[state=on]:text-white py-6  text-slate-500 flex items-center bg-white justify-center "
                aria-label="Toggle bold"
                onClick={() => filtrarPorCategoria(categoria.id)}
              >
                {categoria.nome}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <h1 className="text-gray-700 text-3xl font-bold text-start">
          Nossos Pratos
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full ">
          {produtos.map((produto) => (
            <ProductCard produto={produto} />
          ))}
        </div>
      </main>
    </>
  );
}

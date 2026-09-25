import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Produto } from "@/model/entities/Produto";
import { CardapioService } from "@/model/services/CardapioService";
import { formatarPreco } from "./formatarPreco";

export type CategoriaState = {
  titulo: string;
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
};

export type CategoriaActions = {
  formatarPreco: (valor: number) => string;
  abrirProduto: (produtoId: string) => void;
  voltar: () => void;
};

export function useCategoriaViewModel(
  categoriaId?: string
): [ CategoriaState, CategoriaActions ] {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const service = new CardapioService();

  const titulo =
    categoriaId === "bebidas" ? "Bebidas"
    : categoriaId === "comidas" ? "Comidas"
    : "Cardápio";

  useEffect(() => {
    if (!categoriaId) return;

    async function carregarProdutos(id: string) {
      try {
        setCarregando(true);
        setErro(null);
        setProdutos(await service.listarProdutosDaCategoria(id));
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos(categoriaId);
  }, [categoriaId]);

  function abrirProduto(produtoId: string) {
    router.push(`/item/${produtoId}` as any);
  }

  function voltar() {
    router.back();
  }

  const state: CategoriaState = { titulo, produtos, carregando, erro };
  const actions: CategoriaActions = { formatarPreco, abrirProduto, voltar };

  return [state, actions];
}

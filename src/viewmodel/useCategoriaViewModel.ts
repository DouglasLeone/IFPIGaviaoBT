import { useEffect, useState } from "react";
import { Produto } from "@/model/entities/Produto";
import { INavegacaoService } from "@/model/services/INavegacaoService";
import { IMenuUseCases } from "@/usecase/IMenuUseCases";
import { formatarPreco } from "./formatarPreco";
import { mensagemDeErro } from "./mensagemDeErro";

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
  menuUseCases: IMenuUseCases,
  navegacao: INavegacaoService,
  categoriaId?: string
): [ CategoriaState, CategoriaActions ] {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const titulo = menuUseCases.obterTituloCategoria(categoriaId);

  useEffect(() => {
    if (!categoriaId) return;

    async function carregarProdutos(id: string) {
      try {
        setCarregando(true);
        setErro(null);
        setProdutos(await menuUseCases.listarProdutosPorCategoria(id));
      } catch (err) {
        setErro(mensagemDeErro(err, "Ocorreu um erro inesperado ao carregar os itens."));
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos(categoriaId);
  }, [categoriaId, menuUseCases]);

  function abrirProduto(produtoId: string) {
    navegacao.abrirProduto(produtoId);
  }

  function voltar() {
    navegacao.voltar();
  }

  const state: CategoriaState = { titulo, produtos, carregando, erro };
  const actions: CategoriaActions = { formatarPreco, abrirProduto, voltar };

  return [state, actions];
}

import { useEffect, useState } from "react";
import { Produto } from "@/model/entities/Produto";
import { INavegacaoService } from "@/model/services/INavegacaoService";
import { QUANTIDADE_MINIMA } from "@/model/rules/Quantidade";
import { IMenuUseCases } from "@/usecase/IMenuUseCases";
import { formatarPreco } from "./formatarPreco";
import { mensagemDeErro } from "./mensagemDeErro";

export type ProdutoState = {
  produto: Produto | null;
  quantidade: number;
  precoFormatado: string;
  carregando: boolean;
  erro: string | null;
};

export type ProdutoActions = {
  incrementarQuantidade: () => void;
  decrementarQuantidade: () => void;
  voltar: () => void;
};

export function useProdutoViewModel(
  menuUseCases: IMenuUseCases,
  navegacao: INavegacaoService,
  produtoId?: string
): [ ProdutoState, ProdutoActions ] {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(QUANTIDADE_MINIMA);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!produtoId) return;

    async function carregarProduto(id: string) {
      try {
        setCarregando(true);
        setErro(null);
        setProduto(await menuUseCases.buscarProdutoPorId(id));
      } catch (err) {
        setProduto(null);
        setErro(mensagemDeErro(err, "Ocorreu um erro inesperado ao carregar o item."));
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto(produtoId);
  }, [produtoId, menuUseCases]);

  function incrementarQuantidade() {
    setQuantidade((q) => menuUseCases.ajustarQuantidade(q + 1));
  }

  function decrementarQuantidade() {
    setQuantidade((q) => menuUseCases.ajustarQuantidade(q - 1));
  }

  function voltar() {
    navegacao.voltar();
  }

  const precoFormatado = produto ? formatarPreco(produto.preco) : "";

  const state: ProdutoState = { produto, quantidade, precoFormatado, carregando, erro };

  const actions: ProdutoActions = { incrementarQuantidade, decrementarQuantidade, voltar };

  return [state, actions];
}

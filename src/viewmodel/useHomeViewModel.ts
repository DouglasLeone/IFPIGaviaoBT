import { useEffect, useState } from "react";
import { Categoria } from "@/model/entities/Categoria";
import { INavegacaoService } from "@/model/services/INavegacaoService";
import { IMenuUseCases } from "@/usecase/IMenuUseCases";
import { mensagemDeErro } from "./mensagemDeErro";

export type HomeState = {
  categorias: Categoria[];
  carregando: boolean;
  erro: string | null;
};

export type HomeActions = {
  carregarCategorias: () => Promise<void>;
  abrirCategoria: (categoriaId: string) => void;
};

export function useHomeViewModel(
  menuUseCases: IMenuUseCases,
  navegacao: INavegacaoService
): [ HomeState, HomeActions ] {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarCategorias() {
    try {
      setCarregando(true);
      setErro(null);
      setCategorias(await menuUseCases.listarCategorias());
    } catch (err) {
      setErro(mensagemDeErro(err, "Ocorreu um erro inesperado ao carregar as categorias."));
    } finally {
      setCarregando(false);
    }
  }

  function abrirCategoria(categoriaId: string) {
    navegacao.abrirCategoria(categoriaId);
  }

  useEffect(() => {
    carregarCategorias();
  }, [menuUseCases]);

  const state: HomeState = { categorias, carregando, erro };

  const actions: HomeActions = { carregarCategorias, abrirCategoria };

  return [state, actions];
}

import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Categoria } from "@/model/entities/Categoria";
import { CardapioService } from "@/model/services/CardapioService";

export type HomeState = {
  categorias: Categoria[];
  carregando: boolean;
  erro: string | null;
};

export type HomeActions = {
  carregarCategorias: () => Promise<void>;
  abrirCategoria: (categoriaId: string) => void;
};

export function useHomeViewModel(): [ HomeState, HomeActions ] {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const service = new CardapioService();

  async function carregarCategorias() {
    try {
      setCarregando(true);
      setErro(null);
      setCategorias(await service.listarCategorias());
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  function abrirCategoria(categoriaId: string) {
    router.push(`/category/${categoriaId}` as any);
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  const state : HomeState = { categorias, carregando, erro };

  const actions : HomeActions = { carregarCategorias, abrirCategoria };

  return [state, actions];
}
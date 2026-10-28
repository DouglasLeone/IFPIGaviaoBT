import { Categoria } from "../../model/entities/Categoria";
import { DataSourceError } from "../../model/errors";
import { ICategoriaRepository } from "../../model/repositories/ICategoriaRepository";

const DELAY_MS = 600;

const CATEGORIAS: Categoria[] = [
  {
    id: "comidas",
    nome: "Comidas",
    corBorda: "#501673",
    corSeta: "#501673",
    imagem: "categoria-comidas",
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    corBorda: "#1b873f",
    corSeta: "#1b873f",
    imagem: "categoria-bebidas",
  },
];

function detalhe(err: unknown): string {
  return err instanceof Error ? err.message : "Erro desconhecido";
}

export class InMemoryCategoriaRepository implements ICategoriaRepository {
  async listarTodas(): Promise<Categoria[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      return [...CATEGORIAS];
    } catch (err: unknown) {
      throw new DataSourceError(`Falha ao obter categorias: ${detalhe(err)}`);
    }
  }
}
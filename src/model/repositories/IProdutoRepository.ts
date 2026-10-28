import { Produto } from "../entities/Produto";

export interface IProdutoRepository {
  listarPorCategoria(categoriaId: string): Promise<Produto[]>;
  buscarPorId(id: string): Promise<Produto | null>;
}

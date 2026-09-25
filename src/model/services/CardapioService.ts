import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";
import { CategoriaDataSource } from "../repositories/CategoriaDataSource";
import { ProdutoDataSource } from "../repositories/ProdutoDataSource";

export const QUANTIDADE_MINIMA = 1;

export class CardapioService {
  private categoriaDataSource = new CategoriaDataSource();
  private produtoDataSource = new ProdutoDataSource();

  listarCategorias(): Promise<Categoria[]> {
    return this.categoriaDataSource.listarTodas();
  }

  listarProdutosDaCategoria(categoriaId: string): Promise<Produto[]> {
    return this.produtoDataSource.listarPorCategoria(categoriaId);
  }

  async buscarProduto(produtoId: string): Promise<Produto> {
    const produto = await this.produtoDataSource.buscarPorId(produtoId);
    if (!produto) throw new Error("Item não encontrado.");
    return produto;
  }

  ajustarQuantidade(novaQuantidade: number): number {
    return Math.max(QUANTIDADE_MINIMA, novaQuantidade);
  }
}
import { Categoria } from "../model/entities/Categoria";
import { Produto } from "../model/entities/Produto";
import { NotFoundError, ValidationError } from "../model/errors";
import { ICategoriaRepository } from "../model/repositories/ICategoriaRepository";
import { IProdutoRepository } from "../model/repositories/IProdutoRepository";
import { QUANTIDADE_MINIMA } from "../model/rules/Quantidade";
import { IMenuUseCases } from "./IMenuUseCases";

const TITULO_PADRAO = "Cardápio";

const TITULOS = new Map<string, string>([
  ["comidas", "Comidas"],
  ["bebidas", "Bebidas"],
]);

export class MenuUseCases implements IMenuUseCases {
  constructor(
    private categoriaRepository: ICategoriaRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  listarCategorias(): Promise<Categoria[]> {
    return this.categoriaRepository.listarTodas();
  }

  async listarProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    MenuValidator.validarId(categoriaId, "da categoria");
    return this.produtoRepository.listarPorCategoria(categoriaId);
  }

  async buscarProdutoPorId(produtoId: string): Promise<Produto> {
    MenuValidator.validarId(produtoId, "do produto");
    const produto = await this.produtoRepository.buscarPorId(produtoId);
    if (!produto) throw new NotFoundError("Item não encontrado.");
    return produto;
  }

  ajustarQuantidade(novaQuantidade: number): number {
    return Math.max(QUANTIDADE_MINIMA, novaQuantidade);
  }

  obterTituloCategoria(categoriaId?: string): string {
    return (categoriaId && TITULOS.get(categoriaId)) || TITULO_PADRAO;
  }
}

class MenuValidator {
  static validarId(id: string, descricao: string): void {
    if (!id || id.trim() === "") {
      throw new ValidationError(`O identificador ${descricao} é obrigatório.`);
    }
  }
}

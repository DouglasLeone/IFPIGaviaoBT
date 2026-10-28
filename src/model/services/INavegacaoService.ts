export interface INavegacaoService {
  abrirCategoria(categoriaId: string): void;
  abrirProduto(produtoId: string): void;
  voltar(): void;
}

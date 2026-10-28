import { router } from "expo-router";
import { INavegacaoService } from "../../model/services/INavegacaoService";

export class ExpoRouterNavegacaoService implements INavegacaoService {
  abrirCategoria(categoriaId: string): void {
    router.push(`/category/${categoriaId}` as any);
  }

  abrirProduto(produtoId: string): void {
    router.push(`/item/${produtoId}` as any);
  }

  voltar(): void {
    router.back();
  }
}

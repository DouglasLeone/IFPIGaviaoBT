import { InMemoryCategoriaRepository } from "../infra/repositories/InMemoryCategoriaRepository";
import { InMemoryProdutoRepository } from "../infra/repositories/InMemoryProdutoRepository";
import { ExpoRouterNavegacaoService } from "../infra/services/ExpoRouterNavegacaoService";
import { IMenuUseCases } from "../usecase/IMenuUseCases";
import { MenuUseCases } from "../usecase/MenuUseCases";

// Único ponto da aplicação que conhece as implementações concretas.
// As instâncias são criadas uma só vez para manter referências estáveis entre renders.
const categoriaRepository = new InMemoryCategoriaRepository();
const produtoRepository = new InMemoryProdutoRepository();

export const navegacao = new ExpoRouterNavegacaoService();

export const menuUseCases: IMenuUseCases = new MenuUseCases(
  categoriaRepository,
  produtoRepository
);

import { useProdutoViewModel } from "../viewmodel/useProdutoViewModel";
import { menuUseCases, navegacao } from "./container";

export function makeProdutoViewModel(produtoId?: string) {
  return useProdutoViewModel(menuUseCases, navegacao, produtoId);
}

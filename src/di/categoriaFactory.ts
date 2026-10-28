import { useCategoriaViewModel } from "../viewmodel/useCategoriaViewModel";
import { menuUseCases, navegacao } from "./container";

export function makeCategoriaViewModel(categoriaId?: string) {
  return useCategoriaViewModel(menuUseCases, navegacao, categoriaId);
}

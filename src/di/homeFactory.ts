import { useHomeViewModel } from "../viewmodel/useHomeViewModel";
import { menuUseCases, navegacao } from "./container";

export function makeHomeViewModel() {
  return useHomeViewModel(menuUseCases, navegacao);
}

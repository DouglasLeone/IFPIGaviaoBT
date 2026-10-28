import { DomainError } from "@/model/errors";

export function mensagemDeErro(err: unknown, mensagemPadrao: string): string {
  return err instanceof DomainError ? err.message : mensagemPadrao;
}

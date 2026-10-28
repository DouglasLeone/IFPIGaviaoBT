import { Categoria } from "../entities/Categoria";

export interface ICategoriaRepository {
  listarTodas(): Promise<Categoria[]>;
}

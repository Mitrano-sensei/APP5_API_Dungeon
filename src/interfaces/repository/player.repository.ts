import { Player } from "../entity/player.type";

export interface PlayerRepository {
    save(name: string): Promise<Player>;
    findByName(name: string): Promise<Player | null>;
    delete(name: string): Promise<Player>;
    deleteById(id: number): Promise<Player | null>;
    update(id: number, newName: string): Promise<Player | null>;
    getAll(page: number, pagesize: number): Promise<Player[]>;
    findById(id: number): Promise<Player | null>;
}
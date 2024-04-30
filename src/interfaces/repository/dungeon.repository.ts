import Dungeon from "../entity/dungeon.type";

export interface DungeonRepository {
    save(name: string): Promise<Dungeon>;
    deleteByName(name: string): Promise<Dungeon>;
    delete(id: number): Promise<Dungeon | null>;
    update(id: number, newName: string): Promise<Dungeon | null>;
    getAll(page: number, pagesize: number): Promise<Dungeon[]>;
    findByName(name: string): Promise<Dungeon | null>;
    findById(id: number): Promise<Dungeon | null>;
}

import Dungeon from "../../../interfaces/entity/dungeon.type";
import { DungeonRepository } from "../../../interfaces/repository/dungeon.repository";
import client from "../../../../prisma/database";


export default class PrismaDungeonRepository implements DungeonRepository {
    save(name: string): Promise<Dungeon> {
        return client.dungeon.create({
            data: {
                name
            }
        });
    }
    deleteByName(name: string): Promise<Dungeon> {
        return client.dungeon.delete({
            where: {
                name
            }
        });
    }
    delete(id: number): Promise<Dungeon> {
        return client.dungeon.delete({
            where: {
                id
            }
        });
    }
    update(id: number, newName: string): Promise<Dungeon | null> {
        throw new Error("Method not implemented.");
    }
    getAll(page: number, pagesize: number): Promise<Dungeon[]> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<Dungeon | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Dungeon | null> {
        throw new Error("Method not implemented.");
    }

}
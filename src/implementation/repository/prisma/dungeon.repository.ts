import Dungeon from "../../../interfaces/entity/dungeon.type";
import { DungeonRepository } from "../../../interfaces/repository/dungeon.repository";
import client from "../../../../prisma/database";


export default class PrismaDungeonRepository implements DungeonRepository {
    async save(name: string): Promise<Dungeon> {
        return await client.dungeon.create({
            data: {
                name
            }
        });
    }
    async deleteByName(name: string): Promise<Dungeon> {
        return await client.dungeon.delete({
            where: {
                name
            }
        });
    }
    async delete(id: number): Promise<Dungeon> {
        return await client.dungeon.delete({
            where: {
                id
            }
        });
    }
    async update(id: number, newName: string): Promise<Dungeon | null> {
        return await client.dungeon.update({
            where: { id: id},
            data: { name: newName },
        });
    }
    async getAll(page: number, pagesize: number): Promise<Dungeon[]> {
        return await client.dungeon.findMany({
            skip: page * pagesize,
            take: pagesize
        });
    }
    async findByName(name: string): Promise<Dungeon | null> {
        return await client.dungeon.findFirst({
            where: {
                name
            }
        });
    }
    async findById(id: number): Promise<Dungeon | null> {
        return await client.dungeon.findFirst({
            where: {
                id
            }
        });
    }

}
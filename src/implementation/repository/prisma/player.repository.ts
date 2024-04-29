import client from "../../../../prisma/database";
import { Player } from "../../../interfaces/entity/player.type";
import { PlayerRepository } from "../../../interfaces/repository/player.repository";

export class PrismaPlayerRepository implements PlayerRepository {
    constructor(){}

    async save(name: string): Promise<Player> {
        const player = await client.player.create({
            data: {
                name
            }
        });
        return player;
    }
    
    async findByName(name: string): Promise<Player | null> {
        const player = await client.player.findUnique({
            where: {
                name
            }
        });
        return player;
    }

    async delete(name: string): Promise<Player> {
        const player = await client.player.delete({
            where: {
                name
            }
        });
        return player;
    }

    async deleteById(id: number) : Promise<Player | null> {
        const player = await client.player.delete({
            where: {
                id
            }
        }).catch(e => {
            return null;
        });
        return player;
    }

    async update(id: number, newName: string): Promise<Player | null> {
        const player = await client.player.update({
            where: {
                id: id
            },
            data: {
                name: newName
            }
        }).catch(e=> {
            return null;
        });
        return player;
    }

    async getAll(page: number, pagesize: number): Promise<Player[]> {
        const players = await client.player.findMany({
            skip: (page-1)*pagesize,
            take: pagesize,
        });
        return players;
    }

    async findById(id: number): Promise<Player | null> {
        const player = await client.player.findUnique({
            where: {
                id
            }
        });
        return player;
    }
}
import { Score } from "../../../interfaces/entity/score.type";
import { ScoreRepository } from "../../../interfaces/repository/score.repository";

import client from "../../../../prisma/database";

export class PrismaScoreRepository implements ScoreRepository {
    async save(points: number, playerIds: number[], dungeonId: number): Promise<Score> {
        const score = await client.score.create({
            data: {
                points,
                group: {
                    connect: playerIds.map(id => {return {id}})
                },
                dungeonId
            },
            include: {
                group: true
            }
        });
        return score;
    }
    
    async findById(id: number): Promise<Score | null> {
        const score = await client.score.findUnique({
            where: { id },
            include: {
                group: true
            }
        }).catch(e => {
            throw new Error("Score not found");
        });
        return score;
    }
    
    async update(id: number, newPoints: number | null, newGroupIds: number[] | null, newDungeonId: number | null): Promise<Score | null> {
        let playerIds = newGroupIds;
        let dungeonId = newDungeonId;

        const oldScore = await client.score.findUnique({
            where: { id: id },
            include: {
                group: true
            }
        });
    
        if (!oldScore) throw new Error("Score not found");
    
        const newGroup: any = [];
    
        if (dungeonId){
            const dungeon = await client.dungeon.findUnique({
                where: { id: dungeonId }
            })
            if (!dungeon) throw new Error("Dungeon not found");
        }
    
        const data = {
            dungeon: {connect: {id: dungeonId ? dungeonId : oldScore.dungeonId}},
            points: newPoints ? newPoints : oldScore.points,
            group: {connect: []}    // Ignored in case of update
        }
    
        if (!playerIds || (playerIds.length === 0 && playerIds != oldScore.group.map(p => p.id))) {
            return await client.score.update({
                where: { id: id },
                data: data,
                include: {
                    group: true
                }
            });
        } else {
            // In that case, delete the old score and replace it with a new connection.
            for (let i=0; i<playerIds.length; i++) {
                newGroup.push({id: playerIds[i]});
            }
    
            data.group = {connect: newGroup};
            await client.score.delete({
                where: { id: id }
            });
            return await this.save(newPoints ? newPoints : oldScore.points, playerIds, newDungeonId ? newDungeonId : oldScore.dungeonId);
        }
    }
    
    async delete(id: number): Promise<Score> {
        const score = await client.score.delete({
            where: { id },
            include: {
                group: true
            }
        }).catch(e => {
            throw new Error("Score not found");
        });
        return score;
    }
    
    async getAll(page: number, pagesize: number, min: number, max: number, orderby: string, desc: string): Promise<Score[]>{
        let scores;
        if(orderby==="points"){
            scores = await client.score.findMany(
                {
                    skip: (page-1)*pagesize,
                    take: pagesize,
                    include: {
                        group: true
                    },
                    orderBy:{
                        points: (desc == "desc" ? "desc" : "asc")
                    },
                    where:{
                        points:{
                            gt:min,
                            lt:max
                        } 
                    }
                }
            );
        }else{
            scores = await client.score.findMany(
                {
                    skip: (page-1)*pagesize,
                    take: pagesize,
                    include: {
                        group: true
                    },
                    orderBy:{
                        id: (desc == "desc" ? "desc" : "asc")
                    },
                    where:{
                        points:{
                            gt:min,
                            lt:max
                        } 
                    }
                }
            );
        }
        return scores;
    }

    async getAllFromDungeon(page: number, pagesize: number, dungeonId: number, min: number, max: number, orderby: string, desc: string): Promise<Score[]> {
        let scores;
        if(orderby==="points"){
            scores = await client.score.findMany(
                {
                    skip: (page-1)*pagesize,
                    take: pagesize,
                    include: {
                        group: true
                    },
                    orderBy:{
                        points: (desc == "desc" ? "desc" : "asc")
                    },
                    where:{
                        points:{
                            gt:min,
                            lt:max
                        },
                        dungeonId: dungeonId
                    }
                }
            );
        }else{
            scores = await client.score.findMany(
                {
                    skip: (page-1)*pagesize,
                    take: pagesize,
                    include: {
                        group: true
                    },
                    orderBy:{
                        id: (desc == "desc" ? "desc" : "asc")
                    },
                    where:{
                        points:{
                            gt:min,
                            lt:max
                        },
                        dungeonId: dungeonId
                    }
                }
            );
        }
    
        return scores;
    }
    async getAllFromPlayer(page: number, pagesize: number, playerId: number, min: number, max: number, orderby: string, desc: string): Promise<Score[]> {
        let scores;
        if(orderby==="points"){
            scores = await client.score.findMany(
                {
                    skip: (page-1)*pagesize,
                    take: pagesize,
                    include: {
                        group: true
                    },
                    orderBy:{
                        points: (desc == "desc" ? "desc" : "asc")
                    },
                    where:{
                        points:{
                            gt:min,
                            lt:max
                        },
                        group: {
                            some: {id: playerId}
                        }
                    }
                }
            );
        }else{
            scores = await client.score.findMany(
                {
                    skip: (page-1)*pagesize,
                    take: pagesize,
                    include: {
                        group: true
                    },
                    orderBy:{
                        id: (desc == "desc" ? "desc" : "asc")
                    },
                    where:{
                        points:{
                            gt:min,
                            lt:max
                        },
                        group: {
                            some: {id: playerId}
                        }
                        
                    }
                }
            );
        }
    
        return scores;
    }

}

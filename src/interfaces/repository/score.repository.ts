import { Score } from '../entity/score.type';

export interface ScoreRepository {
    save(points: number, playerIds: number[], dungeonId: number): Promise<Score | null>;
    findById(id: number): Promise<Score | null>;
    update(id: number, newPoints: number | null, newGroupIds: number[] | null, newDungeonId: number | null): Promise<Score | null>;
    delete(id: number): Promise<Score | null>;
    getAll(page: number, pagesize: number, min: number, max: number, orderby: string, desc: string): Promise<Score[]>;
    getAllFromDungeon(page: number, pagesize: number, dungeonId: number, min: number, max: number, orderby: string, desc: string): Promise<Score[]>;
    getAllFromPlayer(page: number, pagesize: number, playerId: number, min: number, max: number, orderby: string, desc: string): Promise<Score[]>;
}

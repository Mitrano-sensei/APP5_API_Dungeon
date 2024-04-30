import { Player } from "./player.type";

export class Score {
    constructor(public id:number, public points:number, public group:Player[], public dungeonId: number){}
}
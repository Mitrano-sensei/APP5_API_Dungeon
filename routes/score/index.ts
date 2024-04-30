import express from 'express';
import pagesize from "../../queryConfig";
import { ScoreRepository } from '../../src/interfaces/repository/score.repository';
import { PrismaScoreRepository } from '../../src/implementation/repository/prisma/score.repository';

const router = express.Router();
const repository : ScoreRepository = new PrismaScoreRepository();

// Get all scores
router.get("/", async (req: any, res: any) => {

    // Paramètres de requête pour la pagination : page et size, des entiers positifs
    var {page, size, min, max, orderby, desc} = req.query;

    if(page===undefined || page<=0){
        page=1;
    } 
    var take = (size === undefined || size <= 0) ? pagesize : size;
    
    // Make sure they are Int
    page = parseInt(page);
    take = parseInt(take);
    min = parseInt(min);
    max = parseInt(max);
    desc = parseInt(desc);
    var score;

    if(!desc ){
        desc="asc";
    }else{
        desc="desc";
    }

    if(!min || min <0){
        min=-1;
    }else{
        min=min-1;
    }

    if(!max ){
       max= Number.MAX_SAFE_INTEGER;
    }else{
        max=max+1;
    }

    // TODO : Orderby, min, max
    score = await repository.getAll(page, take, min, max, orderby, desc).catch(e => {
        res.status(404).send(e.message);
        return;
    });
    
    res.status(200).json(score);
});

// Get score for an id
router.get("/:id", async (req: any, res: any) => {
    const { id } = req.params;
    const score = await repository.findById(parseInt(id)).catch(e => {
        res.status(404).send(e.message);
        return;
    });
    res.status(200).json(score);
});

// Get score for a player
router.get("/player/:id", async (req: any, res: any) => {
    const { id } = req.params;
    var { page, size, min, max, orderby, desc } = req.query;
    if(page===undefined || page<=0){
        page=1;
    } 
    var take = (size === undefined || parseInt(size) <= 0) ? pagesize : size;
    
    // Make sure they are Int
    page = parseInt(page);
    take = parseInt(take);
    min=parseInt(min);
    max= parseInt(max);
    desc=parseInt(desc);
    var score;

    if(!desc ){
        desc="asc";
    }else{
        desc="desc";
    }

    if(!min || min <0){
        min=-1;
    }else{
        min=min-1;
    }

    if(!max ){
       max= Number.MAX_SAFE_INTEGER;

        
    }else{
        max=max+1;
    }

    score = await repository.getAllFromPlayer(page, take, parseInt(id), min, max, orderby, desc).catch(e => {
        res.status(404).send(e.message);
        return;
    });

    if(score === null){
        res.status(404).send("Player not found");
        return;
    }
    res.status(200).json(score);
});

// Get score for a dungeon
router.get("/dungeon/:id", async (req: any, res: any) => {
    const { id } = req.params;

    // Paramètres de requête pour la pagination : page et size, des entiers positifs

    var { page, size, min, max, orderby, desc } = req.query;

    if(page===undefined || page<=0){
        page=1;
    } 
    var take = (size === undefined || parseInt(size) <= 0) ? pagesize : size;
    
    // Make sure they are Int
    page = parseInt(page);
    take = parseInt(take);
    min=parseInt(min);
    max= parseInt(max);
    desc=parseInt(desc);
    var score;

    if(!desc ){
        desc="asc";
    }else{
        desc="desc";
    }

    if(!min || min <0){
        min=-1;
    }else{
        min=min-1;
    }

    if(!max ){
       max= Number.MAX_SAFE_INTEGER;

        
    }else{
        max=max+1;
        
    }

    score = await repository.getAllFromDungeon(page, take, parseInt(id), min, max, orderby, desc).catch(e => {
        res.status(404).send(e.message);
        return;
    });
    
    if(score === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    res.status(200).json(score);
});

// Create a score
router.post("/", async (req: any, res: any) => { 
    // dungeonId: entier positif, l'id du donjon concerné
    // playersIds: array d'entiers positifs: les id des joueurs concernés
    // points: entier positif, le nombre de points associé au score
    const { dungeonId, playerIds, points  } = req.body;
    // TODO : Validation
    const score = await repository.save(points, playerIds, dungeonId).catch(e => {
        res.status(404).send(e.message);
        return;
    });;
    res.status(201).json(score);
});

router.delete("/:id", async (req: any, res: any)=>{
    // id: entier positif, l'id du score à supprimer
	const {id} = req.params;
	const score = await repository.delete(parseInt(id)).catch(e => {
        res.status(404).send(e.message);
        return;
    });
    res.status(201).json(score);
	
});

// Update a score
// In some cases we have to recreate a score instead of updating it
router.put("/:id", async (req: any, res: any)=>{
    // On peut recevoir un ou plusieurs paramètres à mettre à jour parmi les suivants :
    // dungeonId, playerIds, points
    const {id} = req.params;
    const {dungeonId, playerIds, points } = req.body;
    let score;

    if(dungeonId === undefined && playerIds === undefined && points === undefined){
        res.status(400).send("No data to update");
        return;
    }

    score = await repository.update(parseInt(id), points, playerIds, dungeonId).catch(e => {
        res.status(404).send(e.message);
        return;
    });;

    return res.status(201).json(score);
});

export default router;

import express from 'express';
import pagesize from "../../queryConfig";
import { PlayerRepository } from '../../src/interfaces/repository/player.repository';
import { PrismaPlayerRepository } from '../../src/implementation/repository/prisma/player.repository';
import { Schemas } from '../../schemas/index';

const router = express.Router();
const repository:PlayerRepository = new PrismaPlayerRepository();

// Get all players
router.get("/", async (req: any, res: any) => {
    var { error, value } = Schemas.playersGetSchema.validate(req.query);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    // Paramètres de requête pour la pagination : page et size, des entiers positifs
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : size;
    
    const players=await repository.getAll(page, parseInt(take)).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    var { error, value } = Schemas.playersSchema.validate(players);
    if (error === undefined) {
        res.status(200).json(players);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

// Get player by id
router.get("/:id", async (req: any, res: any) => {
    var { error, value } = Schemas.playersGetByIdSchema.validate(req.params);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    // id: entier positif, id du joueur à renvoyer
    const { id } = req.params;
    const player = await repository.findById(parseInt(id)).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    if(player === null){
        res.status(404).send("Player not found");
        return;
    }
    var { error, value } = Schemas.playerSchema.validate(player);
    if (error === undefined) {
        res.status(200).json(player);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

// Get player by name
router.get("/name/:name", async (req: any, res: any) => {
    var { error, value } = Schemas.playersGetByNameSchema.validate(req.params);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    // name: string, nom du joueur à renvoyer
    const { name } = req.params;
    const player = await repository.findByName(name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    if(player === null){
        res.status(404).send("Player not found");
        return;
    }
    var { error, value } = Schemas.playerSchema.validate(player);
    if (error === undefined) {
        res.status(200).json(player);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

router.post("/", async (req: any, res: any) => { 
    var { error, value } = Schemas.playersPostSchema.validate(req.body);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    // name: string, nom du joueur à créer
    const { name } = req.body;
    const player = await repository.save(name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    var { error, value } = Schemas.playerSchema.validate(player);
    if (error === undefined) {
        res.status(201).json(player);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

router.delete("/:id", async (req: any, res: any)=>{
    var { error, value } = Schemas.playersDeleteSchema.validate(req.params);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    // id: entier positif, id du joueur à supprimer
	const {id}= req.params;
    const player = await repository.delete(parseInt(id)).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    if (player === null){
        res.status(404).send("Player not found");
        return;
    }
    var { error, value } = Schemas.playerSchema.validate(player);
    if (error === undefined) {
        res.status(201).json(player);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

router.put("/:id", async (req: any, res: any)=>{
    // id: entier positif, id du joueur à modifer
    // name: string, nouveau nom du joueur
	const {id} = req.params;
    const {name}= req.body;

    var { error, value } = Schemas.playersPutSchema.validate({id, name});
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    
	let notValid = !name;
    if(notValid){
        res.status(404).send("Invalid name");
        return;
    }

    const player =await repository.update(parseInt(id), name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    if (player === null) {
        res.status(404).send("Player not found or Error while updating player.");
        return;
    }
    var { error, value } = Schemas.playerSchema.validate(player);
    if (error === undefined) {
        res.status(201).json(player);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
	
});


export default router;

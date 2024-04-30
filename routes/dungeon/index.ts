import express from 'express';
import pagesize from "../../queryConfig";
import { DungeonRepository } from '../../src/interfaces/repository/dungeon.repository';
import PrismaDungeonRepository from '../../src/implementation/repository/prisma/dungeon.repository';
import { Schemas } from '../../schemas/index';

const router = express.Router();
// Should be DI
const repository : DungeonRepository = new PrismaDungeonRepository();

// Get all dungeons
router.get("/", async (req: any, res: any) => {
    var { error, value } = Schemas.dungeonsGetSchema.validate(req.query);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : parseInt(size);
    const dungeons= await repository.getAll(page-1, take).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    var { error, value } = Schemas.dungeonsSchema.validate(dungeons);
    if (error === undefined) {
        res.status(200).json(dungeons);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

router.get("/:id", async (req: any, res: any) => {
    var { error, value } = Schemas.dungeonsGetByIdSchema.validate(req.params);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    const { id } = req.params;
    const dungeon = await repository.findById(parseInt(id)).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    if(dungeon === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    var { error, value } = Schemas.dungeonSchema.validate(dungeon);
    if (error === undefined) {
        res.status(200).json(dungeon);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

router.get("/name/:name", async (req: any, res: any) => { 
    var { error, value } = Schemas.dungeonsGetByNameSchema.validate(req.params);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    const { name } = req.params;
    const dungeon = await repository.findByName(name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    if(dungeon === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    var { error, value } = Schemas.dungeonSchema.validate(dungeon);
    if (error === undefined) {
        res.status(200).json(dungeon);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

router.post("/", async (req: any, res: any) => { 
    var { error, value } = Schemas.dungeonsPostSchema.validate(req.body);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }
    const { name } = req.body;
    // TODO : Validation

    const dungeon = await repository.save(name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    var { error, value } = Schemas.dungeonSchema.validate(dungeon);
    if (error === undefined) {
        res.status(201).json(dungeon);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
});

router.delete("/:id", async (req: any, res: any)=>{
    var { error, value } = Schemas.dungeonsDeleteSchema.validate(req.params);
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }

	const {id}= req.params;
	
	const dungeon =await repository.delete(parseInt(id)).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    var { error, value } = Schemas.dungeonSchema.validate(dungeon);
    if (error === undefined) {
        res.status(201).json(dungeon);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
	
});

router.put("/:id", async (req: any, res: any)=>{
	const {id} = req.params;
    const {name}= req.body;

    var { error, value } = Schemas.dungeonsPutSchema.validate({id, name});
    if (error !== undefined) {
        res.status(300).send("Error: "+ error);
        return;
    }

	let notValid = !name;
    if(notValid){
        res.status(404).send("Invalid name");
        return;
    }

    const dungeon =await repository.update(parseInt(id), name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
    var { error, value } = Schemas.dungeonSchema.validate(dungeon);
    if (error === undefined) {
        res.status(201).json(dungeon);
    }
    else {
        res.status(500).send("Error: "+ error);
    }
	
});

export default router;
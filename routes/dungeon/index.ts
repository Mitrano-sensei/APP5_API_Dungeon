import express from 'express';
<<<<<<< HEAD
import pagesize from "../../queryConfig";
import { DungeonRepository } from '../../src/interfaces/repository/dungeon.repository';
import PrismaDungeonRepository from '../../src/implementation/repository/prisma/dungeon.repository';

const router = express.Router();
// Should be DI
const repository : DungeonRepository = new PrismaDungeonRepository();
=======
import client from "../../prisma/database";
import pagesize from "../../queryConfig";

const router = express.Router();
>>>>>>> master

// Get all dungeons
router.get("/", async (req: any, res: any) => {
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : size;
<<<<<<< HEAD
    const dungeons= await repository.getAll(page-1, take).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
=======
    const dungeons=await client.dungeon.findMany({
        skip: (page-1)*take,
        take: parseInt(take),
    })
>>>>>>> master
    res.status(200).json(dungeons);
});

router.get("/:id", async (req: any, res: any) => {
    const { id } = req.params;
<<<<<<< HEAD
    const dungeon = await repository.findById(parseInt(id)).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
=======
    const dungeon = await client.dungeon.findUnique({
        where: { id: parseInt(id) }
>>>>>>> master
    });
    if(dungeon === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    res.status(200).json(dungeon);
});

router.get("/name/:name", async (req: any, res: any) => { 
    const { name } = req.params;
<<<<<<< HEAD
    const dungeon = await repository.findByName(name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
=======
    const dungeon = await client.dungeon.findUnique({
        where: { name: name }
>>>>>>> master
    });
    if(dungeon === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    res.status(200).json(dungeon);
});

router.post("/", async (req: any, res: any) => { 
    const { name } = req.body;
    // TODO : Validation

<<<<<<< HEAD
    const dungeon = await repository.save(name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
=======
    const dungeon = await client.dungeon.create({
        data: {
            name
        }
>>>>>>> master
    });
    res.status(201).json(dungeon);
});

router.delete("/:id", async (req: any, res: any)=>{
	const {id}= req.params;
	
<<<<<<< HEAD
	const dungeon =await repository.delete(parseInt(id)).catch((err)=>{
        res.status(400).send("Error: "+err);
=======
	const dungeon =await client.dungeon.delete({
	  where: { id: parseInt(id) },
	}).catch((e: any)=>{
        res.status(404).send("Dungeon not found");
>>>>>>> master
        return;
    });
    res.status(201).json(dungeon);
	
});

router.put("/:id", async (req: any, res: any)=>{
	const {id} = req.params;
    const {name}= req.body;

	let notValid = !name;
    if(notValid){
        res.status(404).send("Invalid name");
        return;
    }

<<<<<<< HEAD
    const dungeon =await repository.update(parseInt(id), name).catch((err)=>{
        res.status(400).send("Error: "+err);
        return;
    });
=======
    const dungeon =await client.dungeon.update({
        where: { id: parseInt(id)},
        data: { name: name },
    }).catch((e: any)=>{
        res.status(404).send("Dungeon not found");
        return;
    });
	
>>>>>>> master
    res.status(201).json(dungeon);
	
});

export default router;
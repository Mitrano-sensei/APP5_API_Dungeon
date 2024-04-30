import express from 'express';
import pagesize from "../../queryConfig";
import { DungeonRepository } from '../../src/interfaces/repository/dungeon.repository';
import PrismaDungeonRepository from '../../src/implementation/repository/prisma/dungeon.repository';

const router = express.Router();
// Should be DI
const repository : DungeonRepository = new PrismaDungeonRepository();

// Get all dungeons
router.get("/", async (req: any, res: any) => {
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : size;
    const dungeons= repository.getAll(page-1, take);
    res.status(200).json(dungeons);
});

router.get("/:id", async (req: any, res: any) => {
    const { id } = req.params;
    const dungeon = await repository.findById(parseInt(id));
    if(dungeon === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    res.status(200).json(dungeon);
});

router.get("/name/:name", async (req: any, res: any) => { 
    const { name } = req.params;
    const dungeon = await repository.findByName(name);
    if(dungeon === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    res.status(200).json(dungeon);
});

router.post("/", async (req: any, res: any) => { 
    const { name } = req.body;
    // TODO : Validation

    const dungeon = await repository.save(name);
    res.status(201).json(dungeon);
});

router.delete("/:id", async (req: any, res: any)=>{
	const {id}= req.params;
	
	const dungeon =await repository.delete(parseInt(id));
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

    const dungeon =await repository.update(parseInt(id), name);
    res.status(201).json(dungeon);
	
});

export default router;
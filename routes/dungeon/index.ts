import express from 'express';
import client from "../../prisma/database";
import pagesize from "../../queryConfig";

const router = express.Router();

// Get all dungeons
router.get("/", async (req: any, res: any) => {
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : size;
    const dungeons=await client.dungeon.findMany({
        skip: (page-1)*take,
        take: parseInt(take),
    })
    res.status(200).json(dungeons);
});

router.get("/:id", async (req: any, res: any) => {

    const { id } = req.params;
    const dungeon = await client.dungeon.findUnique({
        where: { id: parseInt(id) }
    });
    if(dungeon === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    res.status(200).json(dungeon);
});

router.get("/name/:name", async (req: any, res: any) => { 
    const { name } = req.params;
    const dungeon = await client.dungeon.findUnique({
        where: { name: name }
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

    const dungeon = await client.dungeon.create({
        data: {
            name
        }
    });
    res.status(201).json(dungeon);
});

router.delete("/:id", async (req: any, res: any)=>{
	const {id}= req.params;
	
	const dungeon =await client.dungeon.delete({
	  where: { id: parseInt(id) },
	}).catch((e: any)=>{
        res.status(404).send("Dungeon not found");
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

    const dungeon =await client.dungeon.update({
        where: { id: parseInt(id)},
        data: { name: name },
    }).catch((e: any)=>{
        res.status(404).send("Dungeon not found");
        return;
    });
	
    res.status(201).json(dungeon);
	
});

export default router;
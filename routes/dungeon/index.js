const { Router } = require("express");
const { client } = require("../../prisma/database");
const {pagesize}=require("../../queryConfig");

const router = Router();

// Get all dungeons
router.get("/", async (req, res) => {
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : size;
    const dungeons=await client.dungeon.findMany({
        skip: parseInt((page-1)*take),
        take: parseInt(take),
    })
    res.status(200).json(dungeons);
});

router.get("/:id", async (req, res) => {

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

router.get("/name/:name", async (req, res) => { 
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

router.post("/", async (req, res) => { 
    const { name } = req.body;
    // TODO : Validation

    const dungeon = await client.dungeon.create({
        data: {
            name
        }
    });
    res.status(201).json(dungeon);
});

router.delete("/:id", async (req, res)=>{
	const {id}= req.params;
	
	const dungeon =await client.dungeon.delete({
	  where: { id: parseInt(id) },
	}).catch((e)=>{
        res.status(404).send("Dungeon not found");
        return;
    });
    res.status(201).json(dungeon);
	
});

router.put("/:id", async (req, res)=>{
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
    }).catch((e)=>{
        res.status(404).send("Dungeon not found");
        return;
    });
	
    res.status(201).json(dungeon);
	
});

module.exports = router;

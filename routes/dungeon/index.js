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
        skip: (page-1)*take,
        take: take,
    })
    res.status(200).json(dungeons);
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
	});
    res.status(201).json(dungeon);
	
});

router.put("/:id", async (req, res)=>{
	const {id} = req.params;
    const {name}= req.body;

	let notValid = !name;
    if(notValid){
        createError(404);
        return;
    }

    const dungeon =await client.dungeon.update({
        where: { id: parseInt(id)},
        data: { name: name },
    });
	
    res.status(201).json(dungeon);
	
});

module.exports = router;

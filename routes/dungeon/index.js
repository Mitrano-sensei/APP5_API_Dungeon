const { Router } = require("express");
const { client } = require("../../prisma/database");

const router = Router();

// Get all dungeons
router.get("/", async (req, res) => {
    const dungeons = await client.dungeon.findMany();
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

router.delete("/", async (req, res)=>{
	const {id}= req.body;
	
	const dungeon =await client.dungeon.delete({
	  where: { id: id },
	});
    res.status(201).json(dungeon);
	
});

router.put("/", async (req, res)=>{
	const {id,name}= req.body;
	let notValid = !name;
    if(notValid){
        createError(404);
        return;
    }

    const dungeon =await client.dungeon.update({
        where: { id: id},
        data: { name: name },
    });
	
    res.status(201).json(dungeon);
	
});

module.exports = router;

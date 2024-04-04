const { Router } = require("express");
const { client } = require("../../prisma/database");
const {pagesize}=require("../../queryConfig");

const router = Router();

// Récupérer tous les livres
router.get("/", async (req, res) => {
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : size;
    const players=await client.player.findMany({
        skip: (page-1)*take,
        take: take,
    })
    res.status(200).json(players);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const player = await client.player.findUnique({
        where: { id: parseInt(id) }
    });
    if(player === null){
        res.status(404).send("Player not found");
        return;
    }
    res.status(200).json(player);
});

router.get("/name/:name", async (req, res) => {
    const { name } = req.params;
    const player = await client.player.findUnique({
        where: { name: name }
    });
    if(player === null){
        res.status(404).send("Player not found");
        return;
    }
    res.status(200).json(player);
});

router.post("/", async (req, res) => { 
    const { name } = req.body;
    // TODO : Validation

    const player = await client.player.create({
        data: {
            name
        }
    });
    res.status(201).json(player);
});

router.delete("/", async (req, res)=>{
	const {id}= req.body;
	
	const player =await client.player.delete({
	  where: { id: id},
	});
    res.status(201).json(player);
	
});

router.put("/", async (req, res)=>{
	const {id,name}= req.body;
	let notValid = !name;
    if(notValid){
        createError(404);
        return;
    }

    const player =await client.player.update({
        where: { id: id},
        data: { name: name },
    });
	
    res.status(201).json(player);
	
});


module.exports = router;

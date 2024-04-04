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

router.delete("/:id", async (req, res)=>{
	const {id}= req.params;

	const player =await client.player.delete({
	  where: { id: parseInt(id)},
	});
    res.status(201).json(player);
	
});

router.put("/:id", async (req, res)=>{
	const {id} = req.params;
    const {name}= req.body;
    
	let notValid = !name;
    if(notValid){
        res.status(404).send("Player not found");
        return;
    }

    const player =await client.player.update({
        where: { id: parseInt(id)},
        data: { name: name },
    });
	
    res.status(201).json(player);
	
});


module.exports = router;

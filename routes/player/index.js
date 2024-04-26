const { Router } = require("express");
const { client } = require("../../prisma/database");
const {pagesize}=require("../../queryConfig");

const router = Router();

//Pagination
router.get("/:page",async (req,res)=>{
    var {page} =req.params;
    if(page===undefined || page<=0){
        page=1;
    }
    const players=await client.player.findMany({
        skip: (page-1)*pagesize,
        take: pagesize,
    })

    res.status(200).json(players);
});

// Get all players
router.get("/", async (req, res) => {
    // Paramètres de requête pour la pagination : page et size, des entiers positifs
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    }
    var take = (size === undefined || size <= 0) ? pagesize : size;
    const players=await client.player.findMany({
        skip: parseInt((page-1)*take),
        take: parseInt(take),
    })
    res.status(200).json(players);
});

// Get player by id
router.get("/:id", async (req, res) => {
    // id: entier positif, id du joueur à renvoyer
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

// Get player by name
router.get("/name/:name", async (req, res) => {
    // name: string, nom du joueur à renvoyer
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
    // name: string, nom du joueur à créer
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
    // id: entier positif, id du joueur à supprimer
	const {id}= req.params;
	const player =await client.player.delete({
	  where: { id: parseInt(id)},
	}).catch((e)=>{
        res.status(404).send("Player not found");
        return;
    });
    res.status(201).json(player);
	
});

router.put("/:id", async (req, res)=>{
    // id: entier positif, id du joueur à modifer
    // name: string, nouveau nom du joueur
	const {id} = req.params;
    const {name}= req.body;
    
	let notValid = !name;
    if(notValid){
        res.status(404).send("Invalid name");
        return;
    }

    const player =await client.player.update({
        where: { id: parseInt(id)},
        data: { name: name },
    }).catch((e)=>{
        res.status(404).send("Player not found or Error while updating player.");
        return;
    });;
	
    res.status(201).json(player);
	
});


module.exports = router;

const { Router } = require("express");
const { client } = require("../../prisma/database");

const router = Router();

// Récupérer tous les livres
router.get("/", async (req, res) => {
    const players = await client.player.findMany();
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

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

module.exports = router;

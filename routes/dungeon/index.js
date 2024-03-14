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

module.exports = router;

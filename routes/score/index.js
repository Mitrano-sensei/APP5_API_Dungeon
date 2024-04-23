const { Router } = require("express");
const { client } = require("../../prisma/database");
const {pagesize}=require("../../queryConfig");

const router = Router();

// Get all scores
router.get("/", async (req, res) => {
    var {page, size} = req.query;
    if(page===undefined || page<=0){
        page=1;
    } 
    var take = (size === undefined || size <= 0) ? pagesize : size;
    
    // Make sure they are Int
    page = parseInt(page);
    take = parseInt(take);

    const scores = await client.score.findMany(
        {
            skip: (page-1)*take,
            take: take,
            include: {
                group: true
            }
        }
    );
    res.status(200).json(scores);
});

// Create a score
router.post("/", async (req, res) => { 
    const { dungeonId, playerIds, points  } = req.body;
    // TODO : Validation

    let players = [];
    for(let i=0; i<playerIds.length; i++)
    {
        players.push({id: playerIds[i]});
    }
    const score = await client.score.create({
        data: {
            dungeon: {
                connect: {
                    id: dungeonId
                }
            },
            points: points,
            group: {connect: players}
        },
        include: {
            group: true
        }
    });
    res.status(201).json(score);
});

router.delete("/:id", async (req, res)=>{
	const {id} = req.params;
	
	const score = await client.score.delete({
	  where: { id: parseInt(id)},
      include: {
        group: true
      }
	});
    res.status(201).json(score);
	
});

router.put("/", async (req, res)=>{
    const {id, dungeonId, playerIds, points } = req.body;
    let score;

    if (!id) res.status(400).json({error: "Missing id"});
    const oldScore = await client.score.findUnique({
        where: { id: parseInt(id) },
        include: {
            group: true
        }
    });

    if (!oldScore) return res.status(400).json({error: "Score not found"});

    const newGroup = [];

    if (dungeonId){
        const dungeon = await client.dungeon.findUnique({
            where: { id: parseInt(dungeonId) }
        })
        if (!dungeon) return res.status(400).json({error: "Dungeon not found"});
    }

    const data = {
        dungeon: {connect: {id: dungeonId ? parseInt(dungeonId) : parseInt(oldScore.dungeonId)}},
        points: points ? parseInt(points) : parseInt(oldScore.points),
        group: {connect: []}    // Ignored in case of update
    }

    if (!playerIds || (playerIds.length === 0 && playerIds != oldScore.group.map(p => p.id))) {
        score = await client.score.update({
            where: { id: parseInt(id) },
            data: data,
            include: {
                group: true
            }
        });
    } else {
        // In that case, delete the old score and replace it with a new connection.
        for (let i=0; i<playerIds.length; i++) {
            newGroup.push({id: playerIds[i]});
        }

        data.group = {connect: newGroup};
        await client.score.delete({
            where: { id: parseInt(id) }
        });
        score = await client.score.create({
            data: data,
            include: {
                group: true
            }
        });
    }

    return res.status(201).json(score);
});

module.exports = router;
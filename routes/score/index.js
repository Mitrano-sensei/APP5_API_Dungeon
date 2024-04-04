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
    if(id === undefined) { return res.status(400).send("Missing id"); }

    const oldScore = client.score.findUnique({where: {id: parseInt(id)}});
    let data = {}

    if(!dungeonId) { data["dungeonId"] = {connect: dungeonId}; }
    else { data["dungeonId"] = {connect: oldScore["dungeonId"]}; }

    if(!points) { data["points"] = points; }
    else { data["points"] = oldScore["points"]; }

    if(playerIds !== undefined){
        let players = [];
        for(let i=0; i<playerIds.length; i++)
        {
            players.push({id: playerIds[i]});
        }
        data["group"] = {connect: players};
    }
    else { data["group"] = oldScore["group"]; }

    await client.score.delete({
        where: { id: parseInt(id)}
    });

    console.log(data);
    const score = await client.score.create({
        data: data,
        include: {
            group: true
        }
    });
    console.log(data);

    return res.status(201).json(score);
});

module.exports = router;

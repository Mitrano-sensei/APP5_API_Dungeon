import express from 'express';
import client from "../../prisma/database";
import pagesize from "../../queryConfig";

const router = express.Router();

// Get all scores
router.get("/", async (req: any, res: any) => {
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

// Get score for an id
router.get("/:id", async (req: any, res: any) => {
    const { id } = req.params;
    const score = await client.score.findUnique({
        where: { id: parseInt(id) }
    });
    if(score === null){
        res.status(404).send("Player not found");
        return;
    }
    res.status(200).json(score);
});

// Get score for a player
router.get("/player/:id", async (req: any, res: any) => {
    const { id } = req.params;
    var { page, size } = req.query;
    if(page===undefined || page<=0){
        page=1;
    } 
    var take = (size === undefined || parseInt(size) <= 0) ? pagesize : size;
    
    // Make sure they are Int
    page = parseInt(page);
    take = parseInt(take);

    const score = await client.score.findMany({
        where: { group: {some: {id: parseInt(id)}} },
        skip: (page-1)*take,
        take: take,
        include: {
            group: true
        }
    });
    if(score === null){
        res.status(404).send("Player not found");
        return;
    }
    res.status(200).json(score);
});

// Get score for a dungeon
router.get("/dungeon/:id", async (req: any, res: any) => {
    const { id } = req.params;
    var { page, size } = req.query;
    if(page===undefined || page<=0){
        page=1;
    } 
    var take = (size === undefined || parseInt(size) <= 0) ? pagesize : size;
    
    // Make sure they are Int
    page = parseInt(page);
    take = parseInt(take);
    
    const score = await client.score.findMany({
        where: { dungeonId: parseInt(id) },
        skip: (page-1)*take,
        take: take,
        include: {
            group: true
        }
    });
    if(score === null){
        res.status(404).send("Dungeon not found");
        return;
    }
    res.status(200).json(score);
});

// Create a score
router.post("/", async (req: any, res: any) => { 
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

router.delete("/:id", async (req: any, res: any)=>{
	const {id} = req.params;
	
	const score = await client.score.delete({
	  where: { id: parseInt(id)},
      include: {
        group: true
      }
	});
    res.status(201).json(score);
	
});

router.put("/:id", async (req: any, res: any)=>{
    const {id} = req.params;
    const {dungeonId, playerIds, points } = req.body;
    let score;

    if (!id) res.status(400).json({error: "Missing id"});
    const oldScore = await client.score.findUnique({
        where: { id: parseInt(id) },
        include: {
            group: true
        }
    });

    if (!oldScore) return res.status(400).json({error: "Score not found"});

    const newGroup: any = [];

    if (dungeonId){
        const dungeon = await client.dungeon.findUnique({
            where: { id: parseInt(dungeonId) }
        })
        if (!dungeon) return res.status(400).json({error: "Dungeon not found"});
    }

    const data = {
        dungeon: {connect: {id: dungeonId ? parseInt(dungeonId) : oldScore.dungeonId}},
        points: points ? parseInt(points) : oldScore.points,
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

export default router;

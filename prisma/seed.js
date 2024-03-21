const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function main() {
    // Players : 
    const mitra = await prisma.player.upsert({
        where: {
            name: 'Mitrano'
        },
        update: {},
        create: {
            name: 'Mitrano'
        }
    });

    const bashen = await prisma.player.upsert({
        where: {
            name: 'Bashen'
        },
        update: {},
        create: {
            name: 'Bashen'
        }
    });

    const soskyl = await prisma.player.upsert({
        where: {
            name: 'SoSkyl'
        },
        update: {},
        create: {
            name: 'SoSkyl'
        }
    });
    
    // Dungeons
    const dungeon1 = await prisma.dungeon.upsert({
        where: {
            name: 'Xar\'Saroth'
        },
        update: {},
        create: {
            name: 'Xar\'Saroth'
        }
    });

    const dungeon2 = await prisma.dungeon.upsert({
        where: {
            name: 'Darkest Dungeon'
        },
        update: {},
        create: {
            name: 'Darkest Dungeon'
        }
    });

    // Scores
    const score1 = await prisma.score.upsert({
        where:{
            id: 1
        },
        update: {},
        create: {
            points: 10,
            group: {
                connect: {
                    id: mitra.id
                },
                connect: {
                    id: soskyl.id
                }
            },
            dungeon: {
                connect: {
                    id: dungeon1.id
                }
            }
        }
    });

    const score2 = await prisma.score.upsert({
        where:{
            id: 2
        },
        update: {},
        create: {
            points: 7,
            group: {
                connect: {
                    id: bashen.id
                },
                connect: {
                    id: mitra.id
                }
            },
            dungeon: {
                connect: {
                    id: dungeon2.id
                }
            }
        }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
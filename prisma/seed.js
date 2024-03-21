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

    console.log({mitra, bashen, soskyl});
            
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
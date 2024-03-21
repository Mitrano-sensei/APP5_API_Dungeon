# Running the project
- Clone
- Copy .env.template and rename it to .env
- Run `npm install`
      `npx prisma db pull`
      `npx prisma db migrate dev`
      `npx prisma generate`


# Running through docker image
- Install docker
- Run `docker build -t dungeon_api .`
      `docker run --name dungeon-api -p 3000:3000 -d dungeon_api`
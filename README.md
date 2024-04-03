# Running the project
- Clone
- Copy .env.template and rename it to .env
- Run `npm install`
      `npx prisma db pull`
      `npx prisma db migrate dev`
      `npx prisma generate`
      `npx prisma db seed` (This one is for generating base datas)


# Running through docker image
- Install docker/docker compose
- Run `docker compose up`

# Delete docker images
- Stop docker containers (hard way : `docker container prune --force`)
- List docker images with `docker image ls`
- Get the docker image ID (XXXXX)
- Remove with `docker image rm XXXXX`
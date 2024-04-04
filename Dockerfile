FROM node:21.6.2-alpine3.18

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
COPY prisma ./prisma

RUN chown -R node:node /home/node/app/*

USER node

RUN echo 'DATABASE_URL="file:./dev.db"' >> ./.env

RUN npm install

COPY --chown=node:node . .

RUN npx prisma db pull
RUN npx prisma migrate dev
RUN npx prisma generate
RUN npx prisma db seed

EXPOSE 3000
CMD ["npm", "run", "start"]
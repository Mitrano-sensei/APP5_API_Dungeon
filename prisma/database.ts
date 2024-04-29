import { PrismaClient } from "@prisma/client";
import config from "../config";

const client = new PrismaClient({ datasources: { db: { url: config.database.url } } });

export default client;
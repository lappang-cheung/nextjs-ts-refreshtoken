import * as mongodb from 'mongodb';
import * as process from "node:process";

const url = process.env.MONGODB_URL!
const user = process.env.MONGODB_USER!
const password = process.env.MONGODB_PASSWORD!

export const databaseClient = new mongodb.MongoClient(url, {
  auth: { username:user , password }});

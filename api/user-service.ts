import { v4 as uuidv4 } from 'uuid';
import { UserDocument } from '@/shared'
import { databaseClient} from "./database";
import * as process from "node:process";

function collection() {
  return databaseClient.db(process.env.MONGODB_DATABASE).collection<UserDocument>('users');
}

export async function createUser(name: string, githubId: number): Promise<UserDocument> {
  const user: UserDocument = {
    id: uuidv4(),
    name,
    tokenVersion: 0,
    githubId: githubId.toString(),
  };

  const coll = await collection();
  const result = await coll.insertOne(user);
  if (result.acknowledged) return user
}

export async function getUserByGitHubId(githubId: number): Promise<UserDocument | null> {
  const coll = await collection();
  return coll.findOne({githubId: githubId.toString()});
}

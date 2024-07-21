import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as process from "node:process";
import {getGithubUser} from "./github-adapter";
import {databaseClient} from "./database";
import {createUser, getUserByGitHubId} from "./user-service";
import {buildTokens, setTokens} from "./token-utils";

const app = express();

app.use(cors({credentials: true, origin: process.env.clientUrl}));
app.use(cookieParser());

app.get('/', (req, res) => res.send('api is healthy'))

app.get('/github', async(req, res) => {
  const { code } = req.query;

  const githubUser = await getGithubUser(code as string);
  let user = await getUserByGitHubId(githubUser.id);
  if (!user) {
    user = await createUser(githubUser.name, githubUser.id);
  }

  const { accessToken, refreshToken } = buildTokens(user);
  setTokens(res, accessToken, refreshToken);

  res.redirect(`${process.env.CLIENT_URL}/me`);
})
app.post('/refresh_token', async(req, res) => {})
app.post('/logout', async(req, res) => {})
app.post('/logout-all', async(req, res) => {})

async function main() {
  await databaseClient.connect();
  app.listen(3000);
}

main()

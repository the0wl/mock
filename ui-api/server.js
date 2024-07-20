import express from "express";
import bodyParser from "body-parser";
import RouteFileManager from "../core/routeFileManager.js";
import { build } from "../core/apiGenerator.js";

import { Form } from "./components/form.js";
import { LateralMenu } from "./components/LateralMenu.js";

const app = express();
const routeFileManager = new RouteFileManager(process.env.ROUTES_FILE_PATH);
let apiMockProcess;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const data = req.body;
  const jsonData = routeFileManager.readJsonFile();
  const index = jsonData.findIndex((item) => item.nome === data.nome);
  if (index === -1) { jsonData.push(data); } else { jsonData[index] = data; }
  routeFileManager.updateJsonFile(JSON.stringify(jsonData, null, 4));
  const items = jsonData.map((item, key) => LateralMenu(item, key)).join("");
  if (apiMockProcess) { apiMockProcess.kill('SIGINT'); }
  apiMockProcess = build();
  res.send(items);
});

app.get("/menu-items", (_, res) => {
  const jsonData = routeFileManager.readJsonFile();
  const items = jsonData.map((item, key) => LateralMenu(item, key)).join("");
  if (apiMockProcess) { apiMockProcess.kill('SIGINT'); }
  apiMockProcess = build();
  res.send(items);
});

app.get("/item-details/:key", (req, res) => {
  const { key } = req.params;
  const jsonData = routeFileManager.readJsonFile();
  const route = jsonData[key];
  res.send(Form(route));
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em ${process.env.BASE_URL} na porta ${process.env.PORT}`);
});

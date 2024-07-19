const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const FileManager = require("./utils/fileManager");

const app = express();
const port = 3333;
const fileManager = new FileManager();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const data = req.body;
  const filePath = "data.json";
  let jsonData = [];

  if (!fileManager.exists(filePath)) {
    fileManager.createFile(filePath, "[]");
  } else {
    const fileBuffer = fileManager.readFile(filePath);
    jsonData = JSON.parse(fileBuffer);
  }

  const index = jsonData.findIndex((item) => item.nome === data.nome);

  if (index === -1) {
    jsonData.push(data);
  } else {
    jsonData[index] = data;
  }

  console.log(jsonData);

  fileManager.updateFile(filePath, JSON.stringify(jsonData, null, 4));

  const items = jsonData
    .map((item, key) => {
      return `<li 
        id="${key}"
        hx-get="http://localhost:3333/item-details/${key}"
        hx-target="#form-container" 
        hx-swap="innerHTML">
        ${item.nome}
      </li>`;
    })
    .join("");

  res.send(items);
});

app.get("/menu-items", (_, res) => {
  const filePath = "data.json";
  let jsonData = [];

  if (!fileManager.exists(filePath)) {
    fileManager.createFile(filePath, "[]");
  } else {
    const fileBuffer = fileManager.readFile(filePath);
    jsonData = JSON.parse(fileBuffer);
  }

  const items = jsonData
    .map((item, key) => {
      return `<li 
        id="${key}"
        hx-get="http://localhost:3333/item-details/${key}"
        hx-target="#form-container" 
        hx-swap="innerHTML">
        ${item.nome}
      </li>`;
    })
    .join("");

  res.send(items);
});

app.get("/item-details/:key", (req, res) => {
  const { key } = req.params;
  const filePath = "data.json";
  let jsonData = [];

  if (!fileManager.exists(filePath)) {
    return res.send("Arquivo não encontrado");
  } else {
    const fileBuffer = fileManager.readFile(filePath);
    jsonData = JSON.parse(fileBuffer);
  }

  const item = jsonData[key];

  form = `
    <form
      hx-post="http://localhost:3333/submit-form"
      hx-target="#menu-items"
      hx-swap="innerHTML"
    >
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input value="${item.nome}" type="text" id="nome" name="nome" required readonly />
      </div>
      <div class="form-group">
        <label for="rota">Rota:</label>
        <input value="${item.rota}" type="text" id="rota" name="rota" required />
      </div>
      <div class="form-group">
        <label for="resposta">Resposta:</label>
        <textarea id="resposta" name="resposta" required>${item.resposta}</textarea>
      </div>
      <div class="form-group">
        <label for="codigo-http">Código HTTP:</label>
        <input value="${item["codigo-http"]}" type="text" id="codigo-http" name="codigo-http" required />
      </div>
      <div class="form-group">
        <button id="build-button" type="submit">Build</button>
      </div>
    </form>
  `;

  res.send(form);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

import FileManager from "./fileManager.js";
import RouteFileManager from "./routeFileManager.js";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const apiFileManager = new FileManager("/out/api.js");
const routeFileManager = new RouteFileManager(process.env.ROUTES_FILE_PATH);

function checkFolder() {
  const folderPath = path.join(path.join(process.cwd(), "/out"));

  if (!fs.existsSync(folderPath)) {
    console.log("Creating ./out folder");
    fs.mkdirSync(folderPath);
  }
}

function runApi() {
  const process = spawn("node", ["./out/api.js"], {
    stdio: "inherit", // This allows the process to use the same stdio as the parent process
  });

  return process;
}

function build() {
  checkFolder();
  const routes = routeFileManager.readJsonFile();

  const jsRoutes = routes.map((item) => {
    const { name, route, type, response, code } = item;

    return (
      `// ${name}\n` +
      `app.${type.toLowerCase()}(\"${route}\", (req, res) => {\n` +
      `  res.status(${code}).json(\n` +
      `    ${response}\n` +
      "  )\n});\n\n"
    );
  });

  apiFileManager.writeFile(
    'import express from "express";\n' +
      'import bodyParser from "body-parser";\n\n' +
      'import cors from "cors";\n\n' +
      "const app = express();\n\n" +
      "app.use(cors());\n" +
      "app.use(bodyParser.urlencoded({ extended: true }));\n" +
      "app.use(bodyParser.json());\n\n" +
      jsRoutes.join("") +
      "app.listen(3300, () => {\n" +
      '  console.log("[MOCK] Servidor rodando em http://localhost:3300");\n' +
      "});\n"
  );

  return runApi();
}

export { build };

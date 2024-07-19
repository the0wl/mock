// fileManager.js
const fs = require("fs");
const path = require("path");

class FileManager {
  constructor(baseDir) {
    this.baseDir = baseDir || process.cwd();
  }

  exists(fileName) {
    const filePath = path.join(this.baseDir, fileName);
    return fs.existsSync(filePath);
  }

  createFile(fileName, content) {
    const filePath = path.join(this.baseDir, fileName);
    fs.writeFileSync(filePath, content, "utf8");
    //console.log(`File created: ${filePath}`);
  }

  readFile(fileName) {
    const filePath = path.join(this.baseDir, fileName);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      //console.log(`File read: ${filePath}`);
      return content;
    } else {
      //console.error(`File not found: ${filePath}`);
      return null;
    }
  }

  updateFile(fileName, content) {
    const filePath = path.join(this.baseDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, "utf8");
      //console.log(`File updated: ${filePath}`);
    } else {
      //console.error(`File not found: ${filePath}`);
    }
  }

  deleteFile(fileName) {
    const filePath = path.join(this.baseDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      //console.log(`File deleted: ${filePath}`);
    } else {
      //console.error(`File not found: ${filePath}`);
    }
  }
}

module.exports = FileManager;

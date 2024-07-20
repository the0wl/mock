import fs from "fs";
import path from "path";

class FileManager {
  constructor(filePath) {
    this.filePath = path.join(process.cwd(), filePath)
  }

  /**
   * @description Checa se o arquivo existe.
   * @returns {Boolean} 
   **/
  exists() {
    return fs.existsSync(this.filePath);
  }

  /**
   * @description Realiza a escrita do arquivo.
   * @returns {void} 
   **/
  writeFile(content) {
    fs.writeFileSync(this.filePath, content, "utf8");
  }

  /**
   * @description Verifica se o arquivo existe e realiza a leitura dele.
   * A leitura é feita sincronamente.
   * @returns {string | null} 
   **/
  readFile() {
    if (this.exists()) {
      const content = fs.readFileSync(this.filePath, "utf8");
      return content;
    } else {
      return null;
    }
  }

  /**
   * @description Verifica se o arquivo existe e realiza a deleção dele.
   * A deleção é feita sincronamente.
   * @returns {string | null} 
   **/
  deleteFile() {
    if (this.exists()) {
      fs.unlinkSync(this.filePath);
    }
  }
}

export default FileManager;

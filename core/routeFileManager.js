import FileManager from "./fileManager.js";

class RouteFileManager extends FileManager {
  constructor(filePath) {
    super(filePath);
  }

  /** 
   * @typedef Route
   * @type {Object}
   * @property {string} nome
   * @property {string} rota
   * @property {string} resposta
   * @property {string} codigoHttp 
   **/

  /**
   * @description Lê o arquivo de rotas e retorna um array de objetos.
   *  
   * @returns {Array<Route>}
   */
  readJsonFile() {
    if (!this.exists()) {
      super.writeFile("[]");
      return [];
    } else {
      const buffer = this.readFile();
      return JSON.parse(buffer);
    }
  }

  /**
   * @description Altera o arquivo de rotas.
   * @returns {void}
   */
  updateJsonFile(content) {
    try {
      this.writeFile(content);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description Apaga o arquivo de rotas.
   * @returns {void}
   */
  deleteJsonFile() {
    this.deleteFile();
  }
}

export default RouteFileManager;

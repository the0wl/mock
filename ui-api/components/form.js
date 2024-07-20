export function Form(item) {
  return `
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
          <label for="tipo">Tipo:</label>
          <input value="${item.tipo}" type="text" id="tipo" name="tipo" required />
        </div>
      <div class="form-group">
        <label for="resposta">Resposta:</label>
        <textarea id="resposta" name="resposta" required>${item.resposta}</textarea>
      </div>
      <div class="form-group">
        <label for="codigoHttp">Código HTTP:</label>
        <input value="${item.codigoHttp}" type="text" id="codigoHttp" name="codigoHttp" required />
      </div>
      <div class="form-group">
        <button id="build-button" type="submit">Build</button>
      </div>
    </form>
  `;
}
export function Form(item) {
  return `
    <form
      hx-post="http://localhost:3333/submit-form"
      hx-target="#menu-items"
      hx-swap="innerHTML"
    >
      <div class="form-group">
        <label for="name">Nome:</label>
        <input value="${
          item.name
        }" type="text" id="name" name="name" required readonly />
      </div>
      <div class="form-row">
          <div class="form-group form-control-quarter">
            <label for="type">Tipo:</label>
            <select id="type" name="type" class="form-control">
              <option value="GET" ${
                item.type === "GET" ? "selected" : ""
              }>GET</option>
              <option value="POST" ${
                item.type === "POST" ? "selected" : ""
              }>POST</option>
              <option value="PATCH" ${
                item.type === "PATCH" ? "selected" : ""
              }>PATCH</option>
              <option value="DELETE" ${
                item.type === "DELETE" ? "selected" : ""
              }>DELETE</option>
            </select>
          </div>
          <div class="form-group form-control-quarter">
            <label for="code">Código HTTP:</label>
            <select id="code" name="code" class="form-control">
              <option value="200" ${
                item.code === 200 ? "selected" : ""
              }>200</option>
              <option value="201" ${
                item.code === 201 ? "selected" : ""
              }>201</option>
              <option value="400" ${
                item.code === 400 ? "selected" : ""
              }>400</option>
              <option value="401" ${
                item.code === 401 ? "selected" : ""
              }>401</option>
              <option value="403" ${
                item.code === 403 ? "selected" : ""
              }">403</option>
            </select>
          </div>
          <div class="form-group form-control-half">
            <label for="route">Rota:</label>
            <input value="${
              item.route
            }" type="text" id="route" name="route" required />
          </div>
      </div>
      <div class="form-group">
        <label for="response">Resposta:</label>
        <textarea id="response" name="response" required>${
          item.response
        }</textarea>
        <button class="beautify-btn" type="button" onclick="beautify()">Formatar</button>
      </div>
      <div class="form-group">
        <button id="build-button" type="submit">Build</button>
      </div>
    </form>
  `;
}

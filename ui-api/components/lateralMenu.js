export function LateralMenu(item, key) {
  return `
    <li 
      id="${key}"
      hx-get="http://localhost:3333/item-details/${key}"
      hx-target="#form-container" 
      hx-swap="innerHTML"
      style="display: flex; flex: 1; justify-content: space-between;"
      >
      <span>${item.name}</span>
      <button 
        style="
          padding: 4px 8px 4px 8px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: #fff;
          font-size: 10px;"
        hx-delete="http://localhost:3333/delete-item/${key}" 
        hx-target="#menu-items" 
        hx-swap="innerHTML"
        hx-on="click: event.stopPropagation()">
        X
      </button>
    </li>`;
}

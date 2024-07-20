export function LateralMenu(item, key) {
  return `<li 
        id="${key}"
        hx-get="http://localhost:3333/item-details/${key}"
        hx-target="#form-container" 
        hx-swap="innerHTML">
        ${item.nome}
      </li>`;
}
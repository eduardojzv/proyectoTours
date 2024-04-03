export function clientsQuantityText(data) {
    let text = '';
  
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        text += `${data[key]} ${key}${data[key] > 1 ? 's' : ''}, `;
      }
    }
  
    // Eliminar la coma adicional al final
    text = text.slice(0, -2);
    return text
  }
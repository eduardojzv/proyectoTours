export function truncDecimals(number) {
    const roundedNumber = Math.round(number * 4) / 4; // Redondea al múltiplo de 0.25 más cercano
    return Number(roundedNumber.toFixed(2)); // Limita el resultado a dos decimales
}
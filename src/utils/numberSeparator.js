export function numberSeparator(number) {
    let numberParts = number.toString().split('.');
    numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numberParts.join('.');
}
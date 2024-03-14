export function updateFilters(filters, { key, value }) {
    if (key === "min" || key === "max") {
        if (value !== "") {
            filters[key] = value
        } else {
            delete filters[key]
        }
    } else {
        if (key!=='') {
            // Si la clave no existe en prevFilters, crea un nuevo array con el valor
            filters[key] = value;
        }
        if (filters[key].length === 0) {
            delete filters[key];
        }

    }
    return filters;
};
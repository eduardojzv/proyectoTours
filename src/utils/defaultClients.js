export default function defaultClients({ general: generalPrices, adulto: adultPrices }) {
    const selectedPrices = generalPrices.tarifaBase > 0 || generalPrices.descuento > 0 ? { ...generalPrices, categoria: "general" } : { ...adultPrices, categoria: "adulto" };
    const tariff = selectedPrices.descuento > 0 ? selectedPrices.descuento : selectedPrices.tarifaBase;
    const { descuento, tarifaBase, ...prices } = selectedPrices;
    const finalPrice = { ...prices, tariff };
    const defaultClientValues = {
        quantity: 1,
        tariff: finalPrice.tariff,
        cost:finalPrice.tariff
    };
    const defaultClient = { [finalPrice.categoria]: defaultClientValues };
    return defaultClient
}

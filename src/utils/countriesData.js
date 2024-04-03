export async function fetchCountries() {
    const url = 'https://restcountries.com/v3.1/all';

    try {
        const response = await fetch(url);
        const data = await response.json();
        // Función para obtener el prefijo telefónico de un país
        const getCallingCode = country => {
            if (country.idd && Object.keys(country.idd).length > 0) {
                //console.log(`${country.idd.root}-${country.idd.suffixes[0]}`);
                return (`${country.idd.root}${country.idd.suffixes[0]}`);
            } else {
                return 'No disponible';
            }
        };

        // Procesa la información de los países y obtiene el prefijo telefónico
        const countriesData = data.map(country => ({
            name: country.name.common,
            callingCode: getCallingCode(country)
        }));
        return countriesData
    } catch (error) {
        return 'Hubo un error al obtener los países:' + error
    }
}

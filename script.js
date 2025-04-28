// Consegna
// Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare utilizzare l'url base:
// https://boolean-spec-frontend.vercel.app/freetestapi
// al posto di:
// https://freetestapi.com/api/v1

// Ad esempio:
// https://boolean-spec-frontend.vercel.app/freetestapi/users
// per chiamare l'endpoint /users
// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
// Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

// Funzione asincrona per ottenere i dati del dashboard
const getDashboardData = async (query) => {
    try {
        // Creazione delle promesse per le chiamate API
        const destinationsPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
            .then(res => res.ok ? res.json() : Promise.reject('Errore destinazioni'));
        const weathersPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
            .then(res => res.ok ? res.json() : Promise.reject('Errore meteo'));
        const airportsPromise = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
            .then(res => res.ok ? res.json() : Promise.reject('Errore aeroporti'));

        // Eseguo tutte le promesse in parallelo
        const promises = [destinationsPromise, weathersPromise, airportsPromise];
        const [destinations, weathers, airports] = await Promise.all(promises);

        // Estraggo i dati dal primo elemento di ogni array
        const destination = destinations[0] || {}; // Se l'array è vuoto, uso un oggetto vuoto
        const weather = weathers[0] || {};
        const airport = airports[0] || {};

        // Restituisco un oggetto con i dati aggregati
        return {
            city: destination.name || 'Città sconosciuta',
            country: destination.country || 'Paese sconosciuto',
            temperature: weather.temperature || 'N/A',
            weather: weather.weather_description || 'N/A',
            airport: airport.name || 'Aeroporto sconosciuto'
        };
    } catch (error) {
        // Gestione degli errori
        console.error('Errore durante il recupero dei dati:', error);
        return null; // Restituisco null in caso di errore
    }
};

// Esempio di utilizzo della funzione
getDashboardData('london')
    .then(data => {
        if (data) {
            // Stampo i dati in un formato leggibile
            console.log('Dati del dashboard:', data);
            console.log(
                `${data.city} si trova in ${data.country}.\n` +
                `Oggi ci sono ${data.temperature} gradi e il tempo è ${data.weather}.\n` +
                `L'aeroporto principale è ${data.airport}.\n`
            );
        } else {
            console.log('Impossibile recuperare i dati del dashboard.');
        }
    })
    .catch(error => console.error('Errore non gestito:', error));



    








export async function getBanks() {
    const response = await fetch('https://dev.obtenmas.com/catom/api/challenge/banks')
    const json = await response.json()
    return json
}

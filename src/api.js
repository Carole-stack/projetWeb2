
const BASE_URL = 'http://localhost:3000'

function getEndpointURL(endpoint) {
  return `${BASE_URL}${endpoint}`
}

export async function getTaches() {
  // 👉 Faire une requête sur l'URL http://localhost:3000/posts grâce à fetch
  let url = getEndpointURL('/taches')
  let response = await fetch(url)

  // 👉 Parser la réponse en JSON
  let data = await response.json()
  
  // 👉 Renvoyer les données
  return data
}
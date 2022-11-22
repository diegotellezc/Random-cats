const URL = "https://api.thedogapi.com/v1/images/search"

// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const IMG = document.querySelector("img")
//         IMG.src = data[0].url
//     })

async function fetchDog () {
    const res = await fetch(URL)
    const data = await res.json()
    const img = document.querySelector("img")
    img.src = data[0].url
}
fetchDog()

const button = document.querySelector("button")
button.onclick = fetchDog
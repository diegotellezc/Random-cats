const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3"

const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?api_key=live_VLXr0uQy0GF1IymMvzy9siTxrOBjB0qptKbgrjai975xqDEe1EhU2alZKq0t8DuC"

const spanError = document.getElementById("error")


async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json();
    console.log("Random");
    console.log(data);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " + res.message
    } else {
        const img1 = document.getElementById("img1")
        const img2 = document.getElementById("img2")
        const img3 = document.getElementById("img3")
        const btnRandom1 = document.getElementById("btnRandom1")
        const btnRandom2 = document.getElementById("btnRandom2")
        const btnRandom3 = document.getElementById("btnRandom3")

        btnRandom1.onclick= () => saveFavouriteCats(data[0].id)
        btnRandom2.onclick= () => saveFavouriteCats(data[1].id)
        btnRandom3.onclick= () => saveFavouriteCats(data[2].id)
    
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
    }
}

async function loadFavouritesCats() {
    const res = await fetch(API_URL_FAVOURITES)
    const data = await res.json();
    console.log("Favourites");
    console.log(data);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " + res.message
    } else {
        data.forEach(cat => {
            const sectionFavorites = document.getElementById("favoriteCats")
            const article = document.createElement("article")
            const img = document.createElement("img")
            const btn = document.createElement("button")
            const btnText = document.createTextNode("Remove to favorites")

            btn.appendChild(btnText)
            article.append(img, btn)
            img.src = cat.image.url
            img.width = 350
            sectionFavorites.appendChild(article)
        });
    }
}

async function saveFavouriteCats(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await res.json();

    console.log("Save");
    console.log(res);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message
    }
}


loadRandomCats()
loadFavouritesCats()

const reloadButton = document.getElementById("reloadButton")
reloadButton.onclick = loadRandomCats
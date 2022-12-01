const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3"
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?api_key=live_VLXr0uQy0GF1IymMvzy9siTxrOBjB0qptKbgrjai975xqDEe1EhU2alZKq0t8DuC"
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_VLXr0uQy0GF1IymMvzy9siTxrOBjB0qptKbgrjai975xqDEe1EhU2alZKq0t8DuC`
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload?api_key=live_VLXr0uQy0GF1IymMvzy9siTxrOBjB0qptKbgrjai975xqDEe1EhU2alZKq0t8DuC"

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
        const sectionFavorites = document.getElementById("favoriteCats")
        sectionFavorites.innerHTML = "";

        data.forEach(cat => {
            const article = document.createElement("article")
            const img = document.createElement("img")
            const btn = document.createElement("button")
            const btnText = document.createTextNode("Remove to favorites")

            btn.appendChild(btnText)
            article.append(img, btn)
            img.src = cat.image.url
            img.width = 350
            sectionFavorites.appendChild(article)
            btn.onclick = () => deleteFavouriteCats(cat.id)
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
    } else {
        console.log("A cat was save in favourites");
        loadFavouritesCats()
        const IMG = document.querySelector('#imagePreview');
        IMG.src = ""; 
    }
}

async function deleteFavouriteCats(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: "DELETE",
    })
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + " " + data.message
    } else {
        console.log("A cat was removed from favorites");
        loadFavouritesCats()
    }
}

async function uploadCatPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form)

    console.log(formData.get("file"))

    const res = await fetch(API_URL_UPLOAD, {
        method: "POST",
        body: formData
    })
    const data = await res.json();
    console.log("The photo was uploaded");
    saveFavouriteCats(data.id)

}

function previewImage () {
    const IMG = document.querySelector('#imagePreview');
    const reader = new FileReader();
    const filePreview = document.querySelector('#file').files[0];
    reader.addEventListener('load', () => {
    IMG.src = reader.result; }, false);
    if(filePreview) {
        reader.readAsDataURL(filePreview)
    }
}

loadRandomCats()
loadFavouritesCats()

const reloadButton = document.getElementById("reloadButton")
reloadButton.onclick = loadRandomCats
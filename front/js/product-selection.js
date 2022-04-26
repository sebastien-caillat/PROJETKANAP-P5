let params = new URL (document.location).searchParams;
let productId = params.get("id");
console.log(productId);

let product = "";

getProductChoice();

function getProductChoice() {

    fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })

    .then(async function(result) {
        product = await result;
        console.log(product);
        if (product) {
            createProductChoice(product);
        }
    })

    .catch(err => console.log("Unable to fetch product id"));
}

function createProductChoice(product) {

    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    let productTitle = document.getElementById("title");
    productTitle.textContent = product.name;

    let productPrice = document.getElementById("price");
    productPrice.textContent = product.price;

    let productDescription = document.getElementById("description");
    productDescription.textContent = product.description;

}

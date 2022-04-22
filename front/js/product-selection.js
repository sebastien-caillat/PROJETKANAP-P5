let createUrl = new URL (document.location).searchParams;
let productId = createUrl.get("id");
let product = "";
 
console.log(productId);

const getProductId = () => {
    fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(result) {
        product = result;
        console.log(product);
    })
    .catch(err => console.log("Unable to fetch product id"))
}

getProductId();

const getProductChoice = (product) => {

    let productImg = document.createElement("img");
    document.getElementsByClassName(item__img).appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    let productTitle = document.getElementById("title");
    productTitle.textContent = product.name;

    let productPrice = document.getElementById("price");
    productPrice.textContent = product.price;

    let productDescription = document.getElementById("description");
    productDescription.textContent = product.description;
}
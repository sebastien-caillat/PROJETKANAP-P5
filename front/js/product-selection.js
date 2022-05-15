let params = new URL (document.location).searchParams;
let productId = params.get("id");
console.log(productId);

let product = "";

const colorChoice = document.getElementById("colors");
const quantityChoice = document.getElementById("quantity");

const getProductChoice = () => {

    fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })

    .then(function(result) {
        product =  result;
        console.log(product);
        if (product) {
            createProductChoice(product);
        }
    })

    .catch(err => console.log("Unable to fetch product id"));
}

getProductChoice();

const createProductChoice = (product) => {

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

    for (let colors of product.colors) {
        console.log(colors);
        let productColors = document.createElement("option");
        document.getElementById("colors").appendChild(productColors);
        productColors.value = colors;
        productColors.textContent = colors;
    }

}

const addProductToCart = () => {

    let addToCartButton = document.getElementById("addToCart");
    console.log(addToCartButton);

    addToCartButton.addEventListener("click", (event) => {

        if(quantityChoice.value > 0 && quantityChoice.value <= 100) {

            const quantity = quantityChoice.value;
            const color = colorChoice.value;

            const productChoice = {
                productId: productId,
                productQuantity: quantity,
                productColor: color,
            }

            console.log(productChoice);

            let savingProductToLocalStorage = JSON.parse(localStorage.getItem("product"));

                if(savingProductToLocalStorage) {
                    const productAlreadyInLocalStorage = savingProductToLocalStorage.find(product => product.productId === productChoice.productId && product.productColor === productChoice.productColor);
                    if(productAlreadyInLocalStorage) {        
                        alert("Ce produit est déjà présent dans le panier - Modification de la quantité effectuée");   
                        let addNewQuantity = parseInt(productAlreadyInLocalStorage.productQuantity) + parseInt(productChoice.productQuantity);
                        productAlreadyInLocalStorage.productQuantity = addNewQuantity;
                        localStorage.setItem("product", JSON.stringify(savingProductToLocalStorage));
                    } else {
                        alert("Il y a d'autres produits dans le panier - Ajout de la nouvelle selection");
                        savingProductToLocalStorage.push(productChoice);
                        localStorage.setItem("product", JSON.stringify(savingProductToLocalStorage));
                    }                   
                } else {
                    savingProductToLocalStorage = [];
                    savingProductToLocalStorage.push(productChoice);
                    localStorage.setItem("product", JSON.stringify(savingProductToLocalStorage));
                }

            console.log (savingProductToLocalStorage);
        }
    })
}

addProductToCart();
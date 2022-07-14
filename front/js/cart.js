let productInCart = JSON.parse(localStorage.getItem("product"));

// Création de cartes produits en fonction du contenu du localStorage 

const getProductCard = () => {
    for(let product in productInCart) {
        let cartItem = document.createElement("article");
            document.getElementById("cart__items").appendChild(cartItem);
            cartItem.classList.add("cart__item");
            cartItem.setAttribute("data-id", productInCart[product].productId);
            cartItem.setAttribute("data-color", productInCart[product].productColor);

        let cartItemImg = document.createElement("div");
            cartItem.appendChild(cartItemImg);
            cartItemImg.classList.add("cart__item__img");

            let itemImg = document.createElement("img");
            cartItemImg.appendChild(itemImg);
            itemImg.src = productInCart[product].productImg;
            itemImg.alt = productInCart[product].productImgAlt;

        let cartItemContent = document.createElement("div");
            cartItem.appendChild(cartItemContent);
            cartItemContent.classList.add("cart__item__content");

            let cartItemContentDescription = document.createElement("div");
            cartItemContent.appendChild(cartItemContentDescription);
            cartItemContentDescription.classList.add("cart__item__content__description");

                let itemName = document.createElement("h2");
                cartItemContentDescription.appendChild(itemName);
                itemName.textContent = productInCart[product].productName;
            
                let itemColor = document.createElement("p");
                cartItemContentDescription.appendChild(itemColor);
                itemColor.textContent = productInCart[product].productColor;

                let itemPrice = document.createElement("p");
                cartItemContentDescription.appendChild(itemPrice);
                itemPrice.textContent = `${productInCart[product].productPrice} €`;

            let cartItemContentSettings = document.createElement("div");
            cartItemContent.appendChild(cartItemContentSettings);
            cartItemContentSettings.classList.add("cart__item__content__settings");

                let cartItemContentSettingsQuantity = document.createElement("div");
                cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
                cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
                
                    let itemQuantity = document.createElement("p");
                    cartItemContentSettingsQuantity.appendChild(itemQuantity);
                    itemQuantity.textContent = "Qté :";

                    let itemQuantityNumber = document.createElement("input");
                    cartItemContentSettingsQuantity.appendChild(itemQuantityNumber);
                    itemQuantityNumber.classList.add("itemQuantity");
                    itemQuantityNumber.type = "number";
                    itemQuantityNumber.name = "itemQuantity";
                    itemQuantityNumber.min = "1";
                    itemQuantityNumber.max = "100";
                    itemQuantityNumber.value = productInCart[product].productQuantity;

                let cartItemContentSettingsDelete = document.createElement("div");
                cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
                cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
                    
                    let deleteItem = document.createElement("p");
                    cartItemContentSettingsDelete.appendChild(deleteItem);
                    deleteItem.classList.add("deleteItem");
                    deleteItem.textContent = "Supprimer";
    
    }
}

getProductCard();

// Fonction permettant de modifier la quantité d'un produit

const modifyQuantity = () => {

    let modifyButton = document.querySelectorAll(".itemQuantity");

        for(let i = 0; i < modifyButton.length; i++) {

            modifyButton[i].addEventListener("change", (event) => {

                event.preventDefault();

                let baseQuantity = productInCart[i].productQuantity;
                let newQuantity = modifyButton[i].valueAsNumber;

                const productToModify = productInCart.filter(element => element.newQuantity == baseQuantity);

                productToModify.productQuantity = newQuantity;
                productInCart[i].productQuantity = productToModify.productQuantity;

                localStorage.setItem("product", JSON.stringify(productInCart));
                location.reload();

            })
        }

}

modifyQuantity();


// Fonction permettant de supprimer un produit

const deleteProduct = () => {

    let deleteButton = document.querySelectorAll(".cart__item__content__settings__delete");

    for(let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener("click", (event) => {
            event.preventDefault();
            let idSuppression = productInCart[i].productId;
            let colorIdSuppression = productInCart[i].productColor;
            productInCart = productInCart.filter(element => element.productId !== idSuppression || element.productColor !== colorIdSuppression);
            localStorage.setItem("product", JSON.stringify(productInCart));
            alert("Produit supprimé !");
            location.reload();
        })
    }

}

deleteProduct();


// Calcul du prix total du panier

const getTotalCount = () => {

    let productQuantity = document.getElementsByClassName("itemQuantity");
    let quantityOfProducts = productQuantity.length;

    totalProductQuantity = 0;

// Calcul du nombre total de produit dans le panier

    for (i = 0; i < quantityOfProducts; ++i) {
        totalProductQuantity += productQuantity[i].valueAsNumber;
    }

    let totalProductQuantityHtml = document.getElementById('totalQuantity');
    totalProductQuantityHtml.textContent = totalProductQuantity;
    console.log(totalProductQuantity);

    totalPrice = 0;

// Calcul du prix total du panier

    for (let i = 0; i < productQuantity.length; ++i) {
        totalPrice += (productQuantity[i].valueAsNumber * productInCart[i].productPrice);
    }

    let totalProductPrice = document.getElementById('totalPrice');
    totalProductPrice.textContent = totalPrice;
    console.log(totalProductPrice);
}

getTotalCount();


// Validation des données du formulaire de commande

const getFormData = () => {

    let orderForm = document.querySelector(".cart__order__form");
    let basicInputRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); // Modifier la RegExp pour accepter les caractères spéciaux (accents)

        orderForm.firstName.addEventListener("change", function() {
            validFirstName(this);
        });

        orderForm.lastName.addEventListener("change", function() {
            validLastName(this);
        });

        orderForm.address.addEventListener("change", function() {
            validAddress(this);
        });

        orderForm.city.addEventListener("change", function() {
            validCity(this);
        });

        orderForm.email.addEventListener("change", function() {
            validEmail(this);
        });

// Fonction de validation du prénom

    const validFirstName = function(inputFirstName) {

        let testFirstName = basicInputRegExp.test(inputFirstName.value);

        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

        console.log(testFirstName);

        if(testFirstName == false) {
            firstNameErrorMsg.textContent = "Enter your first name here !";
        } else {
            firstNameErrorMsg.textContent = "";
        }
    }

// Fonction de validation du nom de famille

    const validLastName = function(inputLastName) {
        let testLastName = basicInputRegExp.test(inputLastName.value);

        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

        console.log(testLastName);

        if(testLastName == false) {
            lastNameErrorMsg.textContent = "Enter your last name here!";
        } else {
            lastNameErrorMsg.textContent = "";
        }
    }

// Fonction de validation de l'adresse

    const validAddress = function(inputAddress) {
        let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
        let testAddress = addressRegExp.test(inputAddress.value);

        let addressErrorMsg = document.getElementById("addressErrorMsg");
        
        console.log(testAddress);
        
        if(testAddress == false) {
            addressErrorMsg.textContent = "Enter your address here !";
        } else {
            addressErrorMsg.textContent = "";
        }
    }

// Fonction de validation de la ville

    const validCity = function(inputCity) {
        let testCity = basicInputRegExp.test(inputCity.value);

        let cityErrorMsg = document.getElementById("cityErrorMsg");

        console.log(testCity);

        if(testCity == false) {
            cityErrorMsg.textContent = "Enter your city name here!";
        } else {
            cityErrorMsg.textContent = "";
        }
    }

// Fonction de validation de l'email

    const validEmail = function(inputEmail) {
        let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
        let testEmail = emailRegExp.test(inputEmail.value);

        let emailErrorMsg = document.getElementById("emailErrorMsg");

        console.log(testEmail);

        if(testEmail == false) {
            emailErrorMsg.textContent = "Enter a valid email address here !";
        } else {
            emailErrorMsg.textContent = "";
            return true;
        }
    }

}

getFormData();


// Confirmation de la commande

const sendOrder = () => {

    let submitOrderButton = document.getElementById("order");

    submitOrderButton.addEventListener("click", (event) => {

        event.preventDefault();

        // if(ALL INPUT = TRUE) {

        const contact = {
            firstName : document.getElementById("firstName").value,
            lastName : document.getElementById("lastName").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
            email : document.getElementById("email").value
        }

        localStorage.setItem("contact", JSON.stringify(contact));

        let productsId = [];

        for(let i = 0; i < productInCart.length; i++) {
            productsId.push(productInCart[i].productId);
        }

        const order = {
            contact,
            productsId
        }

        console.log("order");
        console.log(order);

        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        }

        console.log("options");
        console.log(options);

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log("data");
                console.log(data);
                // localStorage.clear();
                // localStorage.setItem("orderId", data.orderId);

                // document.location.href = "confirmation.html";

                // Utiliser un searchParams plutôt que cette méthode ?
            })
            .catch((err) => {
                alert("Impossible d'accéder à la commande désirée");
            })

//      } else {

//         alert("Une ou plusieurs données renseignées sont incorrectes. Veuillez renseigner des données valides");

//      }
    })
}

sendOrder();
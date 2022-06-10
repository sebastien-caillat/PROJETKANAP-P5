let productInCart = JSON.parse(localStorage.getItem("product"));

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

const getTotalCount = () => {

    let productQuantity = document.getElementsByClassName("itemQuantity");
    let quantityOfProducts = productQuantity.length;

    totalProductQuantity = 0;

    for (i = 0; i < quantityOfProducts; ++i) {
        totalProductQuantity += productQuantity[i].valueAsNumber;
    }

    let totalProductQuantityHtml = document.getElementById('totalQuantity');
    totalProductQuantityHtml.textContent = totalProductQuantity;
    console.log(totalProductQuantity);

    totalPrice = 0;

    for (let i = 0; i < productQuantity.length; ++i) {
        totalPrice += (productQuantity[i].valueAsNumber * productInCart[i].productPrice);
    }

    let totalProductPrice = document.getElementById('totalPrice');
    totalProductPrice.textContent = totalPrice;
    console.log(totalProductPrice);
}

getTotalCount();


let orderForm = document.querySelector(".cart__order__form");
let basicInputRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); // Modifier la RegExp pour accepter les caractères spéciaux (accents)

    orderForm.firstName.addEventListener("change", function() {
        validFirstName(this);
    })

    orderForm.lastName.addEventListener("change", function() {
        validLastName(this);
    })

    orderForm.address.addEventListener("change", function() {
        validAddress(this);
    });

    orderForm.city.addEventListener("change", function() {
        validCity(this);
    })

    orderForm.email.addEventListener("change", function() {
        validEmail(this);
    });

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

const validEmail = function(inputEmail) {
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
    let testEmail = emailRegExp.test(inputEmail.value);

    let emailErrorMsg = document.getElementById("emailErrorMsg");

    console.log(testEmail);

    if(testEmail == false) {
        emailErrorMsg.textContent = "Enter a valid email address here !";
    } else {
        emailErrorMsg.textContent = "";
    }
}

const validateForm = () => {

    let submitOrderButton = document.getElementById("order");

    submitOrderButton.addEventListener("click", (event) => {

        preventDefault();

        if(validFirstName() == true && validLastName() == true && validAddress() == true && validCity() == true && validEmail() == true) {

            const formData = {
                firstName: orderForm.firstName.value,
                lastName: orderForm.lastName.value,
                address: orderForm.address.value,
                city: orderForm.city.value,
                email: orderForm.email.value,
            } 

            console.log(formData);

            let savingFormDataToLocalStorage = JSON.parse(localStorage.getItem("orderData"));
            savingFormDataToLocalStorage = [];
            savingFormDataToLocalStorage.push(formData);
            localStorage.setItem("orderData", JSON.stringify(savingFormDataToLocalStorage));

            console.log(savingFormDataToLocalStorage);

        } else {

            alert("Une ou plusieurs données renseignées sont incorrectes. Veuillez renseigner des données valides");

        }
    })
}

validateForm();
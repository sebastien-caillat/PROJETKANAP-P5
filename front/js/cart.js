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

const checkForm = () => {
    let checkFirstNameInput = document.getElementById("firstName");
    if(checkFirstNameInput.value != "") {
        return true;
    } else {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.textContent = "Enter your first name here !";
    }

    let checkLastNameInput = document.getElementById("lastName");
    if(checkLastNameInput.value != "") {
        return true;
    } else {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.textContent = "Enter your last name here !";
    }

    let checkAddressInput = document.getElementById("address");
    if(checkAddressInput.value != "") {
        // ajouter autre condition pour vérifier qu'une adresse est bien renseignée dans le champ
        return true;
    } else {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.textContent = "Enter your address here !";
    }

    let checkCityInput = document.getElementById("city");
    if(checkCityInput.value != "") {
        // ajouter une autre condition ?
        return true;
    } else {        
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.textContent = "Enter your city name here !";
    }

    let checkEmailInput = document.getElementById("email");
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(checkEmailInput.value)) {
        return true;
    } else {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.textContent = "Enter a valid email address here !";
    }
}

const validateForm = () => {

    let submitOrderButton = document.getElementById("order");

    submitOrderButton.addEventListener("onclick", (event) => {
        preventDefault();
        checkForm();
    })
}
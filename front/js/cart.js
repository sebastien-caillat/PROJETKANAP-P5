let productInCart = JSON.parse(localStorage.getItem("product"));

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
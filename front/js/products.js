
fetch("http://localhost:3000/api/products")
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(getProducts) { 
        const products = getProducts;
        console.log(products);
        for (let product in products) {

            let productLink = document.createElement("a");
                document.getElementById("items").appendChild(productLink);
                productLink.href = `product.html?id=${products[product]._id}`;

            let productCard = document.createElement("article");
                productLink.appendChild(productCard);

            let productImg = document.createElement("img");    
                productCard.appendChild(productImg);
                productImg.src = products[product].imageUrl;
                productImg.alt = products[product].altTxt;

            let productTitle = document.createElement("h3");
                productCard.appendChild(productTitle);
                productTitle.classList.add("productName");
                productTitle.textContent = products[product].name;

            let productDescription = document.createElement("p");
                productCard.appendChild(productDescription);
                productDescription.classList.add("productDescription");
                productDescription.textContent = products[product].description;     

        }

    })
    .catch(err => console.log("Error - Unable to fetch products"))


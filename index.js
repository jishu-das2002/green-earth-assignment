const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

const displayCategories = (treeCategories) => {
    console.log(treeCategories);

    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    const ul = document.createElement("ul");

    for (let treeCategorie of treeCategories) {
        const li = document.createElement("li");
        li.innerHTML = `<a class="inter-font" href="#">${treeCategorie.category_name}</a>`;
        ul.appendChild(li);
    }

    categoriesContainer.appendChild(ul); 
}

loadCategories();




const loadPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => displayPlants(data.plants));
}

const displayPlants = (plants) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    plants.forEach(plant => {
        const div = document.createElement("div");
        div.classList.add("plant-card");

        div.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;"/>
            <h3 class="inter-font" style="font-size: 14px;">${plant.name}</h3>
            <p style="font-size:14px; color:#555; margin:5px 0;" class="inter-font; width: 311.33px; height: 32px;">${plant.description.slice(0, 100)}...</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-size: 14px; font-weight: 400; color: rgba(21, 128, 61, 1);  border-radius: 400px; background: rgba(220, 252, 231, 1); width: 140px; height: 28px;" class="inter-font">${plant.category}</span>
                <span style="font-weight:600;" class="inter-font">৳${plant.price}</span>
            </div>
            <button class="add-cart-btn inter-font" style="width:100%; padding:10px; background:green; color:white; border:none; border-radius:999px; cursor:pointer;">Add to Cart</button>
        `;

        div.querySelector(".add-cart-btn").addEventListener("click", () => {
            addToCart(plant.category, plant.price);
        });

        cardContainer.appendChild(div);
    });
}

loadPlants();




const cart = [];
let total = 0;


function addToCart(category, price) {
    cart.push({ category, price });
    total += price;
    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.style.marginBottom = "5px";

        li.innerHTML = `
            <div style="display:flex; justify-content: space-between; align-items:center; width:100%;">
            <span>${item.category} -<br> ৳${item.price}</span>
            <button style="  color: black; border:none; border-radius:4px; cursor:pointer;">✖</button>
            </div>
            `;

        li.querySelector("button").addEventListener("click", () => {
        total -= item.price;
        cart.splice(index, 1);
        updateCart();
        });


        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: ৳${total}`;
}


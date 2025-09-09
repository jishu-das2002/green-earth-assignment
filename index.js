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
        li.innerHTML = `<a href="#">${treeCategorie.category_name}</a>`;
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
            <h3>${plant.name}</h3>
            <p style="font-size:14px; color:#555; margin:5px 0;">${plant.description.slice(0, 100)}...</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-weight:600;">${plant.category}</span>
                <span style="font-weight:600;">৳${plant.price}</span>
            </div>
            <button class="add-cart-btn" style="width:100%; padding:10px; background:green; color:white; border:none; border-radius:5px; cursor:pointer;">Add to Cart</button>
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
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.marginBottom = "5px";

        li.innerHTML = `
            <span>${item.category} - ৳${item.price}</span>
            <button style="background:red; color:white; border:none; border-radius:4px; cursor:pointer;">Remove</button>
        `;

        // Remove button
        li.querySelector("button").addEventListener("click", () => {
            total -= item.price;
            cart.splice(index, 1);
            updateCart();
        });

        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: ৳${total}`;
}


// categoris sectiona ar api

const loadCategory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data); // এখানে API থেকে যা আসবে তা console এ দেখাবে
    })
    .catch(err => console.error("Error:", err));
}

// ফাংশন কল করার সময় একটা id দিতে হবে
loadCategory(1);

let dessertObjectData = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
    id: 1,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
    id: 2,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
    id: 3,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
    id: 4,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
    id: 5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
    id: 6,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
    id: 7,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
    id: 8,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
    id: 9,
  },
];

function loadData() {
  let dessertContainer = document.getElementById("dessert-container");

  dessertObjectData.forEach((dessertObject) => {
    let newDessertBoxItem = document.createElement("div");
    newDessertBoxItem.classList.add("dessert-item-box");

    let newDessertImage = document.createElement("img");
    newDessertImage.setAttribute("src", dessertObject.image.desktop);

    let dessertTitle = document.createElement("h4");
    let dessertTitleTextnode = document.createTextNode(dessertObject.name);
    dessertTitle.appendChild(dessertTitleTextnode);

    let dessertCategory = document.createElement("p");
    let dessertCategoryTextNode = document.createTextNode(
      dessertObject.category
    );
    dessertCategory.appendChild(dessertCategoryTextNode);

    let dessertPrice = document.createElement("p");
    dessertPrice.classList.add("priceColor");
    let dessertPriceTextNode = document.createTextNode(
      "$" + dessertObject.price.toFixed(2)
    );
    dessertPrice.appendChild(dessertPriceTextNode);

    let newButton = document.createElement("button");
    let quantity = 0;

    newButton.addEventListener("click", async () => {
      //Starts here

      //This function helps to store your datas in the cart(located in the localStorage);

      //Start of the function to  store data to the localStorage

      async function storeDataInLocalStorage() {
        //This line gets the data from the cart and append the incomming data to it before storing in the DB
        let myCart = (await JSON.parse(localStorage.getItem("cart"))) || [];

        const dataExist = await myCart.find(
          (data) => data.id === dessertObject.id
        );

        //verifying if the data exist in the cart be fore adding a new one
        if (!dataExist) {
          myCart.push(dessertObject);
          localStorage.setItem("cart", JSON.stringify(myCart));
          console.log("data was sucessfully added to cart");

          const info = {
            type: true,
            message: "data was sucessfully added to cart",
          };
          return info;
        }

        //creating my return type
        const info = {
          type: false,
          message: "data exist in the cart",
        };

        return info;
      }

      //declaring my function and storing its return in this variable
      const addingToThisCart = await storeDataInLocalStorage();

      //making sure the code does not proceed if the return from the above function is false
      if (addingToThisCart.type === false) {
        console.log(addingToThisCart.message);
        return;
      }

      let secondNewButton = document.createElement("button");
      secondNewButton.classList.add("secondButton");

      let index = document.createElement("p");

      let indexTextNode = document.createTextNode(quantity);
      index.appendChild(indexTextNode);

      let incrementIcon = document.createElement("img");
      incrementIcon.classList.add("increAndDecre-btn");

      incrementIcon.addEventListener("click", async () => {
        quantity++;
        let count = (index.textContent = quantity);

        //fetching all the cart data
        let dataInCart = (await JSON.parse(localStorage.getItem("cart"))) || [];

        //finding among the fetch cart items the item we want to increment
        let dataExistInCart = await dataInCart.find(
          (item) => item.id === dessertObject.id
        );

        //verifying that the item we want to increment the quantity exist in the cart
        if (dataExistInCart) {
          //if this data exist then we gets its index
          let itemIndex = dataInCart.findIndex(
            (item) => item.id === dessertObject.id
          );

          //you can see the index in the console
          console.log("this is the index", itemIndex);

          // updating the old item in the cart with the new item
          dataInCart[itemIndex].quantity =
            (dataInCart[itemIndex].quantity || 0) + 1;

          //finally updating the whole cart
          await localStorage.setItem("cart", JSON.stringify(dataInCart));
          console.log(await JSON.parse(localStorage.getItem("cart")));
          return;
        }

        // Ends here

        // cart 1st step
        let addTOcart = document.getElementById("add-to-cart");
        let totalCartItem = document.getElementById("cart-item-total");
        totalCartItem.textContent = `your cart   ( ${count} ) `;

        let cartItem = document.createElement("p");
        let cartItemTextNode = document.createTextNode(dessertObject.name);
        cartItem.appendChild(cartItemTextNode);

        let currentItem = document.createElement("p");
        let currentItemTextNode = document.createTextNode(count);
        currentItem.appendChild(currentItemTextNode);
        addTOcart.append(
          cartItem,
          currentItem,
          dessertObject.price * count,
          "hgh"
        );
      });

      //end of the function to store data to the localStorage

      incrementIcon.setAttribute(
        "src",
        "assets/images/icon-increment-quantity.svg"
      );

      let decrementIcon = document.createElement("img");
      decrementIcon.classList.add("increAndDecre-btn");
      decrementIcon.addEventListener("click", () => {
        if (quantity > 0) {
          quantity--;
          index.textContent = quantity;
        }
      });
      decrementIcon.setAttribute(
        "src",
        "assets/images/icon-decrement-quantity.svg"
      );
      secondNewButton.append(decrementIcon, index, incrementIcon);
      newButton.replaceWith(secondNewButton);
    });
    let buttonImage = document.createElement("img");
    buttonImage.setAttribute("src", "assets/images/icon-add-to-cart.svg");
    let addCartText = document.createElement("p");
    let addCartTextNode = document.createTextNode("Add to cart");
    addCartText.appendChild(addCartTextNode);
    newButton.append(buttonImage, addCartText);
    newDessertBoxItem.append(
      newDessertImage,
      dessertCategory,
      dessertTitle,
      dessertPrice,
      newButton
    );
    dessertContainer.appendChild(newDessertBoxItem);
  });
}
loadData();

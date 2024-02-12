//* ===================================================
//*                 Checkout Page Solution
//*  map filter, dest,spread ===================================================

//! Variables that are needed in table
const shippingFee = 15.0;
const taxRate = 0.18;

let chart = [
  {
    name: "Vintage Backpack",
    price: 34.99,
    piece: 1,
    img: "./assets/photo1.jpg",
  },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./assets/photo2.jpg" },
  {
    name: "Antique Clock",
    price: 69.99,
    piece: 1,
    img: "./assets/photo3.jpg",
  },
];

//!!!!!!!!!!BUBLİNG!!!!!!!!!
/*
let flag = false;

let h1 = document.querySelector("h1");

h1.onclick = (e) => {
  flag = !flag;
  flag
    ? (h1.textContent = "E-Commerce Website")
    : (h1.textContent = "Checkout Page");

  //!çalış ve sonra parent ını etkileme
  e.stopPropagation();
};

let header = document.querySelector("header");

header.onclick = () => {
  flag = !flag;
  flag ? (h1.textContent = "stop") : (h1.textContent = "propagation");
};
*/

//! Display on screen
showScreen();

function showScreen() {
  chart.forEach(({ name, price, piece, img }) => {
    //DESTRUCTURING
    // const { name, price, piece, img } = product;

    document.querySelector(
      "#product-rows"
    ).innerHTML += ` <div class="card mb-3" style="max-width: 540px;">

        <div class="row g-0 align-items-center p-3">
      
          <div class="col-md-5">
            <img src=${img} class=" w-100 rounded-start" alt="...">
          </div>
      
          <div class="col-md-7 ">
      
            <div class="card-body">
            
                <h5 class="card-title">${name}</h5>
              
                   <div class="product-price">
                          <p class="text-warning h2">$
                            <span class="discounted-price">${(
                              price * 0.7
                            ).toFixed(2)}</span>
                            <span class="h5 text-dark text-decoration-line-through">${price}</span>
                          </p>
                        </div>
                        
                        <div
                          class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                        >
                          <div class="piece-controller">
                            <button class="btn btn-secondary btn-sm minus">
                              <i class="fas fa-minus"></i>
                            </button>
                            <p class="d-inline mx-4" id="product-piece">${piece}</p>
                            <button class="btn btn-secondary btn-sm plus">
                              <i class="fas fa-plus"></i>
                            </button>
                          </div>
      
                        </div>
      
                        <div class="product-removal mt-4">
                          <button class="btn btn-danger btn-sm w-100 remove-product">
                            <i class="fa-solid fa-trash-can me-2"></i>Remove
                          </button>
                        </div>
      
                        <div class="mt-2">
                          Product Total: <span class="product-total">${(
                            price *
                            0.7 *
                            piece
                          ).toFixed(2)}</span>
                        </div>
            </div>
          </div>
        </div>
      </div>`;
  });
}

//^ Call functions
updateCardTotal();
removeButton();
pieceControl();

//^ update card-table
function updateCardTotal() {
  // calculate Subtotal
  const productTotals = document.querySelectorAll(".product-total");

  /* 
   querySelectorAll(), return a static NodeList
   https://softauthor.com/javascript-htmlcollection-vs-nodelist/
   Not an Array!
   In NodeList Array methods can be used except reduce(), push(), pop(), join()
   For using reduce method first we need to convert NodeList to an Array (with using Array.from())
  */

  const subTotal = Array.from(productTotals).reduce(
    (acc, product) => acc + Number(product.textContent),
    0
  );
  document.querySelector(".subtotal").textContent = subTotal.toFixed(2);

  // calculate Tax
  let tax = Number((subTotal * taxRate).toFixed(2));
  document.querySelector(".tax").textContent = tax;

  // calculate Shipping Fee
  document.querySelector(".shipping").textContent = subTotal ? shippingFee : 0;

  // calculate Total
  document.querySelector(".total").textContent =
    subTotal > 0 ? (subTotal + tax + shippingFee).toFixed(2) : 0;
}

//^ remove product
function removeButton() {
  document.querySelectorAll(".remove-product").forEach((btn) => {
    btn.onclick = () => {
      if (confirm("Product will be deleted. Are you sure?")) {
        // remove on screen
        btn.closest(".card").remove();
        // remove from chart
        chart = chart.filter(
          (product) =>
            product.name != btn.closest(".card").querySelector("h5").textContent
        );
        // update card again after removing
        updateCardTotal();
      }
    };
  });
}

//^ piece control ( - + )
function pieceControl() {
  document.querySelectorAll(".piece-controller").forEach((control) => {
    const plus = control.lastElementChild;
    const minus = control.firstElementChild;
    const piece = control.children[1];

    //& when plus clicked
    plus.onclick = () => {
      if (piece.textContent < 10) {
        // increase on screen
        piece.textContent = Number(piece.textContent) + 1;

        // increase in chart
        plus.closest(".card").querySelector(".product-total").textContent = (
          plus.closest(".card").querySelector(".discounted-price").textContent *
          piece.textContent
        ).toFixed(2);

        // update card again after adding piece
        updateCardTotal();
      } else alert("You can order maximum 10 of the same product");
    };

    //& when minus clicked
    minus.onclick = () => {
      if (piece.textContent > 0) {
        // increase on screen
        piece.textContent = Number(piece.textContent) - 1;

        // increase in chart
        minus.closest(".card").querySelector(".product-total").textContent = (
          minus.closest(".card").querySelector(".discounted-price")
            .textContent * piece.textContent
        ).toFixed(2);

        // update card again after adding piece
        updateCardTotal();
      } else {
        if (confirm("Product will be deleted. Are you sure?")) {
          minus.closest(".card").remove();
        }
      }
    };
  });
}

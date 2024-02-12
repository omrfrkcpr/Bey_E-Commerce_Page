//* ===================================================
//*                 Checkout Page Solution
//*  map filter, dest,spread ===================================================

//! Variables that are needed in table
const shipping = 15.0;
const tax = 0.18;

let chart = [
  {
    name: "Vintage Backpack",
    price: 34.99,
    piece: 1,
    img: "./assets/photo1.png",
  },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./assets/photo2.png" },
  { name: "Antique Clock", price: 69.99, piece: 1, img: "./assets/photo3.jpg" },
];

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
                            <span class="indirim-price">${(price * 0.7).toFixed(
                              2
                            )}</span>
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
                          Product Total: $<span class="product-toplam">${(
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

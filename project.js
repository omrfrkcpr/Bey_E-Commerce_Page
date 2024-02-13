window.addEventListener("DOMContentLoaded", () => {
  let chart = [];

  function addToChart(itemName, itemPrice, itemDiscountedPrice, itemImg) {
    const existingProductIndex = chart.findIndex(
      (product) => product.name === itemName.trim()
    );

    // Eğer ürün zaten sepette varsa ve adedi 10'dan az ise, bir ekleyelim
    if (existingProductIndex !== -1 && chart[existingProductIndex].piece < 10) {
      chart[existingProductIndex].piece += 1;
    }
    // Eğer ürün sepette yoksa ve adedi 10'dan az ise, yeni bir ürün ekleyelim
    else if (existingProductIndex === -1) {
      const item = {
        name: itemName.trim(),
        price: itemPrice,
        discountedPrice: itemDiscountedPrice,
        piece: 1,
        img: itemImg,
      };
      chart.push(item);
    }

    updateCart();
    updateProductTotal(itemName.trim());
  }

  function updatePiece(productName, operation) {
    const productIndex = chart.findIndex(
      (product) => product.name === productName
    );
    if (productIndex !== -1) {
      if (operation === "plus") {
        chart[productIndex].piece += 1;
      } else if (operation === "minus" && chart[productIndex].piece > 1) {
        chart[productIndex].piece -= 1;
      }
      updateCart();
    }
  }

  function removeFromChart(productName) {
    const productIndex = chart.findIndex(
      (product) => product.name === productName.trim()
    );
    if (productIndex !== -1) {
      chart.splice(productIndex, 1);
      updateCart();
    }
  }

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-btn")) {
      const card = event.target.closest(".item");
      const itemName = card.querySelector(".fw-bold").textContent;
      const itemPrice = parseFloat(
        card.querySelector(".original-price").textContent
      );
      const itemDiscountedPrice = parseFloat(
        card.querySelector(".discounted-price").textContent
      );
      const itemImg = card.querySelector(".img-thumbnail").src;
      addToChart(itemName, itemPrice, itemDiscountedPrice, itemImg);
    } else if (event.target.classList.contains("remove-product")) {
      if (confirm("Are you sure you want to delete the product?")) {
        const productName = event.target
          .closest(".card")
          .querySelector(".fw-bold").textContent;
        removeFromChart(productName);
      }
    } else if (
      event.target.classList.contains("minus") ||
      event.target.classList.contains("fa-minus")
    ) {
      const productName = event.target
        .closest(".piece-controller")
        .querySelector(".d-inline")
        .id.replace("product-piece-", "");
      updatePiece(productName, "minus");
    } else if (
      event.target.classList.contains("plus") ||
      event.target.classList.contains("fa-plus")
    ) {
      const productName = event.target
        .closest(".piece-controller")
        .querySelector(".d-inline")
        .id.replace("product-piece-", "");
      updatePiece(productName, "plus");
    }
  });

  function updateCart() {
    const productRows = document.querySelector("#product-rows");
    productRows.innerHTML = "";

    if (chart.length === 0) {
      productRows.innerHTML = "<p>No items in the cart</p>";
    } else {
      chart.forEach(({ name, price, discountedPrice, piece, img }) => {
        productRows.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0 align-items-center p-3">
                    <div class="col-md-5">
                        <img src="${img}" class="w-100 rounded-start" alt="Product Image">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${name}</h5>
                            <div class="product-price">
                                <p class="text-warning h2">$<span class="discounted-price">${discountedPrice}</span>
                                    <span class="h5 text-dark text-decoration-line-through original-price">$${price}</span>
                                </p>
                            </div>
                            <div class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2">
                                <div class="piece-controller">
                                    <button class="btn btn-secondary btn-sm minus" data-product="${name}"><i class="fas fa-minus"></i></button>
                                    <p class="d-inline mx-4" id="product-piece-${name}">${piece}</p>
                                    <button class="btn btn-secondary btn-sm plus" data-product="${name}"><i class="fas fa-plus"></i></button>
                                </div>
                            </div>
                            <div class="product-removal mt-4">
                                <button class="btn btn-danger btn-sm w-100 remove-product" data-product="${name}">
                                    <i class="fa-solid fa-trash-can me-2"></i>Remove
                                </button>
                            </div>
                            <div class="mt-2">Product Total: <span class="product-total" id="product-total-${name}">$${(
          discountedPrice * piece
        ).toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </div>`;
      });
    }
    updateCartTotal();
  }

  function updateCartTotal() {
    const productTotals = document.querySelectorAll(".product-total");
    let subtotal = 0;
    productTotals.forEach((total) => {
      subtotal += parseFloat(total.textContent.replace("$", ""));
    });

    const taxRate = 0.18;
    const tax = subtotal * taxRate;
    const shippingFee = subtotal > 0 ? 15.0 : 0;

    document.querySelector(".subtotal").textContent = `${subtotal.toFixed(2)}`;
    document.querySelector(".tax").textContent = `${tax.toFixed(2)}`;
    document.querySelector(".shipping").textContent = `${shippingFee.toFixed(
      2
    )}`;
    document.querySelector(".total").textContent = `${(
      subtotal +
      tax +
      shippingFee
    ).toFixed(2)}`;
  }

  function updateProductTotal(productName) {
    const product = chart.find((product) => product.name === productName);
    if (product) {
      const productTotalElement = document.querySelector(
        `#product-total-${productName}`
      );
      if (productTotalElement) {
        const total = product.discountedPrice * product.piece;
        productTotalElement.textContent = `$${total.toFixed(2)}`;
      } else {
        console.error(`Product total element not found for ${productName}`);
      }
    } else {
      console.error(`Product not found with name ${productName}`);
    }
  }

  document.querySelector(".chart-btn").onclick = () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("scale");
    const container = document.querySelector(".container");

    if (!container.classList.contains("display")) {
      // Container'ı sayfanın dışına çıkar
      container.style.position = "fixed";
      container.style.top = "-9999px";
      container.style.right = "-9999px";
    } else {
      // Container'ı tekrar eski konumuna getir
      container.style.position = "absolute";
      container.style.top = "100px";
      container.style.right = "-70px";
      container.style.width = "550px";
    }

    container.classList.toggle("display");
    setTimeout(() => {
      container.style.opacity = container.classList.contains("display")
        ? "1"
        : "0";
      nav.style.opacity = nav.classList.contains("scale") ? "1" : "0";
    }, 50);
  };

  updateCart();
});

// Show Alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
  let dataTime = showAlert.getAttribute("data-time")
  dataTime = parseInt(dataTime)

  // Ẩn thông báo sau một khoảng thời gian
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, dataTime)

  // Tắt thông báo khi nhấn nút "x"
  const closeButton = showAlert.querySelector("[close-alert]")
  closeButton.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}
// End Show Alert

// Update Quantity in Cart
const listInputQuantity = document.querySelectorAll("input[name='quantity']")
if (listInputQuantity) {
  listInputQuantity.forEach((input) => {
    const itemId = input.getAttribute("item-id")
    input.addEventListener("change", () => {
      window.location.href = `/cart/update/${itemId}/${input.value}`
    })
  })
}
// End Update Quantity in Cart

// Confirm Password
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirmPassword")
const alertConfirm = document.querySelector(".alert-confirm")

if (confirmPassword) {
  confirmPassword.addEventListener("keyup", () => {
    if (confirmPassword.value == password.value) {
      alertConfirm.classList.add("d-none")
    } else {
      alertConfirm.classList.remove("d-none")
    }
  })
}

// End Confirm Password

// Add to cart
const addCarts = document.querySelectorAll(".add-cart")
if (addCarts) {
  addCarts.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("product-id")
      fetch(`/cart/add/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity: "1" }),
      })
        .then(() => {
          const quantity = document.querySelector(".cart a")
          const totalQuantity = quantity.textContent.slice(1, -1)
          quantity.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> (${parseInt(totalQuantity) + 1})`
        })
    })
  })
}
// End add to cart

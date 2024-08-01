// Show Alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
  let dataTime = showAlert.getAttribute("data-time")
  dataTime = parseInt(dataTime)

  // Ẩn thông báo sau một khoảng thời gian
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, dataTime);

  // Tắt thông báo khi nhấn nút "x"
  const closeButton = showAlert.querySelector("[close-alert]")
  closeButton.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}
// End Show Alert

// Update Quantity in Cart
const listInputQuantity = document.querySelectorAll("input[name='quantity']")
if(listInputQuantity){
  listInputQuantity.forEach(input => {
    const itemId = input.getAttribute("item-id")
    input.addEventListener("change", () => {
      window.location.href = `/cart/update/${itemId}/${input.value}`
    })
  })
}
// End Update Quantity in Cart
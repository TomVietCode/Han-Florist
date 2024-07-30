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
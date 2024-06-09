// Recycle Item
const formRecycleItem = document.querySelector("[form-recycle-item]")
if(formRecycleItem){
  const listButtonRecycle = document.querySelectorAll("[button-recycle]")

  listButtonRecycle.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const path = formRecycleItem.getAttribute("data-path")

      let action = `${path}/recycle-item/${id}?_method=PATCH`
      console.log(action)
      formRecycleItem.action = action

      formRecycleItem.submit()
    })
  })
}
// End Recycle Item

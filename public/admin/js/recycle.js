// Recycle Item
const formRecycleItem = document.querySelector("[form-recycle-item]")
if(formRecycleItem){
  const listButtonRecycle = document.querySelectorAll("[button-recycle]")

  listButtonRecycle.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const path = formRecycleItem.getAttribute("data-path")

      let action = `${path}/recycle-item/${id}?_method=PATCH`

      formRecycleItem.action = action

      formRecycleItem.submit()
    })
  })
}
// End Recycle Item

// Delete Permanently
const formDeletePermanently = document.querySelector("[form-delete-permanently]")
if(formDeletePermanently){
  const listButtonDelete = document.querySelectorAll("[button-delete]")

  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const check = confirm("Bạn có chắc chắn muốn xóa!?")
      if(check){
        const id = button.getAttribute("data-id")
        const path = formDeletePermanently.getAttribute("data-path")

        let action = `${path}/delete-permanently/${id}?_method=DELETE`

        formDeletePermanently.action = action
        console.log(formDeletePermanently.action)

        formDeletePermanently.submit()
      }
    })
  })
}
// End Delete Permanently
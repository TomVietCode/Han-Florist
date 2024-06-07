//Button Status
const buttonsStatus = document.querySelectorAll("[button-status]")

if(buttonsStatus.length > 0){
  let url = new URL(window.location.href)

  buttonsStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status")

      if(status){
        url.searchParams.set("status", status)
      }else{
        url.searchParams.delete("status")
      }

      url.searchParams.set("page", 1)  //Set page to 1 when change Filter Status (incase that filter-status have less page than the origin) 
      
      window.location.href = url
    })
  })
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search")

if(formSearch){
  let url = new URL(window.location.href)
  
  formSearch.addEventListener("submit", (event) => {
    event.preventDefault()
    const keyword = event.target.elements.keyword.value

    if(keyword){
      url.searchParams.set("keyword", keyword)
      url.searchParams.set("page", 1)
    }else{
      url.searchParams.delete("keyword")
    }

    window.location.href = url.href
  })
}
// End Form Search


// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")

if(buttonPagination.length > 0){
  let url = new URL(window.location.href)

  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const toGoPage = button.getAttribute("button-pagination")

      url.searchParams.set("page", toGoPage)
      
      window.location.href = url
    })
  })
}
// End Pagination

// Button Change Status
const listButtonChangeStatus = document.querySelectorAll("[button-change-status]")

if(listButtonChangeStatus.length > 0){
  const formChangeStatus = document.querySelector("[form-change-status]")

  listButtonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const status = button.getAttribute("data-status")
      const path = formChangeStatus.getAttribute("data-path")

      let action = `${path}/${status}/${id}?_method=PATCH`

      formChangeStatus.action = action

      formChangeStatus.submit()
    })
  })
}
// End Button Change Status

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")

const inputCheckAll = checkboxMulti.querySelector("[name=checkall]")
const listCheckboxId = checkboxMulti.querySelectorAll("[name=id]")
inputCheckAll.addEventListener("click", () => {
  if(inputCheckAll.checked){
    listCheckboxId.forEach(input => {
      input.checked = true
    })
  }else{
    listCheckboxId.forEach(input => {
      input.checked = false
    })
  }
})

listCheckboxId.forEach(input => {
  input.addEventListener("click", () => {
    let countChecked = checkboxMulti.querySelectorAll("[name=id]:checked").length
    if(countChecked == listCheckboxId.length){
      inputCheckAll.checked = true
    }else{
      inputCheckAll.checked = false
    }
  })
})
// End Checkbox Multi

// Form Change Multi Status
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const listInputChecked = checkboxMulti.querySelectorAll("[name=id]:checked")

    const type = formChangeMulti.querySelector("select[name='type']").value
  
    if(listInputChecked){
      let ids = []
  
      listInputChecked.forEach(input => {
        const inputId = input.value
        ids.push(inputId)
      })

      if(type == "delete-all"){
        const isConfirm = confirm("Bạn có chắc chắn muốn xóa?")

        if(!isConfirm) return
      }

      const stringIds = ids.join(", ")
      const input = formChangeMulti.querySelector("[name='ids']")
      
      input.value = stringIds

      formChangeMulti.submit()
    }else{
      alert("Vui lòng chọn ít nhất một bản ghi!")
    }
  })
}
// End Form Change Multi Status

// Delete Item
const formDeleteItem = document.querySelector("[form-delete-item]")
if(formDeleteItem){
  const listButtonDelete = document.querySelectorAll("[button-delete]")

  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id")
      const path = formDeleteItem.getAttribute("data-path")

      let action = `${path}/${id}?_method=DELETE`
      console.log(action)
      formDeleteItem.action = action

      formDeleteItem.submit()
    })
  })
}
// End Delete Item



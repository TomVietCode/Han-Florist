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
if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
  const listCheckboxId = checkboxMulti.querySelectorAll("input[name='id']")

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
}
// End Checkbox Multi

// Form Change Multi Status
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const listInputChecked = checkboxMulti.querySelectorAll("[name=id]:checked")

    const type = formChangeMulti.querySelector("select[name='type']").value
  
    if(listInputChecked.length > 0){
      let ids = []
  
      listInputChecked.forEach(input => {
        const inputId = input.value

        if(type == "change-position"){
          const inputPosition = input.closest("tr").querySelector("[name='position']").value
          console.log(inputPosition)
          ids.push(`${inputId}-${inputPosition}`)
        }else{
          ids.push(inputId)
        }
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
      formDeleteItem.action = action

      formDeleteItem.submit()
    })
  })
}
// End Delete Item


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

// Image Preview
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
  const inputImage = document.querySelector("[upload-image-input]")
  const previewImage = document.querySelector("[upload-image-preview]")

  inputImage.addEventListener("change", (e) => {
    const file = e.target.files[0] // == inputImage.files[0]
    if(file){
      const url = URL.createObjectURL(file)
      previewImage.src = url
    }
  })
}
// End Image Preview

// Sort
const sort = document.querySelector("[sort]")
if(sort){
  let url = new URL(window.location.href)
  const sortSelect = sort.querySelector("[sort-select]")
  // Lắng nghe thay đổi sắp xếp
  sortSelect.addEventListener("change", (e) => {
    const [sortKey, sortValue] = e.target.value.split("-")

    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue", sortValue)

    window.location.href = url
  })

  const sortKey = url.searchParams.get("sortKey")
  const sortValue = url.searchParams.get("sortValue")
  
  // Thêm selected cho lựa chọn hiện tại
  if(sortKey && sortValue){
    const stringSort = `${sortKey}-${sortValue}`
    const selectedOption = sortSelect.querySelector(`option[value=${stringSort}]`)
    selectedOption.selected = true
  }

  // Gắn sự kiện nút Clear
  const buttonClear = document.querySelector("[sort-clear]")
  buttonClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey")
    url.searchParams.delete("sortValue")

    window.location.href = url
  })
}
// End Sort
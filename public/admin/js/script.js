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
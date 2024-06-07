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

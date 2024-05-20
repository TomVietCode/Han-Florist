module.exports = (query, limitItems, count) => {
  const objectPagination = {
    currentPage: 1,
    limitItems: limitItems
  }

  if(query.page){
    objectPagination.currentPage = parseInt(query.page)
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * limitItems

  objectPagination.totalPage = Math.ceil(count / objectPagination.limitItems)

  return objectPagination
}
let count = 0
function createTree(records, parentId = ""){
  const tree = []
  records.forEach(item => {
    if(item.parent_id == parentId){
      item.count = count++
      const children = createTree(records, item.id)
      if(children.length > 0){
        item.children = children
      } 
      tree.push(item)
    }
  })
  return tree
}

module.exports = (records) => {
  count = 0
  const tree = createTree(records)
  return tree
}
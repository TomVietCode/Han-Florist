function createTree(records, parentId = ""){
  const tree = []
  records.forEach(item => {
    if(item.parent_id == parentId){
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
  const tree = createTree(records)
  return tree
}
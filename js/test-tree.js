var json_data = [
    {
        "path": "https://mieru-ca.com/blog/twitter_image-size/"
    },
    {
        "path": 
            "https://mieru-ca.com/blog/customer_journey/"
    }];

// function filterByUrl(arr) {
//     var arrURL = [];
//     arr.forEach(e => {
//         arrURL.push({
//             path: e.keys[0]
//         });
//     });
//     return arrURL;
// };

// const recursiveAssign = ([H, ...T], target) => {
//     target[H] = target[H] || {};
//     if (T.length > 0) recursiveAssign(T, target[H]);
//   }
  
//   const createTree = (paths) => {
//     const acc = {};
//     for (let path of paths) {
//         const arrPath = path.match(/\/[^\/]+/g);
//         recursiveAssign(arrPath, acc);
//     }
//     return acc;
//   }

//   var arrTempl = filterByUrl(arr);
//   console.log(createTree(arrTempl));

  // Add an item node in the tree, at the right position
function addToTree(node, treeNodes) {
    var parentNode = GetTheParentNodeChildArray(node.path, treeNodes) || treeNodes;
  
    parentNode.push({
      path: node.path,
      children: []
    });
}
  
function GetTheParentNodeChildArray(path, treeNodes) {
    for (var i = 0; i < treeNodes.length; i++) {
      var treeNode = treeNodes[i];
  
      if (path === (treeNode.path + '/' + treeNode.title)) {
        return treeNode.children;
      } 
      else if (treeNode.children.length > 0) {
        var possibleParent = false;
  
        treeNode.children.forEach(function(item) {
          if (path.indexOf(item.path + '/' + item.title) == 0) {
            possibleParent = true;
            return false;
          }
        });
  
        if (possibleParent) {
          return GetTheParentNodeChildArray(path, treeNode.children)
        }
      }
    }
  }
  
  
  //Create the item tree starting from menuItems
  function createTree(nodes) {
    var tree = [];
  
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      addToTree(node, tree);
    }
    return tree;
  }
  
  // variable = "json_data" is the set of URLS
  var menuItemsTree = createTree(json_data);
  console.log(menuItemsTree);

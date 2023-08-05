var arr = [
  
  {
    "keys": [
        "https://mieru-ca.com/blog/twitter_image-size/"
    ],
    "clicks": 40312,
    "impressions": 636097,
    "ctr": 0.0633739822699997,
    "position": 10.631661523321128
},
{
    "keys": [
        "https://mieru-ca.com/blog/customer_journey/"
    ],
    "clicks": 24838,
    "impressions": 229685,
    "ctr": 0.10813940832009056,
    "position": 6.243860069225243
},{
  "keys": [
      "https://mieru-ca.com/heatmap/blog/what-is-mockup/"
  ],
  "clicks": 13284,
  "impressions": 258891,
  "ctr": 0.05131116956557007,
  "position": 6.401049090157634
},{
  "keys": [
      "https://mieru-ca.com/blog/"
  ],
  "clicks": 13284,
  "impressions": 258891,
  "ctr": 0.05131116956557007,
  "position": 6.401049090157634
},{
  "keys": [
      "https://mieru-ca.com/"
  ],
  "clicks": 11460,
  "impressions": 117487,
  "ctr": 0.09754270685267306,
  "position": 25.429273025951808
},{
  "keys": [
      "https://mieru-ca.com/heatmap/what-is-heatmap/"
  ],
  "clicks": 9940,
  "impressions": 181493,
  "ctr": 0.05476795248301587,
  "position": 5.779049329726216
}, {
  "keys": [
      "https://mieru-ca.com/heatmap/what-is-heatmap/"
  ],
  "clicks": 9940,
  "impressions": 181493,
  "ctr": 0.05476795248301587,
  "position": 5.779049329726216
},{
  "keys": [
      "https://mieru-ca.com/heatmap/what-is-heatmap/abc/"
  ],
  "clicks": 9940,
  "impressions": 181493,
  "ctr": 0.05476795248301587,
  "position": 5.779049329726216
}];

function removeProtocol(url) {
  return url.replace(/^https?:\/\//, '');
}

function filterByUrl(arr) {
    var arrURL = [];
    arr.forEach(e => {
        arrURL.push(e.keys[0]);
    });
    return arrURL;
};

// const recursiveAssign = ([H, ...T], target) => {
//   target[H] = target[H] || {};
//   if (T.length > 0) recursiveAssign(T, target[H]);
// }
  
// const createTree = (nodes) => {
//   const acc = {};
//   for (let node of nodes) {
//       const arrPath = node.path.match(/\/[^\/]+/g);
//       recursiveAssign(arrPath, acc);
//   }
//   return acc;
// }

// var arrTempl = filterByUrl(arr);
// var resultTree = createTree(arrTempl);
// console.log(resultTree);

// var getPathOfNode = function(node) {
//   var path = ""
//   if (Object.keys(resultTree).length === 0) {
//     return Object.keys(resultTree);
//   }
// }

// let result = [];
// let level = {result};

// arrTempl = filterByUrl(arr);
var makePath =  function(index, testArr) {
  var idx = index;
  var str = "";
  for(i = 0 ; i <= idx; i++) {
    str =  str + "/" + testArr[i];
  }
  return str;
}

// arrTempl.forEach(urlE => {
//   const url = new URL(urlE);
//   let path = removeProtocol(urlE);
//   path.split("/").reduce((r, name, i, a) => {
//     if (name !== "" || (a.length >= 2)) {
//       if(!r[name]) {
//         r[name] = {result: []};
//         let namePath = makePath(i, a);
//         r.result.push({NamePath: url.protocol + "/" + namePath + (name.length > 1 ? "/" : ""), Name: "/" + name, Children: r[name].result});
//       }
//       return r[name];
//     }
//   }, level);
// });

var filterTree = function(objectTree){
  if((objectTree.Children.length <= 1 && objectTree.Name !== "/")) {
    objectTree.Children = [];
  }
  objectTree.Children.forEach(e => {
    filterTree(e);
  });
  return objectTree;
}

function getUrlPathSegments(url) {
  const path = removeProtocol(url);
  return path.split("/").slice(1);
}

function addPathSegmentsToTree(pathSegments, protocol, currentNode, currentPath, currentName) {
  if (pathSegments.length === 0) {
    return;
  }

  const currentSegment = pathSegments[0];
  const newPath = currentPath + currentSegment + (currentSegment.length > 1 ? "/" : "");

  let existingNode = currentNode.find(node => node.NamePath === newPath);
  if ((!existingNode) || (existingNode 
          && pathSegments[pathSegments.length - 1] === currentSegment 
          && existingNode.Children.length > 0)) {
    existingNode = { NamePath: newPath, Name: '/'+ currentSegment, Children: [] };
    currentNode.push(existingNode);
  }

  addPathSegmentsToTree(pathSegments.slice(1), protocol, existingNode.Children, newPath, currentSegment);
}

var renderObject = function (urlTemplates) {
  const treeRoot = { result: [] };
    
  urlTemplates.forEach(urlTemplate => {
    const url = new URL(urlTemplate);
    const pathSegments = getUrlPathSegments(url.pathname);
    pathSegments.unshift(url.hostname);
    const protocol = url.protocol;
    addPathSegmentsToTree(pathSegments, protocol, treeRoot.result, protocol + "//", '');
  });
  
  return filterTree(sortTree(treeRoot.result[0]));
}

// var testA = ["https://a/","https://a/b/","https://a/b/b1/","https://a/c"];

// console.log(renderObject(testA));


var indexOFSlash = function(arr){
  let index = 0;
  let idxSlash = -1;
  arr.forEach(e => {
    if(e.Name === "/")
    {
      idxSlash = index;
    }
    index +=1;
  });
  return idxSlash;
}

var permutatorFirstElement = function(inputArr) {
  let result = [];
  let position = indexOFSlash(inputArr);
  result.push(inputArr[position]);
  result = result.concat(inputArr);
  result.splice(position+1, 1);
  return result;
} 

var sortTree = function(objectTree) {
  if (objectTree.Children.length === 0) {
    return;
  }

  objectTree.Children = permutatorFirstElement(objectTree.Children);

  objectTree.Children.forEach(e => {
    sortTree(e);
  });
  return objectTree;
}

$('.tree').simpleTreePicker( {
  "tree": renderObject(filterByUrl(arr)),
  "onclick": function(){		
    var selected = $(".tree").simpleTreePicker("val");
    selected.forEach(e => {
      //console.log(e);
    });
    // $("#selected").html( !!selected.length ? selected.toString().replace(/,/g,', ') : "Nothing Selected" );
  },
  "name" : "register-url-list"
});

// Update view with initial state (onclick isn't called for initial selection)
//$("#selected").html( $(".tree").simpleTreePicker("display").toString().replace(/,/g,', ') );




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

var renderObject = function (arr) {
  let result = [];
  let level = {result};
  arr.forEach(urlE => {
    const url = new URL(urlE);
    let path = removeProtocol(urlE);
    path.split("/").reduce((r, name, i, a) => {
      if (name !== "" || (a.length >= 2)) {
        if(!r[name]) {
          r[name] = {result: []};
          let namePath = makePath(i, a);
          r.result.push({NamePath: url.protocol + "/" + namePath + (name.length > 1 ? "/" : ""), Name: "/" + name, Children: r[name].result});
        }
        return r[name];
      }
    }, level);
  });
  return filterTree(result[0]);
}

var testA = ["https://a/","https://a/b/","https://a/b/b1/","https://a/c"];

console.log(renderObject(testA));



// var filterTree = function(objectTree){
//   if((objectTree.Children.length <= 1 && objectTree.Name !== "/")) {
//     objectTree.Children = [];
//   }
//   objectTree.Children.forEach(e => {
//     filterTree(e);
//   });
//   return objectTree;
// }

// var  testArr = "mieru-ca.com/heatmap/what-is-heatmap".split("/");

// var testarr = ["/abc","/tyui","/","nhg"];
// console.log(testarr);

// var indexOFSlash = function(arr){
//   let index = 0;
//   let idxSlash = -1;
//   arr.forEach(e => {
//     if(e.Name === "/")
//     {
//       idxSlash = index;
//     }
//     index +=1;
//   });
//   return idxSlash;
// }

// var permutatorFirstElement = function(inputArr) {
//   let result = [];
//   let position = indexOFSlash(inputArr);
//   result.push(inputArr[position]);
//   result = result.concat(inputArr);
//   result.splice(position+1, 1);
//   return result;
// } 



// console.log(permutatorFirstElement(testarr));




//console.log(makePath(1, testArr));

//console.log(result);




// var sortTree = function(objectTree) {
//   if (objectTree.Children.length === 0) {
//     return;
//   }

//   objectTree.Children = permutatorFirstElement(objectTree.Children);

//   objectTree.Children.forEach(e => {
//     sortTree(e);
//   });
//   return objectTree;
// }

// console.log(sortTree(result[0]));

// filterTree(sortTree(result[0]));


// var demoTreeData = JSON.parse('{"Number":"KI-125-25","Name":"All","Children":[{"Number":"WA-775-99","Name":"Main House","Children":[{"Number":"JI-105-09","Name":"Downstairs","Children":[]},{"Number":"TR-883-66","Name":"Upstairs","Children":[{"Number":"SS-002-99","Name":"Bedrooms","Children":[{"Number":"JI-656-09","Name":"Master Bedroom","Children":[]},{"Number":"ZZ-654-66","Name":"Guest Bedroom","Children":[]}]},{"Number":"SS-001-99","Name":"Other Rooms","Children":[{"Number":"JI-898-09","Name":"Great Room","Children":[]},{"Number":"ZZ-493-66","Name":"Bonus Room","Children":[]}]}]}]},{"Number":"QQ-542-10","Name":"Garage","Children":[]}]}');

// var treeObject = JSON.stringify(result[0]);
// var demoTreeData = JSON.parse(treeObject);
// $('.tree').simpleTreePicker( {
//   "tree": sortTree(result[0]),
//   "onclick": function(){		
//     var selected = $(".tree").simpleTreePicker("val");
//     selected.forEach(e => {
//       //console.log(e);
//     });
//     // $("#selected").html( !!selected.length ? selected.toString().replace(/,/g,', ') : "Nothing Selected" );
//   },
//   "name" : "register-url-list"
// });

// // Update view with initial state (onclick isn't called for initial selection)
// $("#selected").html( $(".tree").simpleTreePicker("display").toString().replace(/,/g,', ') );

function generateTreeStructureFromUrls(urlTemplates) {
  const treeRoot = { result: [] };
  
  urlTemplates.forEach(urlTemplate => {
    const url = new URL(urlTemplate);
    const pathSegments = removeEmptyPathSegments(getUrlPathSegments(urlTemplate));
    const currentNode = treeRoot;
    addPathSegmentsToTree(pathSegments, url.protocol, currentNode, 0);
  });

  return treeRoot.result;
}

function getUrlPathSegments(url) {
  const path = removeProtocol(url);
  return path.split("/");
}

function removeProtocol(url) {
  return url.replace(/^(https?|ftp):\/\//, "");
}

function removeEmptyPathSegments(pathSegments) {
  return pathSegments.filter(segment => segment !== "");
}

function addPathSegmentsToTree(pathSegments, protocol, parentNode, index) {
  if (index === pathSegments.length) {
    return;
  }

  const currentSegment = pathSegments[index];

  if (!parentNode[currentSegment]) {
    const newNode = { result: [] };
    const path = getPathFromSegments(pathSegments, index);
    const newNodePath = protocol + path + (currentSegment.length > 1 ? "/" : "");
    const newNodeData = { NamePath: newNodePath, Name: "/" + currentSegment, Children: newNode.result };
    parentNode.result.push(newNodeData);
    parentNode[currentSegment] = newNode;
  }

  addPathSegmentsToTree(pathSegments, protocol, parentNode[currentSegment], index + 1);
}

function getPathFromSegments(pathSegments, index) {
  const pathSegmentsBeforeCurrent = pathSegments.slice(0, index);
  return "/" + pathSegmentsBeforeCurrent.join("/") + "/";
}


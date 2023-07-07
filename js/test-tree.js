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

let result = [];
let level = {result};

arrTempl = filterByUrl(arr);
var makePath =  function(index, testArr) {
  var idx = index;
  var str = "";
  for(i = 0 ; i <= idx; i++) {
    str =  str + "/" +testArr[i];
  }
  return str;
}

arrTempl.forEach(url => {
  let path = removeProtocol(url);
  path.split("/").reduce((r, name, i, a) => {
    if (name !== "" || a.length === 2) {
      if(!r[name]) {
        r[name] = {result: []};
        let namePath = makePath(i, a);
        r.result.push({NamePath: namePath, Name: "/" + name, Children: r[name].result});
      }
      return r[name];
    }
  }, level);
});

var  testArr = "mieru-ca.com/heatmap/what-is-heatmap".split("/");



console.log(makePath(1, testArr));

console.log(result);

var demoTreeData = JSON.parse('{"Number":"KI-125-25","Name":"All","Children":[{"Number":"WA-775-99","Name":"Main House","Children":[{"Number":"JI-105-09","Name":"Downstairs","Children":[]},{"Number":"TR-883-66","Name":"Upstairs","Children":[{"Number":"SS-002-99","Name":"Bedrooms","Children":[{"Number":"JI-656-09","Name":"Master Bedroom","Children":[]},{"Number":"ZZ-654-66","Name":"Guest Bedroom","Children":[]}]},{"Number":"SS-001-99","Name":"Other Rooms","Children":[{"Number":"JI-898-09","Name":"Great Room","Children":[]},{"Number":"ZZ-493-66","Name":"Bonus Room","Children":[]}]}]}]},{"Number":"QQ-542-10","Name":"Garage","Children":[]}]}');

var treeObject = JSON.stringify(result[0]);
var demoTreeData = JSON.parse(treeObject);
$('.tree').simpleTreePicker( {
  "tree": result[0],
  "onclick": function(){		
    var selected = $(".tree").simpleTreePicker("display");
    $("#selected").html( !!selected.length ? selected.toString().replace(/,/g,', ') : "Nothing Selected" );
  },
  "name" : "register-url-list"
});

// Update view with initial state (onclick isn't called for initial selection)
$("#selected").html( $(".tree").simpleTreePicker("display").toString().replace(/,/g,', ') );

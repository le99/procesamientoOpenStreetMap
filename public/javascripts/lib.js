
function plotNode(nodeId,  graph, nodes, google, map){

  _.each(graph[nodeId], function(k){
    // console.log(n);

    var path = [nodes[nodeId], nodes[k]];
    console.log(path);
    var flightPath = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(map);
  });

}

function plotGraph(graph, nodes, google, map){
  _.each(graph, function(n, nodeId){
    plotNode(nodeId,  graph, nodes, google, map);
  });
}

function plotCC(cc, graph, nodes, google, map){
  _.each(cc, function(n, nodeId){
    plotNode(nodeId,  graph, nodes, google, map);
  });

  // _.chain(cc).filter(function(c, k){
  //
  // }).each(cc, function(n, nodeId){
  //   plotNode(nodeId,  graph, nodes, google, map);
  // }).value();
}

function test(nodeId,  graph, nodes){

  _.each(graph[nodeId], function(n, k){
    console.log(k);

    var path = [nodes[nodeId], nodes[k]];
    console.log(path);
    // var flightPath = new google.maps.Polyline({
    //   path: path,
    //   geodesic: true,
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 1.0,
    //   strokeWeight: 2
    // });
    // flightPath.setMap(map);
  });

}


function plotFullGraph(fullGraph, google, map){
  var plotFullGrpahNode = function(nodeId, graph, google, map){

    _.each(graph[nodeId].adj, function(k){
      var path = [
        {
          lat:parseFloat(graph[nodeId].lat),
          lng:parseFloat(graph[nodeId].lon)
        },
        {
          lat:parseFloat(graph[k].lat),
          lng:parseFloat(graph[k].lon)
        }
      ];
      // console.log(path);

      var flightPath = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      flightPath.setMap(map);
    });
  };

  var cont = 0;
  // interesting 20000, 2000
  var offset = 2000;
  _.each(fullGraph, function(n, nodeId){

    cont++;
    if(cont < offset || cont > offset + 5000){
      return;
    }
    plotFullGrpahNode(nodeId, fullGraph , google, map);
  });
}

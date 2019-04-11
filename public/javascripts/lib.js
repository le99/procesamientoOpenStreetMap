
function plotNode(nodeId,  graph, nodes, google, map){

  _.each(graph[nodeId], function(k){
    // console.log(n);

    var path = [nodes[nodeId], nodes[k]];
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

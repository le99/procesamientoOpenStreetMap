// Consider:
//https://github.com/isaacs/sax-js
//https://www.npmjs.com/package/JSONStream

var fs = require('fs');
var xml2js = require('xml2js');
var _ = require('underscore');

const FILE_IN = '/data/map.osm';
//const FILE_IN = '/data/Central-WashingtonDC-OpenStreetMap.xml';
// const FILE_IN = '/data/XMLs/map.xml';

fs.readFile(__dirname + FILE_IN, function(err, data) {
    xml2js.parseString(data, function (err, result) {
        if(err){
          return console.log(err);
        }
        var nodes = _.map(result.osm.node, function(node){
          return {id: parseInt(node.$.id), lat: parseFloat(node.$.lat), lng: parseFloat(node.$.lon)};
        });
        var nodeMap = _.mapObject(_.indexBy(nodes, 'id'), function(node){
          return {lat: node.lat, lng: node.lng};
        });

        var graph = {};

        var ways = _.chain(result.osm.way).filter(function(way){
          return _.some(way.tag, function(t){
            return t.$.k == 'highway';
          });
        }).each(function(way){
          for(var n = 0; n < way.nd.length - 1; n++){

            if(!graph[way.nd[n].$.ref]){
              graph[way.nd[n].$.ref] = {};
            }
            if(!graph[way.nd[n+1].$.ref]){
              graph[way.nd[n+1].$.ref] = {};
            }

            graph[way.nd[n].$.ref][way.nd[n + 1].$.ref] = true;
            graph[way.nd[n + 1].$.ref][way.nd[n].$.ref] = true;
          }
        }).value();

        // var marked = cc(graph);

        var graphClean = _.mapObject(graph, function(v){
          return Object.keys(v);
        });
        console.log("nodes:" + Object.keys(graphClean).length);
        console.log("edges: " + _.reduce(graphClean, function(memo, ob){
          return memo + ob.length;
        }, 0))


        fs.writeFile('./data/graph.json', JSON.stringify(graphClean, null, 4), function(err){
          if(err){
            return console.log(err);
          }
        });
        fs.writeFile('./data/nodes.json', JSON.stringify(nodeMap, null, 4), function(err){
          if(err){
            return console.log(err);
          }
        });

        console.log('Write');

        var graphFull = _.mapObject(nodeMap, function(v, k){
          return {lat: v.lat , lon: v.lng, adj: graphClean[k]}
        });
        fs.writeFile('./data/graphFull.json', JSON.stringify(graphFull, null, 4), function(err){
          if(err){
            return console.log(err);
          }
        });
        // fs.writeFile('./data/cc.json', JSON.stringify(marked, null, 4));

        console.log('Done');
    });
});



function cc(graph){
  var id = 1;
  var marked = {};
  _.each(graph, function(v, k){
    if(typeof marked[k] == 'undefined'){
      dfs(graph, marked, k, id);
      id++;
    }
  });
  console.log(id -1)
  return marked;
}

function dfs(graph, marked, v, id){
  marked[v] = id;
  _.each(graph[v], function(vv, k){
    if(typeof marked[k] == 'undefined'){
      dfs(graph, marked, k, id);
    }
  });
}

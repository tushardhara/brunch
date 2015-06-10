
window.App = require('app');

//////////////////////////////////
// Templates
//////////////////////////////////

require('templates/application');
require('templates/index');

//////////////////////////////////
// Models
//////////////////////////////////



/////////////////////////////////
// Controllers
/////////////////////////////////


/////////////////////////////////
// Views
/////////////////////////////////



/////////////////////////////////
// Routes
/////////////////////////////////



/////////////////////////////////
// Store
/////////////////////////////////

App.Store = DS.Store.extend({
  revision: 11
});

/////////////////////////////////
// Router
/////////////////////////////////

App.Router.map(function() {
  this.route('index', { path: '/'});
});


App.IndexRoute = Ember.Route.extend({
  model: function() {
  	var chart = [];
	var data = [];
	data[0] = [{
		key: "CPU",
		color: "orange",
		values: [
			{x: 1, y: 1}
		]
	}];
	data[1] = [{
		key: "MEMORY",
		color: "blue",
		values: [
			{x: 1, y: 1}
		]
	}];
	data[2] = [{
		key: "NETWORK",
		color: "green",
		values: [
			{x: 1, y: 1}
		]
	}];
	nv.addGraph(function() {
	  chart[0] = nv.models.historicalBarChart();
	  chart[1] = nv.models.historicalBarChart();
	  chart[2] = nv.models.historicalBarChart();
	  chart[0]
	      .x(function(d,i) { return d.x });
	  chart[1]
	      .x(function(d,i) { return d.x });
	  chart[2]
	      .x(function(d,i) { return d.x });
	  chart[0].xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
	      .tickFormat(d3.format(',.1f'))
	      .axisLabel("Time")
	      ;
	  chart[1].xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
	      .tickFormat(d3.format(',.1f'))
	      .axisLabel("Time")
	      ;
	  chart[2].xAxis // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
	      .tickFormat(d3.format(',.1f'))
	      .axisLabel("Time")
	      ;
	  chart[0].yAxis
	      .axisLabel('CPU %')
	      .tickFormat(d3.format(',.2f'));
	  chart[1].yAxis
	      .axisLabel('MEMORY %')
	      .tickFormat(d3.format(',.2f'));
	  chart[2].yAxis
	      .axisLabel('NETWORK %')
	      .tickFormat(d3.format(',.2f'));
	  chart[0].showXAxis(true).showYAxis(true).rightAlignYAxis(false).margin({right: 0});
	  chart[1].showXAxis(true).showYAxis(true).rightAlignYAxis(false).margin({right: 0});
	  chart[2].showXAxis(true).showYAxis(true).rightAlignYAxis(false).margin({right: 0});
	  d3.select('#chart1 svg')
	      .datum(data[0])
	      .transition().duration(500)
	      .call(chart[0]);
	  d3.select('#chart2 svg')
	      .datum(data[1])
	      .transition().duration(500)
	      .call(chart[1]);
	  d3.select('#chart3 svg')
	      .datum(data[2])
	      .transition().duration(500)
	      .call(chart[2]);
	  nv.utils.windowResize(chart.update);
	  return chart;
	});
	var x = 2;
	var run = true;
	setInterval(function(){
		if (!run) return;
		var spike = (Math.random() > 0.95) ? 10: 1;
		data[0][0].values.push({
			x: x,
			y: Math.random() * spike
		});
		data[1][0].values.push({
			x: x,
			y: Math.random() * spike
		});
		data[2][0].values.push({
			x: x,
			y: Math.random() * spike
		});
		if (data[0][0].values.length > 20) {
			data[0][0].values.shift();
		}
		if (data[1][0].values.length > 20) {
			data[1][0].values.shift();
		}
		if (data[2][0].values.length > 20) {
			data[2][0].values.shift();
		}
		x++;
		chart[0].update();
		chart[1].update();
		chart[2].update();
	}, 500);
	d3.select("#start-stop-button").on("click",function() {
		run = !run;
	});

  }
});


App.initialize();

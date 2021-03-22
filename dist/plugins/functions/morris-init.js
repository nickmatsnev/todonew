/*
Template Name: Niche
Author: UXLiner
*/
$(function() {
    "use strict";

// ======
// Yearly Earning Starts
// ======

var day_data = [
  {"elapsed": "200", "Hours": 60, "Tasks": 80},
  {"elapsed": "300", "Hours": 100, "Tasks": 130},
  {"elapsed": "400", "Hours": 70, "Tasks": 50},
  {"elapsed": "500", "Hours": 80, "Tasks": 155},
  {"elapsed": "600", "Hours": 155, "Tasks": 105},
  {"elapsed": "700", "Hours": 120, "Tasks": 110},
  {"elapsed": "800", "Hours": 250, "Tasks": 180}
];
Morris.Line({
  element: 'earning',
  data: day_data,
  xkey: 'elapsed',
  ykeys: ['Hours', 'Tasks'],
  labels: ['Hours', 'Tasks'],
  fillOpacity: 0,
  pointStrokeColors: ['#1976d2', '#26c6da'],
  behaveLikeLine: true,
  gridLineColor: '#e0e0e0',
  lineWidth: 3,
  hideHover: 'auto',
  lineColors: ['#5867dd', '#008cd3'],
  resize: true
});

// ======
// Yearly Earning Ending
// ======

// ======
// Area Chart Starts
// ======

Morris.Area({
  element: 'area',
  data: [
    {x: '200', comlp: 100, inprog: 30, fired: 10},
    {x: '300', comlp: 20, inprog: 110, fired: 90},
    {x: '400', comlp: 120, inprog: 35, fired: 15},
    {x: '500', comlp: 60, inprog: 90, fired: 70},
    {x: '600', comlp: 130, inprog: 40, fired: 20},
    {x: '700', comlp: 60, inprog: 80, fired: 5}
  ],
  xkey: 'x',
  ykeys: ['comlp', 'inprog' , 'fired'],
  labels: ['comlp', 'inprog', 'fired'],
  fillOpacity:0.9,
  pointStrokeColors: ['#778dcd', '#7088cc', '#2d3ec3'],
  behaveLikeLine: true,
  gridLineColor: '#e0e0e0',
  lineWidth: 0,
  smooth: true,
  hideHover: 'auto',
  lineColors: ['#4d64a7', '#778dcd' , '#2d3ec3'],
  resize: true
});

// ======
// Area chart End
// ======

// ======
// Donut Chart Starts
// ======

Morris.Donut({
      element: 'donut',
      data: [
        {value: 40, label: 'Figma'},
        {value: 25, label: 'HTML+CSS'},
        {value: 20, label: 'JavaScript'},
        {value: 15, label: 'Python'}
      ],
      backgroundColor: '#fff',
      labelColor: '#404e67',
      colors: [
        '#ff4558',
        '#ff7d4d',
        '#00a5a8',
        '#626e82'
      ],
      formatter: function (x) { return x + "%"}
    });

// ======
// Donut chart End
// ======

// ======
// Bar chart Start
// ======
Morris.Bar({
  element: 'bar-chart',
  data: [
    {x: '2011', y: 60, z: 20, a: 40},
    {x: '2011', y: 20, z: 50, a: 10},
    {x: '2011', y: 10, z: 50, a: 35},
    {x: '2011', y: 20, z: 40, a: 20}
  ],
  xkey: 'x',
  ykeys: ['y', 'z', 'a'],
  labels: ['Y', 'Z', 'A']
}).on('click', function(i, row){
  console.log(i, row);
  resize: true
});
// ======
// Bar chart End
// ======

})(jQuery);
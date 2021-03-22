/*
Template Name: Niche
Author: UXLiner
*/
$(function() {
    "use strict";

// Use Morris.Area instead of Morris.Line

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
  ykeys: ['Sales', 'Earning'],
  labels: ['Sales', 'Earning'],
  fillOpacity: 0,
  pointStrokeColors: ['#1976d2', '#26c6da'],
  behaveLikeLine: true,
  gridLineColor: '#e0e0e0',
  lineWidth: 3,
  hideHover: 'auto',
  lineColors: ['#5867dd', '#008cd3'],
  parseTime: false,
  resize: true
});

// ======
// Yearly Earning Ending
// ======

})(jQuery);
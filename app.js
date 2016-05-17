var coffeeLocations = [];
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];
var locations = ['pikePlace', 'capitolHill', 'seattlePublicLibrary', 'southLakeUnion', 'seatac'];
//var data = [['Pike Place Market', 14, 35, 1.2, 0.34], ['Capitol Hill', 12, 28, 3.2, 0.03], ['Seattle Public Library', ], [], []];

function CampCoffee (locationName, minCustomersHour, maxCustomersHour, avgCupsPerCustomer, avgPoundsPerCustomer) {
  this.locationName = locationName;
  this.minCustomersHour = minCustomersHour;
  this.maxCustomersHour = maxCustomersHour;
  this.avgCupsPerCustomer = avgCupsPerCustomer;
  this.avgPoundsPerCustomer = avgPoundsPerCustomer;
  this.totalBeansPerHour = [];
  this.cupsPerHour = [];
  this.poundsPerHour = [];
  this.customersPerHour = [];
  this.barristaPerHour = [];
  this.totalCustomers = 0;
  this.totalCups = 0;
  this.totalPounds = 0;
  this.totalBeans = 0;
  this.totalBarristaHours = 0;
  coffeeLocations.push(this);
};

CampCoffee.prototype.calcCustomersPerHour = function(min,max) {
  for (var i = 0; i < hours.length; i ++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.customersPerHour.push(customers);
    this.totalCustomers += customers;
  }
};

// Fill array for cups per hour and fill packages needed for those cups
CampCoffee.prototype.calcTotalCupsPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
    this.totalCups += cups;
    this.cupsPerHour.push(cups);
  }
};

CampCoffee.prototype.calcTotalPoundsPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
    this.totalPounds += beans;
    this.poundsPerHour.push(beans);
  }
};

CampCoffee.prototype.calcHourlyBeans = function() {
  for (var i = 0; i < hours.length; i++) {
    var beans = this.poundsPerHour[i] + (this.cupsPerHour[i] / 16);
    this.totalBeansPerHour[i] = Math.round(beans * 10) / 10;
    this.totalBeans += beans;
  }
};

CampCoffee.prototype.calcBaristaHours = function() {
  //var workTotal = [];
  for (var i = 0; i < hours.length; i++) {
    var barHours = Math.ceil((this.cupsPerHour[i] + this.poundsPerHour[i]) / 30);
    this.barristaPerHour[i] = barHours;
    this.totalBarristaHours += barHours;
  }
};

var pikePlace = new CampCoffee('Pike Place Market', 14, 34, 1.2, 0.34);
var capitolHill = new CampCoffee('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new CampCoffee('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new CampCoffee('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirport = new CampCoffee('SeaTac Airport', 28, 44, 1.1, 0.41);

// var tableHeadings = function(title) {
//   var table = document.getElementById('beans-table');
//   var trElement = document.createElement('tr');
//   var thElement = document.createElement('th');
//   thElement.textContent = '';
//   trElement.appendChild(thElement);
//   var thTitle = document.createElement('th');
//   thTitle.textContent = title + 'Total';
//   trElement.appendChild(thTitle);
//   for (var i = 0; i < hours.length; i++) {
//     var thEle = document.createElement('th');
//     thEle.textContent = hours[i];
//     trElement.appendChild(thEle);
//   }
//   table.appendChild(trElement);
// };

var tableData = function (){
  var total = 0;
  var totals = [];
  var beansTable = document.getElementById('beans-table');
  for (var i = 0; i < coffeeLocations.length; i++) {
    var trElement = document.createElement('tr');
    var tdElement = document.createElement('td');
    tdElement.textContent = coffeeLocations[i].locationName;
    trElement.appendChild(tdElement);
    tdElement = document.createElement('td');
    tdElement.textContent = coffeeLocations[i].totalBeans.toFixed(2);
    total += coffeeLocations[i].totalBeans;
    trElement.appendChild(tdElement);
    for (var j = 0; j < hours.length; j++) {
      var tdData = document.createElement('td');
      tdData.textContent = coffeeLocations[i].totalBeansPerHour[j].toFixed(2);
      totals[j] += coffeeLocations[i].totalBeansPerHour[j];
      trElement.appendChild(tdData);
    }
    beansTable.appendChild(trElement);
  }
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Total';
  trElement.appendChild(tdElement);
  for (var i = 0; i < totals.length; i++) {
    tdElement = document.createElement('td');
    tdElement.textContent = totals[i];
    trElement.appendChild(tdElement);
  }
  beansTable.appendChild(trElement);

};

var tableHeadings = function(title, id) {
  var beansTable = document.getElementById(id);
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);
  var thTitle = document.createElement('th');
  thTitle.textContent = title + 'Total';
  trElement.appendChild(thTitle);
  for (var i = 0; i < hours.length; i++) {
    var thEle = document.createElement('th');
    thEle.textContent = hours[i];
    trElement.appendChild(thEle);
  }
  beansTable.appendChild(trElement);
};

var tableData2 = function (){
  var total = 0;
  var totals = [];
  var beansTable = document.getElementById('baristas-table');
  for (var i = 0; i < coffeeLocations.length; i++) {
    var trElement = document.createElement('tr');
    var tdElement = document.createElement('td');
    tdElement.textContent = coffeeLocations[i].locationName;
    trElement.appendChild(tdElement);
    tdElement = document.createElement('td');
    tdElement.textContent = coffeeLocations[i].totalBarristaHours;
    total += coffeeLocations[i].totalBarristaHours;
    trElement.appendChild(tdElement);
    for (var j = 0; j < hours.length; j++) {
      var tdData = document.createElement('td');
      tdData.textContent = coffeeLocations[i].barristaPerHour[j];
      totals[j] += coffeeLocations[i].barristaPerHour[j];
      trElement.appendChild(tdData);
    }
    beansTable.appendChild(trElement);
  }
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Total';
  trElement.appendChild(tdElement);
  for (var i = 0; i < totals.length; i++) {
    tdElement = document.createElement('td');
    tdElement.textContent = totals[i];
    trElement.appendChild(tdElement);
  }
  beansTable.appendChild(trElement);
};

for (var i = 0; i < coffeeLocations.length; i++) {
  coffeeLocations[i].calcCustomersPerHour(coffeeLocations[i].minCustomersHour, coffeeLocations[i].maxCustomersHour);
  coffeeLocations[i].calcTotalCupsPerHour();
  coffeeLocations[i].calcTotalPoundsPerHour();
  coffeeLocations[i].calcHourlyBeans();
  coffeeLocations[i].calcBaristaHours();
  console.log(coffeeLocations[i]);
}

tableHeadings('Daily Location ', 'beans-table');
tableData();
tableHeadings('', 'baristas-table');
tableData2();

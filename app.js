var coffeeLocations = [];
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];
var totals = [0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0];
var total = 0;
var inputForm = document.getElementById('input-form');

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
  if (this.totalCustomers === 0) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.totalCustomers += customers;
    }
  }
};

CampCoffee.prototype.calcTotalCupsPerHour = function() {
  if (this.totalCups === 0) {
    for (var i = 0; i < hours.length; i++) {
      var cups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      this.totalCups += cups;
      this.cupsPerHour.push(cups);
    }
  }
};

CampCoffee.prototype.calcTotalPoundsPerHour = function() {
  if (this.totalPounds === 0) {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
      this.totalPounds += beans;
      this.poundsPerHour.push(beans);
    }
  }
};

CampCoffee.prototype.calcHourlyBeans = function() {
  if (this.totalBeans === 0) {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.poundsPerHour[i] + (this.cupsPerHour[i] / 16);
      this.totalBeansPerHour[i] = beans;
      this.totalBeans += beans;
    }
  }
};

CampCoffee.prototype.calcBaristaHours = function() {
  if (this.totalBarristaHours === 0) {
    for (var i = 0; i < hours.length; i++) {
      var barHours = Math.ceil((this.cupsPerHour[i] + this.poundsPerHour[i]) / 30);
      this.barristaPerHour[i] = barHours;
      this.totalBarristaHours += barHours;
    }
  }
};

CampCoffee.prototype.renderBeanRow = function() {
  var table = document.getElementById('beans-table');
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = this.locationName;
  trElement.appendChild(tdElement);
  tdElement = document.createElement('td');
  tdElement.textContent = Math.ceil(this.totalBeans);
  trElement.appendChild(tdElement);
  total += Math.ceil(this.totalBeans);
  for (var i = 0; i < hours.length; i++) {
    tdElement = document.createElement('td');
    tdElement.textContent = Math.ceil(this.totalBeansPerHour[i]);
    totals[i] += Math.ceil(this.totalBeansPerHour[i]);
    trElement.appendChild(tdElement);
  }
  table.appendChild(trElement);
};

CampCoffee.prototype.renderBaristaRow = function() {
  var table = document.getElementById('baristas-table');
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = this.locationName;
  trElement.appendChild(tdElement);
  tdElement = document.createElement('td');
  tdElement.textContent = Math.ceil(this.totalBarristaHours);
  trElement.appendChild(tdElement);
  total += Math.ceil(this.totalBarristaHours);
  for (var i = 0; i < hours.length; i++) {
    tdElement = document.createElement('td');
    tdElement.textContent = Math.ceil(this.barristaPerHour[i]);
    totals[i] += Math.ceil(this.barristaPerHour[i]);
    trElement.appendChild(tdElement);
  }
  table.appendChild(trElement);
};

var pikePlace = new CampCoffee('Pike Place Market', 14, 34, 1.2, 0.34);
var capitolHill = new CampCoffee('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new CampCoffee('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new CampCoffee('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirport = new CampCoffee('SeaTac Airport', 28, 44, 1.1, 0.41);

function renderAllBeans() {
  tableHeadings('Daily Location ', 'beans-table');
  for (var i = 0; i < coffeeLocations.length; i++) {
    coffeeLocations[i].renderBeanRow();
  }
  totalRow('beans-table');
}

function renderAllBarista() {
  var table = document.getElementById('baristas-table');
  tableHeadings('', 'baristas-table');
  for (var i = 0; i < coffeeLocations.length; i++) {
    coffeeLocations[i].renderBaristaRow();
  }
  totalRow('baristas-table');
}

function tableHeadings (title, id) {
  var table = document.getElementById(id);
  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);
  thElement = document.createElement('th');
  thElement.textContent = title + 'Total';
  trElement.appendChild(thElement);
  for (var i = 0; i < hours.length; i++) {
    thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  table.appendChild(trElement);
};

function totalRow (id){
  var table = document.getElementById(id);
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Total';
  trElement.appendChild(tdElement);
  tdElement = document.createElement('td');
  tdElement.textContent = Math.ceil(total);
  trElement.appendChild(tdElement);
  for (var i = 0; i < totals.length; i++) {
    tdElement = document.createElement('td');
    tdElement.textContent = totals[i];
    trElement.appendChild(tdElement);
  }
  table.appendChild(trElement);
}

function clearTotals() {
  total = 0;
  totals = [0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0];
}

function calculateData() {
  for (var i = 0; i < coffeeLocations.length; i++) {
    coffeeLocations[i].calcCustomersPerHour(coffeeLocations[i].minCustomersHour, coffeeLocations[i].maxCustomersHour);
    coffeeLocations[i].calcTotalCupsPerHour();
    coffeeLocations[i].calcTotalPoundsPerHour();
    coffeeLocations[i].calcHourlyBeans();
    coffeeLocations[i].calcBaristaHours();
    console.log(coffeeLocations[i]);
  }
}

function handleLocationSubmit(event) {
  event.preventDefault();
  if (!event.target.locationInput.value || !event.target.minCustomersHour.value || !event.target.maxCustomersHour.value || !event.target.cupsPerCustomer.value || !event.target.packagedLbsPerCustomer.value) {
    return alert('Fields can not be empty');
  }
  var newLocation = new CampCoffee(event.target.locationInput.value, event.target.minCustomersHour.value, event.target.maxCustomersHour.value, event.target.cupsPerCustomer.value, event.target.packagedLbsPerCustomer.value);
  event.target.locationInput.value = null;
  event.target.minCustomersHour.value = null;
  event.target.maxCustomersHour.value = null;
  event.target.cupsPerCustomer.value = null;
  event.target.packagedLbsPerCustomer.value = null;

  var table = document.getElementById('beans-table');
  table.innerHTML = '';
  table = document.getElementById('baristas-table');
  table.innerHTML = '';
  renderAll();
}

function renderAll() {
  calculateData();
  renderAllBeans();
  clearTotals();
  renderAllBarista();
}
inputForm.addEventListener('submit', handleLocationSubmit);

renderAll();

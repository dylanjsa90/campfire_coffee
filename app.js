var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm',
'2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  totalPackagedBeansPerHour: [],
  customersPerHour: [],
  totalCupsPerHour: [],
  totalPoundsOfBeans: 0,
  totalPoundsOfPackagedBeans: 0,
  dailyCustomerTotal: 0,
  dailyCupsTotal: 0,

  calcCustomersPerHour: function(min, max) {
    for (var i = 0; i < hours.length; i++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.dailyCustomerTotal += customers;
      this.customersPerHour.push(customers);
    }
  },

  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    calcTotalCupsPerHour();
    calcTotalPoundsPerHour();
    calcTotalBeansFromCups();
    // call all other methods that calcuate data
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i ++) {
      var liElement = document.createElement('li');
      liElement.textContext = this.customersPerHour[i];
      ulElement.appendChild(liElement);
    }
  },

  calcTotalCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = (this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.dailyCupsTotal += beans;
      this.totalCupsPerHour.push(beans);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
      this.totalPoundsOfPackagedBeans += beans;
      this.totalPackagedBeansPerHour.push(beans);
    }
  },

  calcTotalBeansFromCups: function() {
    this.totalPoundsOfBeans += (this.dailyCupsTotal / 16);
  }
};

pikePlace.render();

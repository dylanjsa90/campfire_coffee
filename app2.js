var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  beanTotalPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  poundPackagesPerHour: [],
  packagesNeededForCupsPerHour: [],
  beansNeededForCups: 0,
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
  },
  calcTotalCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var totalCups = Math.round((this.customersPerHour[i] * this.avgCupsPerCustomer) * 10) / 10;
      this.dailyCupsTotal += totalCups;
      this.cupsPerHour.push(totalCups);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
      this.dailyPoundPackagesTotal += beans;
      this.poundPackagesPerHour.push(Math.round(beans * 10) / 10);
      this.dailyBeansNeeded += beans;

    }
  },
  calcHourlyBeans: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.poundPackagesPerHour[i] + this.packagesNeededForCupsPerHour[i];
      this.beanTotalPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
    }
  },

  calcPackagesNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      this.packagesNeededForCupsPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
      this.beansNeededForCups += beans;
    }
  },

  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcTotalCupsPerHour();
    pikePlace.calcPackagesNeededForCupsPerHour();
    pikePlace.calcTotalPoundsPerHour();
    pikePlace.calcHourlyBeans();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.beanTotalPerHour[i].toFixed(1) + ' lbs [' +
      this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.packagesNeededForCupsPerHour[i].toFixed(1) + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);

    }
    var liTotalCustomers = document.createElement('li');
    liTotalCustomers.textContent = 'Total customers at ' + pikePlace.locationName + ': ' + Math.ceil(pikePlace.dailyCustomersTotal);
    ulElement.appendChild(liTotalCustomers);
    var liCupTotal = document.createElement('li');
    liCupTotal.textContent = 'Total cups sold at ' + pikePlace.locationName + ': ' + Math.ceil(pikePlace.dailyCupsTotal);
    ulElement.appendChild(liCupTotal);
    var liPoundPackagesTotal = document.createElement('li');
    liPoundPackagesTotal.textContent = 'Total pound packages sold at ' + pikePlace.locationName + ': ' + pikePlace.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liPoundPackagesTotal);
    var liBeanTotal = document.createElement('li');
    liBeanTotal.textContent = 'Total pounds of beans needed at ' + pikePlace.locationName + ': ' + Math.ceil(pikePlace.dailyBeansNeeded);
    ulElement.appendChild(liBeanTotal);
  }
};

var capitolHill = {
  locationName: 'Capitol Hill',
  minCustomersHour: 12,
  maxCustomersHour: 28,
  avgCupsPerCustomer: 3.2,
  avgPoundsPerCustomer: 0.03,
  beanTotalPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  poundPackagesPerHour: [],
  packagesNeededForCupsPerHour: [],
  beansNeededForCups: 0,
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
  },
  calcTotalCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var totalCups = Math.round((this.customersPerHour[i] * this.avgCupsPerCustomer) * 10) / 10;
      this.dailyCupsTotal += totalCups;
      this.cupsPerHour.push(totalCups);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
      this.poundPackagesPerHour.push(Math.round(beans * 10) / 10);
      this.dailyBeansNeeded += beans;

      this.dailyPoundPackagesTotal += beans;
    }
  },
  calcHourlyBeans: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.poundPackagesPerHour[i] + this.packagesNeededForCupsPerHour[i];
      this.beanTotalPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
    }
  },

  calcPackagesNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      this.packagesNeededForCupsPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
      this.beansNeededForCups += beans;
    }
  },

  render: function() {
    capitolHill.calcCustomersPerHour(capitolHill.minCustomersHour, capitolHill.maxCustomersHour);
    capitolHill.calcTotalCupsPerHour();
    capitolHill.calcPackagesNeededForCupsPerHour();
    capitolHill.calcTotalPoundsPerHour();
    capitolHill.calcHourlyBeans();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('capitol');
    for (var i = 0; i < hours.length; i++) {
    // create a <li>
    // give that <li> content
    // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.beanTotalPerHour[i].toFixed(1) + ' lbs [' +
      this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.packagesNeededForCupsPerHour[i].toFixed(1) + ' lbs), ' + this.poundPackagesPerHour[i].toFixed(1) + ' lbs to-go]';
      ulElement.appendChild(liElement);

    }
    var liTotalCustomers = document.createElement('li');
    liTotalCustomers.textContent = 'Total customers at ' + capitolHill.locationName + ': ' + Math.ceil(capitolHill.dailyCustomersTotal);
    ulElement.appendChild(liTotalCustomers);
    var liCupTotal = document.createElement('li');
    liCupTotal.textContent = 'Total cups sold at ' + capitolHill.locationName + ': ' + Math.ceil(capitolHill.dailyCupsTotal);
    ulElement.appendChild(liCupTotal);
    var liPoundPackagesTotal = document.createElement('li');
    liPoundPackagesTotal.textContent = 'Total pound packages sold at ' + capitolHill.locationName + ': ' + capitolHill.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liPoundPackagesTotal);
    var liBeanTotal = document.createElement('li');
    liBeanTotal.textContent = 'Total pounds of beans needed at ' + capitolHill.locationName + ': ' + capitolHill.dailyBeansNeeded.toFixed(1);
    ulElement.appendChild(liBeanTotal);
  }
};

var seattlePublicLibrary = {
  locationName: 'Seattle Public Library',
  minCustomersHour: 9,
  maxCustomersHour: 45,
  avgCupsPerCustomer: 2.6,
  avgPoundsPerCustomer: 0.02,
  beanTotalPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  poundPackagesPerHour: [],
  packagesNeededForCupsPerHour: [],
  beansNeededForCups: 0,
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
  },
  calcTotalCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var totalCups = this.customersPerHour[i] * this.avgCupsPerCustomer;
      this.dailyCupsTotal += totalCups;
      this.cupsPerHour.push(totalCups);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
      this.dailyPoundPackagesTotal += beans;
      this.poundPackagesPerHour.push(Math.round(beans * 10) / 10);
      this.dailyBeansNeeded += beans;

    }
  },
  calcHourlyBeans: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.poundPackagesPerHour[i] + this.packagesNeededForCupsPerHour[i];
      this.beanTotalPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
    }
  },

  calcPackagesNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.cupsPerHour[i] / 16;
      this.packagesNeededForCupsPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
      this.beansNeededForCups += beans;
    }
  },

  render: function() {
    seattlePublicLibrary.calcCustomersPerHour(seattlePublicLibrary.minCustomersHour, seattlePublicLibrary.maxCustomersHour);
    seattlePublicLibrary.calcTotalCupsPerHour();
    seattlePublicLibrary.calcPackagesNeededForCupsPerHour();
    seattlePublicLibrary.calcTotalPoundsPerHour();
    seattlePublicLibrary.calcHourlyBeans();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('spl');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.beanTotalPerHour[i] + ' lbs [' +
      this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.packagesNeededForCupsPerHour[i].toFixed(1) + ' lbs), ' + this.poundPackagesPerHour[i].toFixed(1) + ' lbs to-go]';
      ulElement.appendChild(liElement);

    }
    var liTotalCustomers = document.createElement('li');
    liTotalCustomers.textContent = 'Total customers at ' + seattlePublicLibrary.locationName + ': ' + seattlePublicLibrary.dailyCustomersTotal.toFixed(1);
    ulElement.appendChild(liTotalCustomers);
    var liCupTotal = document.createElement('li');
    liCupTotal.textContent = 'Total cups sold at ' + seattlePublicLibrary.locationName + ': ' + seattlePublicLibrary.dailyCupsTotal.toFixed(1);
    ulElement.appendChild(liCupTotal);
    var liPoundPackagesTotal = document.createElement('li');
    liPoundPackagesTotal.textContent = 'Total pound packages sold at ' + seattlePublicLibrary.locationName + ': ' + seattlePublicLibrary.dailyPoundPackagesTotal.toFixed(1);
    ulElement.appendChild(liPoundPackagesTotal);
    var liBeanTotal = document.createElement('li');
    liBeanTotal.textContent = 'Total pounds of beans needed at ' + seattlePublicLibrary.locationName + ': ' + seattlePublicLibrary.dailyBeansNeeded.toFixed(1);
    ulElement.appendChild(liBeanTotal);
  }
};

var southLakeUnion = {
  locationName: 'South Lake Union',
  minCustomersHour: 5,
  maxCustomersHour: 18,
  avgCupsPerCustomer: 1.3,
  avgPoundsPerCustomer: 0.04,
  beanTotalPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  poundPackagesPerHour: [],
  packagesNeededForCupsPerHour: [],
  beansNeededForCups: 0,
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
  },
  calcTotalCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var totalCups = Math.round((this.customersPerHour[i] * this.avgCupsPerCustomer) * 10) / 10;
      this.dailyCupsTotal += totalCups;
      this.cupsPerHour.push(totalCups);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
      this.dailyPoundPackagesTotal += beans;
      this.poundPackagesPerHour.push(Math.round(beans * 10) / 10);
      this.dailyBeansNeeded += beans;

    }
  },
  calcHourlyBeans: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.round(this.poundPackagesPerHour[i] + this.packagesNeededForCupsPerHour[i] * 10) / 10;
      this.beanTotalPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
    }
  },

  calcPackagesNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.round((this.cupsPerHour[i] / 16) * 10) / 10;
      this.packagesNeededForCupsPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
      this.beansNeededForCups += beans;
    }
  },

  render: function() {
    southLakeUnion.calcCustomersPerHour(southLakeUnion.minCustomersHour, southLakeUnion.maxCustomersHour);
    southLakeUnion.calcTotalCupsPerHour();
    southLakeUnion.calcPackagesNeededForCupsPerHour();
    southLakeUnion.calcTotalPoundsPerHour();
    southLakeUnion.calcHourlyBeans();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('slu');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.beanTotalPerHour[i] + ' lbs [' +
      this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + Math.ceil(this.packagesNeededForCupsPerHour[i]) + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);

    }
    var liTotalCustomers = document.createElement('li');
    liTotalCustomers.textContent = 'Total customers at ' + southLakeUnion.locationName + ': ' + Math.ceil(southLakeUnion.dailyCustomersTotal);
    ulElement.appendChild(liTotalCustomers);
    var liCupTotal = document.createElement('li');
    liCupTotal.textContent = 'Total cups sold at ' + southLakeUnion.locationName + ': ' + Math.ceil(southLakeUnion.dailyCupsTotal);
    ulElement.appendChild(liCupTotal);
    var liPoundPackagesTotal = document.createElement('li');
    liPoundPackagesTotal.textContent = 'Total pound packages sold at ' + southLakeUnion.locationName + ': ' + Math.ceil(southLakeUnion.dailyPoundPackagesTotal);
    ulElement.appendChild(liPoundPackagesTotal);
    var liBeanTotal = document.createElement('li');
    liBeanTotal.textContent = 'Total pounds of beans needed at ' + southLakeUnion.locationName + ': ' + Math.ceil(southLakeUnion.dailyBeansNeeded);
    ulElement.appendChild(liBeanTotal);
  }
};
var seaTacAirport = {
  locationName: 'Sea-Tac Airport',
  minCustomersHour: 5,
  maxCustomersHour: 18,
  avgCupsPerCustomer: 1.3,
  avgPoundsPerCustomer: 0.04,
  beanTotalPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  poundPackagesPerHour: [],
  packagesNeededForCupsPerHour: [],
  beansNeededForCups: 0,
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,
  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
      this.dailyCustomersTotal += customers;
    }
  },
  calcTotalCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var totalCups = Math.round((this.customersPerHour[i] * this.avgCupsPerCustomer) * 10) / 10;
      this.dailyCupsTotal += totalCups;
      this.cupsPerHour.push(totalCups);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = this.customersPerHour[i] * this.avgPoundsPerCustomer;
      this.dailyPoundPackagesTotal += beans;
      this.poundPackagesPerHour.push(Math.round(beans * 10) / 10);
      this.dailyBeansNeeded += beans;

    }
  },
  calcHourlyBeans: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.round(this.poundPackagesPerHour[i] + this.packagesNeededForCupsPerHour[i] * 10) / 10;
      this.beanTotalPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
    }
  },

  calcPackagesNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.round((this.cupsPerHour[i] / 16) * 10) / 10;
      this.packagesNeededForCupsPerHour[i] = beans;
      this.dailyBeansNeeded += beans;
      this.beansNeededForCups += beans;
    }
  },

  render: function() {
    seaTacAirport.calcCustomersPerHour(seaTacAirport.minCustomersHour, seaTacAirport.maxCustomersHour);
    seaTacAirport.calcTotalCupsPerHour();
    seaTacAirport.calcPackagesNeededForCupsPerHour();
    seaTacAirport.calcTotalPoundsPerHour();
    seaTacAirport.calcHourlyBeans();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('seatac');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = hours[i] + ': ' + this.beanTotalPerHour[i] + ' lbs [' +
      this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + Math.ceil(this.packagesNeededForCupsPerHour[i]) + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);

    }
    var liTotalCustomers = document.createElement('li');
    liTotalCustomers.textContent = 'Total customers at ' + seaTacAirport.locationName + ': ' + Math.ceil(seaTacAirport.dailyCustomersTotal);
    ulElement.appendChild(liTotalCustomers);
    var liCupTotal = document.createElement('li');
    liCupTotal.textContent = 'Total cups sold at ' + seaTacAirport.locationName + ': ' + Math.ceil(seaTacAirport.dailyCupsTotal);
    ulElement.appendChild(liCupTotal);
    var liPoundPackagesTotal = document.createElement('li');
    liPoundPackagesTotal.textContent = 'Total pound packages sold at ' + seaTacAirport.locationName + ': ' + Math.ceil(seaTacAirport.dailyPoundPackagesTotal);
    ulElement.appendChild(liPoundPackagesTotal);
    var liBeanTotal = document.createElement('li');
    liBeanTotal.textContent = 'Total pounds of beans needed at ' + seaTacAirport.locationName + ': ' + Math.ceil(seaTacAirport.dailyBeansNeeded);
    ulElement.appendChild(liBeanTotal);
  }
};

pikePlace.render();
capitolHill.render();
seattlePublicLibrary.render();
southLakeUnion.render();
seaTacAirport.render();

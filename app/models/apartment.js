'use strict';


//aptComplex database
var aptComplex = global.mongodb.collection('units');
var _ = require('lodash');



function Apartment(name){
	this.name 		= name;
	this.rooms      = [];
	this.renters    = [];
}

/* INSTANCE METHODS */

Apartment.prototype.area = function() {

	var sum = 0;

	for(var i = 0; i < this.rooms.length; i++){
		sum += this.rooms[i].area();
	}
	return sum;
}


Apartment.prototype.cost = function() {

	var sum = 0;

	for(var i = 0; i < this.rooms.length; i++){
		sum += this.rooms[i].cost();
	}
	return sum;
}


Apartment.prototype.bedrooms = function() {

	var sum = 0;

	for(var i = 0; i < this.rooms.length; i++){
		if(this.rooms[i].name === 'bedroom'){
			sum++;
		}
	}
	return sum;
}


Apartment.prototype.isAvailable = function() {
	//this is the same as saying if(this.bedrooms() !== this.renters.length) { return true; }
	return this.bedrooms() !== this.renters.length;
}


Apartment.prototype.purgeEvicted = function() {
	//The .slice() method removes 1 from array, length becomes shorter and
	//it ends up not looping through the entire array.
	for(var i = this.renters.length - 1; i >= 0; i--){
		if(this.renters[i].isEvicted){
			this.renters.splice(i, 1);
		}
	}
}


Apartment.prototype.collectRent = function() {
	for(var i = 0; i < this.renters.length; i++){
		this.renters[i].payRent(this.cost() / this.renters.length);
	}

	this.purgeEvicted();
}

Apartment.prototype.save = function(cb){
  aptComplex.save(this, function(err, obj){
    cb();
  });
};



/* CLASS METHODS */

Apartment.find = function(cb){
	aptComplex.find().toArray(function(err, obj){
		cb(obj);
	});
};

module.exports = Apartment;
'use strict';


function Apartment(name){
	this.name 		= name;
	this.rooms      = [];
	this.renters    = [];
}


Apartment.prototype.area = function() {

	var sum = 0;

	for(var i = 0; i < this.rooms.length; i++){
		sum += this.rooms[i].area();
	}
	console.log('#area: ' + sum);
	return sum;
}


Apartment.prototype.cost = function() {

	var sum = 0;

	for(var i = 0; i < this.rooms.length; i++){
		sum += this.rooms[i].cost();
	}
	console.log('#cost: ' + sum);
	return sum;
}

Apartment.prototype.bedrooms = function() {

	var sum = 0;

	for(var i = 0; i < this.rooms.length; i++){
		if(this.rooms[i].name === 'bedroom'){
			sum++;
		}
	}
	console.log('#bedrooms: ' + sum);
	return sum;
}

Apartment.prototype.isAvailable = function() {
	//this is the same as saying if(this.bedrooms() !== this.renters.length) { return true; }
	return this.bedrooms() !== this.renters.length;
}

Apartment.prototype.purgeEvicted = function() {
	for(var i = 0; i < this.renters.length; i++){
		if(this.renters[i].isEvicted){
			this.renters.splice(i, 1);
		}
	}
}


module.exports = Apartment;
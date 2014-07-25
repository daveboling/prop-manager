/*jshint expr:true*/
/*global describe, it*/
'use strict';



var expect = require('chai').expect;
var Renter = require('../../app/models/renter');
var Room   = require('../../app/models/room');
var Apartment = require('../../app/models/apartment');

describe('Apartment', function() {
	//before and beforeEach goes here



	describe('contructor', function() {
		it('should create an apartment with empty rooms and renters', function(){
			var apt = new Apartment('A1');

			expect(apt).to.be.instanceof(Apartment);
			expect(apt.name).to.equal('A1');
			expect(apt.rooms.length).to.equal(0);
			expect(apt.renters.length).to.equal(0);
		});
	});



	describe('#area', function(){
		it('should display the total area of all rooms in a given unit', function(){
			var apt = new Apartment('A1');

			apt.rooms = [
			new Room('bedroom', 30, 20),
			new Room('kitchen', 20, 20),
			new Room('bedroom', 10, 20),
			new Room('bathroom', 10, 10)
			];


			var area = apt.area();

			expect(area).to.equal(1300);
		});
	});



	describe('#cost', function(){
		it('should display the total cost of all rooms in a given unit', function(){
			var apt = new Apartment('A1');

			apt.rooms = [
			new Room('bedroom', 30, 20),
			new Room('kitchen', 20, 20),
			new Room('bedroom', 10, 20),
			new Room('bathroom', 10, 10)
			];


			var cost = apt.cost();
			
			expect(cost).to.equal(6500);
		});
	});



	describe('#bedrooms', function(){
		it('should display the total number of bedrooms in a unit', function(){
			var apt = new Apartment('A1');

			apt.rooms = [
			new Room('bedroom', 30, 20),
			new Room('kitchen', 20, 20),
			new Room('bedroom', 10, 20),
			new Room('bathroom', 10, 10)
			];


			var bedrooms = apt.bedrooms();
			
			expect(bedrooms).to.equal(2);
		});
	});
	


	describe('#isAvailable', function(){
		it('should display room available', function(){
			var apt = new Apartment('A1');

			apt.rooms = [
			new Room('bedroom', 30, 20),
			new Room('kitchen', 20, 20),
			new Room('bedroom', 10, 20),
			new Room('bathroom', 10, 10)
			];

			apt.renters = [
			new Renter('laura', '30', 'female', 'spartan' ),
			];

			var available= apt.isAvailable();
			
			expect(available).to.equal(true);
		});
		it('should display room not available', function(){
			var apt = new Apartment('A1');

			apt.rooms = [
			new Room('bedroom', 30, 20),
			new Room('kitchen', 20, 20),
			new Room('bedroom', 10, 20),
			new Room('bathroom', 10, 10)
			];

			apt.renters = [
			new Renter('laura', '30', 'female', 'spartan' ),
			new Renter('jack', '53', 'male', 'coder' ),
			];


			var available= apt.isAvailable();
			
			expect(available).to.equal(false);
		});
	});



	describe('#purgeEvicted', function(){
		it('should display room available', function(){
			var apt = new Apartment('A1');

			apt.rooms = [
			new Room('bedroom', 30, 20),
			new Room('kitchen', 20, 20),
			new Room('bedroom', 10, 20),
			new Room('bathroom', 10, 10)
			];

			apt.renters = [
			new Renter('laura', '30', 'female', 'spartan' ),
			];


			apt.renters[0].isEvicted = true; //.isEvicted = true;

			apt.purgeEvicted();
			
			expect(apt.renters.length).to.equal(0);
		});
	});




});
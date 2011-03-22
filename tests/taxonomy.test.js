/**
 * @author Administrator
 */
var assert = require('assert'),
    childProcess = require('child_process'),
    http = require('http'),
    path = require('path'),
    sys = require('sys'),
    cwd = process.cwd(),
    fs = require('fs'),
    tax = require('../lib/taxonomy');
    

/*
var sections = {};

*/
exports['test name'] = function(){
    assert.equal(tax.moduleName(), "taxonomy");
};

var masterTerms = ['News', 'Sports', 'Opinion', 'Recess', 'Towerview'];

exports['test insert and get'] = function() {
	// no term should exist at this point
	
	
	var expectedObject = {name: null, parent: null, children: []};
	
	// insert and fetch master terms
	for (var i = 0; i < masterTerms.length; i++) {
		expectedObject.name = masterTerms[i];
		assert.equal(tax.existTerm(expectedObject.name), false);
		assert.eql(tax.insertTerm(masterTerms[i]), expectedObject);
		assert.eql(tax.getTerm(masterTerms[i]), expectedObject);
	}
};

exports['test duplicate insert'] = function() {
	for (var i = 0; i < masterTerms.length; i++) {
		assert.equal(tax.existTerm(masterTerms[i]), true);
		assert.equal(tax.insertTerm(masterTerms[i]), false);
	}
};

exports['test child term insert'] = function() {
	var name = 'Local National';
	var parent = 'News';
	var expectedParent = {name: parent, parent: null, children: [name]};
	var expectedChild = {name: name, parent: parent, children: []};
	
	assert.eql(tax.insertTerm(name, parent), expectedChild);
	assert.eql(tax.getTerm(parent), expectedParent);
	
	var name2 = 'University';
	var parent2 = 'News';
	var expectedParent2 = {name: parent2, parent: null, children: [name, name2]};
	var expectedChild2 = {name: name2, parent: parent2, children: []};
	
	assert.eql(tax.insertTerm(name2, parent2), expectedChild2);
	assert.eql(tax.getTerm(parent2), expectedParent2);
	
	// insert child of child
	var child_level2 = 'Arts';
	var parent_level2 = 'Local National';
	var expectedParent_level2 = {name: parent_level2, parent: "News", children: [child_level2]};
	var expectedChild_level2 = {name: child_level2, parent: parent_level2, children: []};
	assert.eql(tax.insertTerm(child_level2, parent_level2), expectedChild_level2);
	assert.eql(tax.getTerm(parent_level2), expectedParent_level2);
};

exports['test retrieval of hierarchy'] = function() {
	// Arts is under News=>Local National=>Arts
	var expectedHierarchy;
	expectedHierarchy = ["Arts", "Local National", "News"];
	assert.eql(tax.getHierarchy("Arts"), expectedHierarchy);
	
	expectedHierarchy = ["University", "News"];
	assert.eql(tax.getHierarchy("University"), expectedHierarchy);
	
	expectedHierarchy = ["News"];
	assert.eql(tax.getHierarchy("News"), expectedHierarchy);
	
	expectedHierarchy = ["Sports"];
	assert.eql(tax.getHierarchy("Sports"), expectedHierarchy);
	
	expectedHierarchy = false;
	assert.eql(tax.getHierarchy("Does not exist"), expectedHierarchy);
}

exports['test child addition'] = function() {
	//tax.addTerm()
	tax.addChild("Local National", "")
}

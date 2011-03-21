var taxonomy = {};
var exports = module.exports = taxonomy;

var taxonomy_tree = {};

function taxonomy_term(name, parent, children) {
	this.name = name;
	this.parent = parent;
	this.children = children;
}

taxonomy.insertTerm = function (name, parent, children) {
	var termObject = {};
	if (name === undefined || name === null || name === '' || taxonomy_tree[name] !== undefined) {
		return false;
	}
	
	termObject.name = name;
	
	if (children === undefined) {
		termObject.children = [];
	} else {
		termObject.children = children;
	}
	
	if (parent === undefined) {
		termObject.parent = null;
	} else {
		var parentObject = taxonomy.getTerm(parent);
		
		if (parentObject === undefined) {
			console.log("Attempting to insert term with a parent that doesn't exists");
			return false;
		}
		termObject.parent = parent;
		parentObject.children.push(termObject.name);
	}
	

	
	taxonomy_tree[name] = termObject;
	return termObject;
}

taxonomy.moduleName = function() {
	return "taxonomy";
}

taxonomy.getTerm = function(termName) {
	return taxonomy_tree[termName];
}

 
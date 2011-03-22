var taxonomy = {};
var exports = module.exports = taxonomy;

var taxonomy_tree = {};

function taxonomy_term(name, parent, children) {
	this.name = name;
	this.parent = parent;
	this.children = children;
};

taxonomy.insertTerm = function (name, parent, children) {
	var termObject = {};
	if (name === undefined || name === null || name === '' || 
		taxonomy.existTerm(name)) {
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
		taxonomy.addChild(parentObject.name, termObject.name);
		parentObject.children.push(termObject.name);
	}
	
	taxonomy_tree[name] = termObject;
	return termObject;
};

taxonomy.moduleName = function() {
	return "taxonomy";
};

taxonomy.getTerm = function(termName) {
	if (taxonomy.existTerm(termName)) {
		return taxonomy_tree[termName];
	} else {
		return false;
	}
};

taxonomy.getHierarchy = function(termName) {
	if (!taxonomy.existTerm(termName)) {
		return false;
	}
	
	var currentTerm = taxonomy.getTerm(termName);
	
	if (!currentTerm) {
		return false;
	}
	
	var hierarchy = [currentTerm.name];
	while (currentTerm.parent !== null) {
		currentTerm = taxonomy.getTerm(currentTerm.parent);
		hierarchy.push(currentTerm.name);
	}
	
	return hierarchy;
}

taxonomy.existTerm = function(termName) {
	if (termName === undefined || taxonomy_tree[termName] === undefined) {
		return false;
	} else {
		return true;
	}
}

taxonomy.updateName = function(oldTermName, newTermName) {
	var termObject = taxonomy.getTerm(oldTermName);
	if (!termObject) {
		return false;
	}
	
	// change own name and key
	termObject.name = newTermName;
	taxonomyTree[oldTermName] = undefined;
	taxonomyTree[newTermName] = termObject;
	
	// update parent references
	taxonomy.removeChild(termObject.parent, termName);
	taxonomy.addChild(termObject.parent, newTermName);
	// update child references
	for (var i = 0; i < termObject.children.length; i++) {
		taxonomy.updateParent(termObject.children[i], newTermName);
	}
}
 
taxonomy.updateParent = function(termName, newParentName) {
	if (taxonomy.existTerm(termName) && taxonomy.existTerm(newParentName)) {
		taxonomyTree[termName].parent = newParentName;
		return true;
	} else {
		return false;
	}
}

taxonomy.addChild = function(termName, newChildName) {
	if (taxonomy.existTerm(termName) && taxonomy.existTerm(newChildName)) {
		taxonomyTree[termName].children.push(newChildName);
		return true;
	} else {
		return false;
	}
}

taxonomy.removeChild = function (termName, childName) {
	var children = taxonomy.getTerm(termName);
	var childIndex = null;
	if (taxonomy.existTerm(termName)) {
		for (var i = 0; i < children.length; i++) {
			if (children[i] == childName) {
				taxonomyTree[termName].children.slice(i, 1);
				console.log(taxonomyTree[termName]);
			}
		}
	}
	return false;
}

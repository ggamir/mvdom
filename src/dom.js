'use strict';

module.exports = {
	first: first, 
	all: all, 
	closest: closest,
	next: next,
	prev: prev
};

// --------- DOM Query Shortcuts --------- //

// Shortcut for .querySelector
// return the first element matching the selector from this el (or document if el is not given)
function first(el, selector){
	return _execQuerySelector(false, el, selector);
}

// Shortcut for .querySelectorAll
// return an nodeList of all of the elements element matching the selector from this el (or document if el is not given)
function all(el, selector){
	return _execQuerySelector(true, el, selector);
}

// return the first element next to the el matching the selector
// return null if not found.
function next(el, selector){
	return _sibling(true, el, selector);
}

function prev(el, selector){
	return _sibling(false, el, selector);
}

// return the element closest in the hierarchy (up), including this el, matching this selector
// return null if not found
function closest(el, selector){
	var tmpEl = el;

	// use "!=" for null and undefined
	while (tmpEl != null && tmpEl !== document){
		if (tmpEl.matches(selector)){
			return tmpEl;
		}
		tmpEl = tmpEl.parentElement;		
	}
	return null;
}

// --------- /DOM Query Shortcuts --------- //

function _sibling(next, el, selector){
	var sibling = (next)?"nextSibling":"previousSibling";

	var tmpEl = (el)?el[sibling]:null;

	// use "!=" for null and undefined
	while (tmpEl != null && tmpEl !== document){
		if (tmpEl.matches && tmpEl.matches(selector)){
			return tmpEl;
		}
		tmpEl = tmpEl[sibling];
	}
	return null;
}


// util: querySelector[All] wrapper
function _execQuerySelector(all, el, selector){
	// if el is null or undefined, means we return nothing. 
	if (typeof el === "undefined" || el === null){
		return null;
	}
	// if selector is undefined, it means we select from document and el is the document
	if (typeof selector === "undefined"){
		selector = el;
		el = document;		
	}
	return (all)?el.querySelectorAll(selector):el.querySelector(selector);
}

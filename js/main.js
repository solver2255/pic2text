;( function() {
	"use strict";

	/* Utils */

	var d = document;
	var w = window;

	//document.getElementById( arg )
	d.gBI = function( arg ) { return d.getElementById( arg ); }

	//document.getElementsByTagName( arg )
	d.gEBTN = function( arg ) { return d.getElementsByTagName( arg ); }
	
	d.qS = function( arg ) { return d.querySelector( arg ); }

	d.qSA = function( arg ) { return d.querySelectorAll( arg ); }

	Element.prototype.qS = function( arg ) { return this.querySelector( arg ); }

	/* End Utils */
	console.log( d.qS("BODY").qS("#main-menu") );
}());
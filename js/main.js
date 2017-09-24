;( function() {
	"use strict";

	/* Utils */

	var d = document;
	var w = window;

	d.gBI = function( arg ) { return d.getElementById( arg ); }

	d.gEBTN = function( arg ) { return d.getElementsByTagName( arg ); }
	
	d.qS = function( arg ) { return d.querySelector( arg ); }

	d.qSA = function( arg ) { return d.querySelectorAll( arg ); }

	Element.prototype.qS = function( arg ) { return this.querySelector( arg ); }

	/* End Utils */

	//pic2text init
	pic2text.canvas = d.gBI( "canvas" );
	pic2text.init();

	//FileDropper init
	FileDropper.el = d.gBI("drop-file");
	FileDropper.callback = function( params ) {
		var data = params;
		var elem = document.createElement("img");
		elem.height = "100";
		elem.src = params.data;
		elem.title = params.name;
		//d.body.insertBefore( elem, d.qS("HEADER") );
		pic2text.pic2text( params.data );
	}
	FileDropper.MAX_FILE_SIZE = 1000000;
	FileDropper.init();


}());
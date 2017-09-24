/*
author: solver2255
*/

var pic2text = {

	canvas: null,
	ctx: null,
	image: null,
	output: [],

	init: function() {
		this.ctx = this.canvas.getContext( "2d" );
	},

	//Main algo function
	pic2text: function( imgData ) {
		this.output = [];
		this.clearCanvas();

		var This = this, image = new Image(), w, h;
		image.onload = function() {
			This.image = image;
			w = image.width;
			h = image.height;
			This.canvas.width = w;
			This.canvas.height = h;
			This.output = This.__convert();
		}

		image.src = imgData;
	},

	__convert: function() {
		this.resize( imgData, 0.5 );

		var w = parseInt( getComputedStyle( this.canvas ).width );
		var h = parseInt( getComputedStyle( this.canvas ).height );
		this.ctx.drawImage( this.image, 0, 0, w, h );

		var imgData = this.ctx.getImageData( 0, 0, w, h );

		
		
		for( var i = 0; i < imgData.data.length; i+=4 )
		{
			//console.log( imgData.data[i] );
			if( i%(w*4) == 0 ) this.output.push("<br>");

			//r
			if( imgData.data[i] > imgData.data[i+1] &&
				imgData.data[i] > imgData.data[i+2] ) {
				this.output.push("#");
				continue;
			}
			//g
			if( imgData.data[i+1] > imgData.data[i] &&
				imgData.data[i+1] > imgData.data[i+2] ) {
				this.output.push("*");
				continue;
			}
			//b
			if( imgData.data[i+2] > imgData.data[i] &&
				imgData.data[i+2] > imgData.data[i+1] ) {
				this.output.push("!");
				continue;
			}
			//eq
			if( imgData.data[i+2] == imgData.data[i+1] &&
				imgData.data[i+2] == imgData.data[i] &&
				imgData.data[i+1] == imgData.data[i+2] &&
				imgData.data[i+1] == imgData.data[i] ) {
				this.output.push("&");
				continue;
			} else {
				this.output.push("%");
				continue;
			}
			/*imgData.data[i]=255-imgData.data[i];
  			imgData.data[i+1]=255-imgData.data[i+1];
  			imgData.data[i+2]=255-imgData.data[i+2];
  			imgData.data[i+3]=255;*/
		}

		//this.ctx.putImageData( imgData, 0, 0 );

		this.render();
	},

	resize: function( data, ratio ) {
		this.clearCanvas();
		var ratio = ratio;
		var w = this.image.width*ratio;
		var h = this.image.height*ratio;
		this.canvas.width = w;
		this.canvas.height = h;
		this.ctx.drawImage( this.image , 0, 0, w, h );
		console.log( "data", data );
	},

	clearCanvas: function() {
		this.ctx.clearRect( 0, 0, 
							parseInt( getComputedStyle( this.canvas ).width ),
							parseInt( getComputedStyle( this.canvas ).height )
							);
	},

	render: function() {
		document.getElementById( "output" ).innerHTML = this.output.join('');
	},



};

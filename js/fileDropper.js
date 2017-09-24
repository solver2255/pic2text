	//FileReader
	var FileDropper = {

		el: null,
		FileReaderStatus: false,
		MAX_FILE_SIZE: 128000,
		formats: ["image"],

		init: function() {
			this.FileReaderStatus = ( 'FileReader' in window ) || false;
			if( this.FileReaderStatus == true ) {
				//el.classList.add( "FileReader" );
				var This = this;

				this.el.addEventListener( "dragenter", function() {
					This.el.classList.add("over");
				}, false );

				this.el.addEventListener( "dragover", function( event ) {
					event.stopPropagation();
					event.preventDefault();
				}, false);

				this.el.addEventListener( "dragend", function( event ) {
					event.preventDefault();
				}, false );

				this.el.addEventListener( "dragleave", function() {
					This.el.classList.remove("over");
				}, false );

				//file was dropped
				/*this.el.addEventListener( "drop", function( event ) {
					event.preventDefault();
					This.el.classList.remove("over");
					This.el.classList.add("drop");
				}, false );*/
				this.el.addEventListener( "drop", function( event ) {
					event.stopPropagation();
					event.preventDefault();

					This.el.classList.remove("over");

					var file = event.dataTransfer.files[0];

					//FileSizeError
					if( file.size >= This.MAX_FILE_SIZE ) {
						This.MaxFileSizeLimitError( file.size );
						return;
					}

					//FormatError
					for( var i in This.formats ) {
						var f = new RegExp( This.formats[i] );
						if( !file.type.match(f) ) {
							This.FormatFileError( file.type );
							return;
						}
					}

					//Reading File
					var fr = new FileReader();
					fr.onload = function( f ) {
						var params = {};
						params.data = f.target.result;
						params.name = escape( file.name );
						This.callback( params );
					}

					fr.readAsDataURL( file );

				}, false );


			} else {
				console.log("File Reader not supported");
			}
		},

		callback: function( params ) {
			console.log( params );
		},

		//Errors
		MaxFileSizeLimitError: function( size ) {
			var sizeInKb = Math.round(size/1000);
			var msg = "File Size limit exceed\nSize: "+ Math.round(size/1000) +"kb";
			console.log( msg );
		},

		FormatFileError: function( format ) {
			var msg = "File has unsupported type\nYour file type:" + format + "\nPossible formats: "+ this.formats;
			console.log( msg );
		}

	};
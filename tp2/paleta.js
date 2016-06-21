/****************************************
Paleta

Esta clase representa una superficie rectangular plana en el plano xy sin volumen 
****************************************/

var Paleta = Geometria.extend({
	//Se puede agregar función de escalado
	initialize: function(largo,alto,cols,rows)
	{
		this.largo = largo;
		this.alto = alto;

		this.cols = cols;
		this.rows = rows;

		Geometria.prototype.initialize.call(this);
	/*
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		var whitePixel = new Uint8Array([255, 255, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
	*/	
		this.useTexture = 0.0;
	
	},

	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLE_STRIP; //Estas tres definiciones tienen que estar aca
		this.tangent_buffer = []; //Esta en null por defecto

		var minX = -(this.largo / 2);
		var maxX = +(this.largo / 2);
		var deltaX = (maxX - minX) / this.rows;
		
		var minY = -(this.alto / 2);
		var maxY = +(this.alto / 2);
		var deltaY = (maxY - minY) / this.cols;

		var puntoZ = 0;
		var puntoX = minX;
		var puntoY;
		
		var tangente = [0,1,0];
		var normal = [0,0,-1];
		
					
		for (var row = 0; row < this.rows; row++)
		{
			puntoY = minY;
			for (var col = 0; col < this.cols; col++)
			{
				this.position_buffer.push(puntoX);
				this.position_buffer.push(puntoY);
				this.position_buffer.push(puntoZ);

				this.color_buffer.push(0.1);
				this.color_buffer.push(0.5); //Color default
				this.color_buffer.push(0.1);

				this.tangent_buffer.push(tangente[0]);
				this.tangent_buffer.push(tangente[1]);
				this.tangent_buffer.push(tangente[2]);

				this.normals_buffer.push(normal[0]);
				this.normals_buffer.push(normal[1]);
				this.normals_buffer.push(normal[2]);

				this.texture_coord_buffer.push(0.0);
				this.texture_coord_buffer.push(0.0);
			
				puntoY += deltaY;
			}
			puntoX += deltaX;
		}
	
	}
})
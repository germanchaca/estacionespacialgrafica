/****************************************
SupBarrido
Esta clase abstracta representa a una superficie generada a partir de un poligono plano que se arrastra por un recorrido 3D
****************************************/

var SupBarrido = Geometria.extend({
	//Se puede agregar función de escalado
	initialize: function(poligono, puntosRecorrido, basesRecorrido)
	{
		//Se supone como la base del poligono la canónica
		this.poligono = poligono; //objeto poligono
		this.puntosRecorrido = puntosRecorrido.slice(0); //el primer punto y el último deben ser iguales? Solo si la superficie es cerrada
		
		this.basesRecorrido = basesRecorrido.slice(0); //basesRecorrido = [[b1,b2,b3],[b4,b5,b6],....] cada b es un vector
		
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

		this.cols = this.poligono.puntos.length;
		this.rows = this.puntosRecorrido.length;
		
		var punto, tangente, normal;
		var poligonoTransformado;
		var puntoRecorrido;
		var baseRecorrido;
		var puntos,tangentes,normales
					
		for (var row = 0; row < this.rows; row++)
		{
			puntoRecorrido = this.puntosRecorrido[row];
			baseRecorrido = this.basesRecorrido[row];
			poligonoTransformado = this.poligono.obtenerPoligonoTransformado(puntoRecorrido, baseRecorrido);
			puntos = poligonoTransformado.puntos;
			tangentes = poligonoTransformado.tangentes;
			normales = poligonoTransformado.normales;
			for (var col = 0; col < this.cols; col++)
			{
				punto = puntos[col];
				this.position_buffer.push(punto[0]);
				this.position_buffer.push(punto[1]);
				this.position_buffer.push(punto[2]);

				this.color_buffer.push(0.1);
				this.color_buffer.push(0.5); //Color default
				this.color_buffer.push(0.1);

				tangente = tangentes[col];
				this.tangent_buffer.push(tangente[0]);
				this.tangent_buffer.push(tangente[1]);
				this.tangent_buffer.push(tangente[2]);

				normal = normales[col];
				this.normals_buffer.push(normal[0]);
				this.normals_buffer.push(normal[1]);
				this.normals_buffer.push(normal[2]);

				this.texture_coord_buffer.push(0.0);
				this.texture_coord_buffer.push(0.0);
			}
		}
	
	}
})
/****************************************
SupBarrido
Esta clase abstracta representa a una superficie generada a partir de un poligono plano que se arrastra por un recorrido 3D
****************************************/

var SupBarrido = Geometria.extend({
	//Se puede agregar función de escalado
	initialize: function(poligono,puntosRecorrido,basesRecorrido)
	{
		//Se supone como la base del poligono la canónica
		this.poligono = poligono.slice(0); //Lista de listas (cada lista interior es un punto xyz)
		this.puntosRecorrido = puntosRecorrido.slice(0); //el primer punto y el último deben ser iguales? Solo si la superficie es cerrada
		//NORMALIZAR BASES
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

	matrizCambioDeBase: function(baseRecorrido)
	{
		var matriz = mat3.create();
		var base;
		for (var col = 0; col < baseRecorrido.length; col++)
		{
			base = baseRecorrido[col];
			for (var fil = 0; fil < base.length; fil++)
			{
				matriz[fil * baseRecorrido.length + col] = base[fil];
			}
		}
		return matriz;
	},

	transformarPuntos: function(puntos,puntoRecorrido,baseRecorrido)
	{
		var punto;
		var puntosTransformados = [];
		var puntoTransformado;
		var cambioDeBase = this.matrizCambioDeBase(baseRecorrido);
		for (var i = 0; i < puntos.length; i++)
		{
			punto = vec3.fromValues(puntos[i][0],puntos[i][1],puntos[i][2]);
			puntoTransformado = vec3.create();
			vec3.transformMat3(puntoTransformado, punto, cambioDeBase);
			//puntoTransformado = cambioDeBase * punto;
			puntoTransformado = vec3.fromValues(puntoTransformado[0]+puntoRecorrido[0], puntoTransformado[1]+puntoRecorrido[1],puntoTransformado[2]+puntoRecorrido[2]);
			puntosTransformados.push(puntoTransformado);
		}
		return puntosTransformados;
	},

	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLE_STRIP; //Estas tres definiciones tienen que estar aca
		this.tangent_buffer = []; //Esta en null por defecto

		this.cols = this.poligono.length;
		this.rows = this.puntosRecorrido.length;
		
		var punto;
		var puntos;
		var puntoRecorrido;
		var baseRecorrido;
		
		var tangente = vec3.create();
		var normal = vec3.create();
					
		for (var row = 0; row < this.rows; row++)
		{
			puntoRecorrido = this.puntosRecorrido[row];
			baseRecorrido = this.basesRecorrido[row];
			puntos = this.transformarPuntos(this.poligono, puntoRecorrido, baseRecorrido);
			for (var col = 0; col < this.cols; col++)
			{
				punto = puntos[col];
				this.position_buffer.push(punto[0]);
				this.position_buffer.push(punto[1]);
				this.position_buffer.push(punto[2]);

				this.color_buffer.push(0.1);
				this.color_buffer.push(0.5); //Color default
				this.color_buffer.push(0.1);

				var point = vec3.fromValues(punto[0], punto[1], punto[2]);
				//vec3.cross(tangente, eje, point);

				this.tangent_buffer.push(tangente[0]);
				this.tangent_buffer.push(tangente[1]);
				this.tangent_buffer.push(tangente[2]);
				
				//vec3.cross(normal, tangente ,eje);

				this.normals_buffer.push(punto[0]);
				this.normals_buffer.push(punto[1]); //MODIFICAR IMPLEMENTACION TANGENTE Y NORMAL
				this.normals_buffer.push(punto[2]);

				this.texture_coord_buffer.push(0.0);
				this.texture_coord_buffer.push(0.0);
			}
		}
	
	}
})
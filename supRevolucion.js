/****************************************
SupRevolucion
Esta clase abstracta representa a una superficie generada a partir de un perfil plano que se rota respecto a un eje
****************************************/

var SupRevolucion = Geometria.extend({
	initialize: function(perfil,eje,angulo,paso)
	{
		//Se podría implementar el perfil como una curva para obtener mas precision
		this.perfil = perfil.slice(0); //Lista de listas (cada lista interior es un punto xyz)
		this.eje = eje;
		this.angulo = angulo;
		this.paso = paso; //porcentaje respecto al angulo
		
		Geometria.prototype.initialize.call(this);
	/*
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		var whitePixel = new Uint8Array([255, 255, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
	*/	
		this.useTexture = 0.0;
	
	},

	rotarPuntos: function(puntos,angulo,eje)
	{
		var punto;
		var puntosRotados = [];
		var puntoRotado;
		var rotacion = mat4.create();
		mat4.identity(rotacion);
		mat4.rotate( rotacion, rotacion, angulo, eje);
		for (var i = 0; i < puntos.length; i++)
		{
			punto = vec3.fromValues(puntos[i][0],puntos[i][1],puntos[i][2]);
			puntoRotado = vec3.create();
			vec3.transformMat4(puntoRotado, punto, rotacion);
			puntosRotados.push(puntoRotado);
		}
		return puntosRotados;
	},

	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLE_STRIP; //Estas tres definiciones tienen que estar aca
		this.tangent_buffer = []; //Esta en null por defecto

		this.rows = this.perfil.length;
		this.cols = Math.ceil( 1 / this.paso);
		var ang;
		var puntos;
		var punto;
		
		var eje = vec3.fromValues(this.eje[0], this.eje[1],this.eje[2])
		var tangente = vec3.create();
		var normal = vec3.create();
					
		for (col = 0; col < this.cols; col++)
		{
			ang = col*this.paso*this.angulo;
			puntos = this.rotarPuntos(this.perfil, ang, this.eje);
			for (row = 0; row < this.rows; row++)
			{
				punto = puntos[row];
				this.position_buffer.push(punto[0]);
				this.position_buffer.push(punto[1]);
				this.position_buffer.push(punto[2]);

				this.color_buffer.push(0.1);
				this.color_buffer.push(0.5); //Color default
				this.color_buffer.push(0.1);

				var point = vec3.fromValues(punto[0], punto[1], punto[2]);
				vec3.cross(tangente, eje, point);

				this.tangent_buffer.push(tangente[0]);
				this.tangent_buffer.push(tangente[1]);
				this.tangent_buffer.push(tangente[2]);
				
				vec3.cross(normal, tangente ,eje);

				this.normals_buffer.push(normal[0]);
				this.normals_buffer.push(normal[1]); //Revisar implementacion normales y tangentes
				this.normals_buffer.push(normal[2]);

				this.texture_coord_buffer.push(0.0);
				this.texture_coord_buffer.push(0.0);
			}
		}
	
	}
})
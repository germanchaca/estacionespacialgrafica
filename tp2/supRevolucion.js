/****************************************
SupRevolucion
Esta clase abstracta representa a una superficie generada a partir de un perfil plano que se rota respecto a un eje
****************************************/

var SupRevolucion = Geometria.extend({
	initialize: function(perfil,eje,angulo,paso)
	{
		
		this.perfil = perfil; //Objeto perfil
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

	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLE_STRIP; //Estas tres definiciones tienen que estar aca
		this.tangent_buffer = []; //Esta en null por defecto

		this.cols = this.perfil.puntos.length;
		this.rows = Math.ceil( 1 / this.paso)+1;
		var ang;
		var perfilRotado;
		var puntos, tangentes, normales;
		var punto, tangente, normal;
					
		for (row = 0; row <= this.rows; row++)
		{
			ang = row*this.paso*this.angulo;
			perfilRotado = this.perfil.obtenerPerfilRotado(this.eje, ang); 
			puntos = perfilRotado.puntos;
			tangentes = perfilRotado.tangentes;
			normales = perfilRotado.normales;
			for (col = 0; col < this.cols; col++)
			{
				punto = puntos[col];
				tangente = tangentes[col];
				normal = normales[col];
				
				this.position_buffer.push(punto[0]);
				this.position_buffer.push(punto[1]);
				this.position_buffer.push(punto[2]);

				this.color_buffer.push(0.1);
				this.color_buffer.push(0.5); //Color default
				this.color_buffer.push(0.1);

				this.tangent_buffer.push(tangente[0]);
				this.tangent_buffer.push(tangente[1]);
				this.tangent_buffer.push(tangente[2]);
				
				this.normals_buffer.push(normal[0]);
				this.normals_buffer.push(normal[1]); 
				this.normals_buffer.push(normal[2]);

				binormal = vec3.create();
				vec3.cross(binormal,tangente,normal);
				this.binormal_buffer.push(binormal[0]);
				this.binormal_buffer.push(binormal[1]);
				this.binormal_buffer.push(binormal[2]);

				this.texture_coord_buffer.push(1.0-col/this.cols);
				this.texture_coord_buffer.push(1.0-row/this.rows);
				this.texture_coord_buffer.push(0);
			}
		}
	
	}
})
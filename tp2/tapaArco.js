/****************************************
SupBarrido
Esta clase abstracta representa a una superficie generada a partir de un poligono plano que se arrastra por un recorrido 3D
****************************************/

var TapaArco = Geometria.extend({
	//Se puede agregar función de escalado
	initialize: function(curvaInterna, curvaExterna, paso)
	{
		this.curvaInterna = curvaInterna;
		this.curvaExterna = curvaExterna;
		this.paso = paso;
		Geometria.prototype.initialize.call(this);
		this.useTexture = 0.0;
	
	},

	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLE_STRIP; //Estas tres definiciones tienen que estar aca
		this.tangent_buffer = []; //Esta en null por defecto

		var pasoCurvaInterna = this.curvaInterna.tramos*this.paso;
		var pasoCurvaExterna = this.curvaExterna.tramos*this.paso;
		this.cols = 1.0/this.paso;
		this.rows = 2;

		this.addCurvaPoints(this.curvaInterna,pasoCurvaInterna);
		this.addCurvaPoints(this.curvaExterna,pasoCurvaExterna);
	},

	addCurvaPoints: function(curva,paso)
	{
		var ejeZ = vec3.fromValues(0,0,1);

		var punto, tangente, normal;

		var u = 0;
		while(u < curva.maxU)
		{
			punto = curva.CurvaCubica(u);
			
			tangente = curva.CurvaCubicaDerivadaPrimera(u);

			normaTangente = Math.sqrt(Math.pow(tangente[0],2)+Math.pow(tangente[1],2)+Math.pow(tangente[2],2));

			tangente = [-tangente[0]/normaTangente, tangente[1]/normaTangente, -tangente[2]/normaTangente];

			normal = vec3.create();
			vec3.cross(normal,ejeZ,tangente);

			normaNormal = Math.sqrt(Math.pow(normal[0],2)+Math.pow(normal[1],2)+Math.pow(normal[2],2));
			normal = [normal[0]/normaNormal, normal[1]/normaNormal, normal[2]/normaNormal];

			this.position_buffer.push(punto[0]);
			this.position_buffer.push(punto[1]);
			this.position_buffer.push(punto[2]);

			this.color_buffer.push(0.1);
			this.color_buffer.push(0.5);
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

			this.texture_coord_buffer.push(0.0);
			this.texture_coord_buffer.push(0.0);

			
			u += paso;
		}
	}
	
	
})

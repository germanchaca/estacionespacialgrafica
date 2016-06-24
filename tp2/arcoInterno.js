var ArcoInterno = SupBarrido.extend({
	initialize: function(puntosRecorrido, basesRecorrido, NumTextures)
	{

		//curva = new CurvaBezier([[-4,2,0],[-3.2,2.2,0],[3.2,2.2,0],[4,2,0],[4,1,0],[4,-1,0],[4,-2,0],[2,-2,0],[-2,-2,0],[-4,-2,0],[-4,-1,0],[-4,1,0],[-4,2,0]]);
		this.curva = new CurvaBezier([ [-0.5,0.25,0], [-0.3,0.5,0], [0.3,0.5,0], [0.5,0.25,0], [0.5,0.13,0], [0.5,-0.04,0], [0.5,-0.25,0], [0.17,-0.25,0], [-0.16,-0.25,0], [-0.5,-0.25,0], [-0.5,-0.04,0], [-0.5,0.13,0], [-0.5,0.25,0] ]);

		poligono = new Poligono();
		poligono.generarConCurva(this.curva,0.05);
		
		this.NumTextures = NumTextures;

		SupBarrido.prototype.initialize.call(this, poligono, puntosRecorrido, basesRecorrido);
	
		this.useTexture = 1.0;
		this.initTexture("maps/paredInterna1.jpg");
		this.initSecondTexture("maps/piso.jpg");
		this.initThirdTexture("maps/techo.jpg");

		this.useDirectionalLights = false;
		this.usePointLights = true;

	},

	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLE_STRIP; //Estas tres definiciones tienen que estar aca
		this.tangent_buffer = []; //Esta en null por defecto
		this.texture_index_buffer = [];

		this.cols = this.poligono.puntos.length;
		this.rows = this.puntosRecorrido.length;
		
		var punto, tangente, normal;
		var poligonoTransformado;
		var puntoRecorrido;
		var baseRecorrido;
		var puntos,tangentes,normales
					
		var rowsByTexture = this.rows/this.NumTextures;

		var rowForTexture;  
				
		//var ventanales= [];

		for (var row = 0.0; row < this.rows; row++)
		{
			puntoRecorrido = this.puntosRecorrido[row];
			baseRecorrido = this.basesRecorrido[row];
			poligonoTransformado = this.poligono.obtenerPoligonoTransformado(puntoRecorrido, baseRecorrido);
			puntos = poligonoTransformado.puntos;
			tangentes = poligonoTransformado.tangentes;
			normales = poligonoTransformado.normales;

			rowForTexture = row%rowsByTexture;

			for (var col = 0.0; col < this.cols; col++)
			{
				//var ventana = 0;
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

				binormal = vec3.create();
				vec3.cross(binormal,tangente,normal);
				this.binormal_buffer.push(binormal[0]);
				this.binormal_buffer.push(binormal[1]);
				this.binormal_buffer.push(binormal[2]);

				if ((Math.abs(punto[1]))<0.25)
				{	
					//pared
					this.texture_coord_buffer.push(1.0-col/this.cols);
					this.texture_coord_buffer.push(1.0-rowForTexture/rowsByTexture);
					this.texture_coord_buffer.push(0.0);
				}
				else if ((punto[1])<=0.25)
				{
					//piso
					this.texture_coord_buffer.push(1.0-col/this.cols);
					this.texture_coord_buffer.push(1.0-rowForTexture/rowsByTexture);
					this.texture_coord_buffer.push(1.0);	
				}
				else
				{
					//techo
					this.texture_coord_buffer.push(1.0-col/this.cols);
					this.texture_coord_buffer.push(1.0-rowForTexture/rowsByTexture);
					this.texture_coord_buffer.push(2.0);	
				}
				//Agregar indice de paredes/techo
			}
			//ventanales.push(ventana);
		}
	}
})

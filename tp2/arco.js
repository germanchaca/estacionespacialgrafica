var Arco = SupBarrido.extend({
	initialize: function(radio,anguloTotal,paso,NumTextures)
	{
		

		curva = new CurvaBezier([ [-0.75,0.20,0], [-0.63,0.75,0], [0.63,0.75,0], [0.75,0.20,0], [0.71,0.20,0], [0.67,0.20,0], [0.63,0.20,0], [0.69,0.1,0], [0.69,-0.1,0], [0.63,-0.2,0], 
			[0.67,-0.2,0], [0.71,-0.2,0], [0.75,-0.2,0], [0.63,-0.75,0], [-0.63,-0.75,0], [-0.75,-0.20,0], [-0.71,-0.2,0], [-0.67,-0.2,0], [-0.63,-0.20,0], [-0.69,-0.1,0], [-0.69,0.1,0], [-0.63,0.2,0], 
			[-0.67,0.2,0], [-0.71,0.2,0], [-0.75,0.2,0] ]);


		poligono = new Poligono();
		poligono.generarConCurva(curva,0.05);
	
		var ang = 0;
		var puntosRecorrido = [];
		var basesRecorrido = [];
		var punto, base;
		var tangente, normal;
		var normaNormal;
		var ejeY = vec3.fromValues(0,1,0);
		var normaTangente;

		while(ang <= anguloTotal)
		{
			punto = [radio*Math.cos(ang),0,radio*Math.sin(ang)];
			puntosRecorrido.push(punto);
			normaTangente = Math.sqrt(Math.pow(radio*Math.sin(ang),2)+Math.pow(radio*Math.cos(ang),2));
			tangente = vec3.fromValues((radio*Math.sin(ang))/normaTangente,0,(radio*Math.cos(ang))/normaTangente );
			normal = vec3.create();
			vec3.cross(normal,ejeY,tangente);
			normaNormal = Math.sqrt(Math.pow(normal[0],2)+Math.pow(normal[1],2)+Math.pow(normal[2],2));
			normal = [normal[0]/normaNormal, normal[1]/normaNormal, normal[2]/normaNormal];
			base = [normal,ejeY,tangente];
			basesRecorrido.push(base);
			ang += paso;
		}
		

		//puntosRecorrido = [[0,0,1],[0,0,2],[0,0,3],[0,0,4],[0,0,5][0,0,6],[0,0,7],[0,0,8],[0,0,9],[0,0,10]];
		//basesRecorrido = [ [[1,0,0],[0,1,0],[0,0,1]]

		this.NumTextures = NumTextures;

		SupBarrido.prototype.initialize.call(this, poligono, puntosRecorrido, basesRecorrido);

		
		this.useTexture = 1.0;
		//this.useMultipleTextures = true;
		this.initTexture("maps/shiphull.jpg");
		this.initSecondTexture("maps/ventanal.jpg");
		this.initNormalMap("maps/shiphull_normalmap.jpg");


		var arcoInterno = new ArcoInterno(puntosRecorrido,basesRecorrido);
		this.addDependencie(arcoInterno);

		//TAPAS

		var tapa = new TapaArco(arcoInterno.curva, curva, 0.01);
		
		transformacion = mat4.create();
		mat4.translate(transformacion,transformacion,[5,0,0]);
		tapa.applyMatrix(transformacion);
		this.addDependencie(tapa);

		var tapa2 = new TapaArco(arcoInterno.curva, curva, 0.01);
		
		transformacion = mat4.create();
		mat4.rotate(transformacion,transformacion,0.5*Math.PI,[0,1,0]);
		mat4.translate(transformacion,transformacion,[5,0,0]);
		//mat4.rotate(transformacion,transformacion, Math.PI, [1,0,0]);
		tapa2.applyMatrix(transformacion);
		this.addDependencie(tapa2);


		//CILINDROS EXTERNOS
		for (var i = 0; i < 3; i++)
		{
			cilindro = new Cilindro(0.01);
			transformacion = mat4.create();
			mat4.rotate(transformacion,transformacion,-0.5*i*Math.PI,[0,1,0]);
			mat4.rotate(transformacion,transformacion,-0.25*Math.PI,[0,1,0]);
			mat4.translate(transformacion,transformacion,[5.6,0,0]);
			mat4.rotate(transformacion,transformacion,-0.5*Math.PI,[0,0,1]);
			mat4.scale(transformacion,transformacion,[0.5,0.45,0.5]);
			cilindro.applyMatrix(transformacion);
			cilindro.setColor([0.1,0.1,0.1]);
			if (i==1)
			{
				var cable = new Cable(0.02);
				var transformacion = mat4.create();
				//mat4.translate(transformacion,transformacion,[-3,0,-3]);
				//mat4.rotate(transformacion,transformacion,Math.PI,[0,0,1]);
				//
				mat4.translate(transformacion,transformacion,[1.0,0.2,1.0]);
				mat4.scale(transformacion, transformacion, [3,3,3]);
				mat4.translate(transformacion,transformacion,[0,-1,1]);

				cable.applyMatrix(transformacion);
				cable.setColor([1.0,0.1,0.2]);
				this.addDependencie(cable);
			}
			this.addDependencie(cilindro);
		}


		//this.useTexture = 0.0;
	
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

				if ((Math.abs(punto[1]))<0.2)
				{	
					this.texture_coord_buffer.push(1.0-col/this.cols);
					this.texture_coord_buffer.push(1.0-rowForTexture/rowsByTexture);
					this.texture_coord_buffer.push(1);
				}
				else
				{
					this.texture_coord_buffer.push(1.0-col/this.cols);
					this.texture_coord_buffer.push(1.0-rowForTexture/rowsByTexture);
					this.texture_coord_buffer.push(0);	
				}
				//Agregar indice de paredes/techo
			}
		}
	
	}
})

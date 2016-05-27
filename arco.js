var Arco = SupBarrido.extend({
	initialize: function(radio,anguloTotal,paso)
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

		SupBarrido.prototype.initialize.call(this, poligono, puntosRecorrido, basesRecorrido);
		
		var arcoInterno = new ArcoInterno(puntosRecorrido,basesRecorrido);
		this.addDependencie(arcoInterno);

		var tapa = new Tapa();
		
		transformacion = mat4.create();
		mat4.translate(transformacion,transformacion,[6,0,0]);
		tapa.applyMatrix(transformacion);
		tapa.setColor([0.1,0.1,0.1]);
		this.addDependencie(tapa);

		//CILINDROS EXTERNOS
		for (var i = 0; i < 3; i++)
		{
			cilindro = new Cilindro(0.01);
			transformacion = mat4.create();
			mat4.rotate(transformacion,transformacion,-0.5*i*Math.PI,[0,1,0]);
			mat4.rotate(transformacion,transformacion,-0.25*Math.PI,[0,1,0]);
			mat4.translate(transformacion,transformacion,[5,0,0]);
			mat4.rotate(transformacion,transformacion,-0.5*Math.PI,[0,0,1]);
			mat4.scale(transformacion,transformacion,[0.5,1,0.5]);
			cilindro.applyMatrix(transformacion);
			cilindro.setColor([0.1,0.1,0.1]);
			this.addDependencie(cilindro);
		}



		this.useTexture = 0.0;
	
	},
})

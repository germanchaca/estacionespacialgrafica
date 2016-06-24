/****************************************
EstructuraCentral

Esta clase representa a la estructura central de la estación espacial
****************************************/

var EstructuraCentral = SupRevolucion.extend({
	initialize: function(paso1, paso2)
	//paso1 es el paso para generar la curva
	//paso2 es el paso para ir rotando el angulo
	{
		var puntos = [[0,5,0], [0.1,5,0], [0.2,5,0], [0.3,5,0], [0.3,4.97,0], [0.3,4.93,0], [0.3,4.9,0], [0.525,4.9,0], [0.495,4.7,0], [0.6,4.7,0], [0.6,4.534,0], [0.6,4.367,0], [0.6,4.2,0], 
		[1.1,4.2,0], [1.1,3.99,0], [1.1,3.9,0], [1.1,3.8,0], [1.1,3.7,0], [1.1,3.6,0], [1.22,3.59,0], [1.3,3.575,0], [1.3,3.5,0], [1.3,3.367,0], [1.3,3.233,0], [1.3,3.1,0], 
		[1.29,3.07,0], [1.27,3.0,0], [1.1,3.0,0], [1.1,2.7,0], [1.1,2.4,0], [1.1,2.1,0], [1.1,2.01,0], [1.2,2.0,0], [1.3,2.0,0], [1.3,1.933,0], [1.3,1.867,0], [1.3,1.8,0], 
		[1.2,1.45,0], [1.05,1.375,0], [0.3,1.3,0], [0.3,0.867,0], [0.3,0.433,0], [0.3,0,0], [0.2,0,0], [0.1,0,0], [0,0,0]];
		
		//var puntos = [ [6,42,0], [6,43.67,0], [6,45.34,0], [6,47,0], [4.95,47,0], [5.25,49,0], [3,49,0], [3,49.33,0], [3,49.67,0], [3,50,0], [2,50,0], [1,50,0], [0,50,0]];

		var curva = new CurvaBezier(puntos);
		var perfil = new Perfil();
		perfil.generarConCurva(curva,paso1);

		var eje = [0,1,0];
		var angulo = 2*Math.PI;
		
		SupRevolucion.prototype.initialize.call(this, perfil, eje, angulo, paso2);

		this.setColor([0.9,0.9,0.9]);

		this.useTexture = 1.0;
		
		this.initTexture("maps/shiphull.jpg");
		this.initNormalMap("maps/shiphull_normalmap.jpg");

		//ARCO CENTRAL
		var arco = new Arco(5,0.75*2*Math.PI,0.05,4);
		transformacion = mat4.create();
		mat4.translate(transformacion,transformacion,[0,2.55,0]);
		arco.applyMatrix(transformacion);
		this.addDependencie(arco);

		//CILINDROS QUE VAN AL ARCO CENTRAL
		var cilindro;
		var transformacion;

		for (var i = 0; i < 7; i++)
		{
			cilindro = new Cilindro(0.01);
			cilindro.initReflexMap("maps/refMap.jpg");
			cilindro.initTexture("maps/dorado.jpg");
			transformacion = mat4.create();
			mat4.translate(transformacion,transformacion,[0,2.55,0]);
			mat4.rotate(transformacion,transformacion,-0.25*i*Math.PI,[0,1,0]);
			mat4.rotate(transformacion,transformacion,-0.5*Math.PI,[0,0,1]);
			mat4.scale(transformacion,transformacion,[0.3,4.5,0.3]);
			cilindro.applyMatrix(transformacion);
			this.addDependencie(cilindro);
		}

		//ANTENAS
		var antena = new Antena();
		var transformacion = mat4.create();
		mat4.rotate(transformacion,transformacion,-0.25*Math.PI,[0,1,0]);
		antena.applyMatrix(transformacion);
		this.addDependencie(antena);

		var antena = new Antena();
		//Uso la transformacion de la antena anterior
		mat4.translate(transformacion,transformacion,[0,5,0]);
		mat4.rotate(transformacion,transformacion,Math.PI,[0,1,0]);
		mat4.rotate(transformacion,transformacion,Math.PI,[1,0,0]);
		antena.applyMatrix(transformacion);
		this.addDependencie(antena);
	},
})
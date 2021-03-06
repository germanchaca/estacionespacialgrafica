
var Antena = Conjunto.extend({
	initialize: function()
	{
		Conjunto.prototype.initialize.call(this);

		var cilindro = new Cilindro(0.1);
		cilindro.initTexture("maps/cil.jpg");
		var cilindro2 = new Cilindro(0.1);
		cilindro2.initTexture("maps/cil.jpg");
		var transformacion1 = mat4.create();
		var transformacion2 = mat4.create();
		
		//mat4.rotate(transformacion,transformacion,-0.25*i*Math.PI,[0,1,0]);
		//mat4.rotate(transformacion,transformacion,-0.5*Math.PI,[0,0,1]);
		mat4.translate(transformacion1,transformacion1,[0.1,0,0]);
		mat4.scale(transformacion1,transformacion1,[0.05,10,0.05]);
		cilindro.applyMatrix(transformacion1);
		this.add(cilindro);

		mat4.translate(transformacion2,transformacion2,[-0.1,0,0]);
		mat4.scale(transformacion2,transformacion2,[0.05,10,0.05]);
		cilindro2.applyMatrix(transformacion2);
		this.add(cilindro2);


		var transformacionReceptor = mat4.create();
		mat4.translate(transformacionReceptor,transformacionReceptor,[0,5,0]);
		
		this.doblesReceptores = [];
		for (var i = 0; i < 4; i++)
		{
			var dobleReceptor = new DobleReceptor(0);
			mat4.translate(transformacionReceptor,transformacionReceptor,[0,1,0]);
			dobleReceptor.applyMatrix(transformacionReceptor);
			this.add(dobleReceptor);
			this.doblesReceptores.push(dobleReceptor)			
		}
	},
	cerrar: function(signo)
	{
		transformacionReceptor = mat4.create();
		for (var i = 0; i < 4; i++)
		{
			this.doblesReceptores[i].cerrar(signo);
			mat4.translate(transformacionReceptor,transformacionReceptor,[0,-0.6,0]);
			this.doblesReceptores[i].applyMatrix(transformacionReceptor);
		}
	},
	abrir: function(signo)
	{
		transformacionReceptor = mat4.create();
		for (var i = 0; i < 4; i++)
		{
			this.doblesReceptores[i].abrir(signo);
			mat4.translate(transformacionReceptor,transformacionReceptor,[0,0.6,0]);
			this.doblesReceptores[i].applyMatrix(transformacionReceptor);
		}
	}
})
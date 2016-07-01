var DobleReceptor = Conjunto.extend({
	initialize: function(angulo)
	{
		Conjunto.prototype.initialize.call(this);

		var cilindro = new Cilindro(0.1);
		cilindro.initTexture("maps/dorado.jpg");
		this.receptor1 = new Receptor();
		this.receptor2 = new Receptor();
		
		var transformacion1 = mat4.create();
		var transformacion2 = mat4.create();
		var transformacion3 = mat4.create();
		
		mat4.scale(transformacion1,transformacion1,[0.2,0.1,0.2]);
		cilindro.applyMatrix(transformacion1);
		this.add(cilindro);

		mat4.translate(transformacion3,transformacion3,[0,0.05,0]);
		//mat4.rotate(transformacion3,transformacion3,Math.PI,[0,0,1]);
		//mat4.rotate(transformacion3,transformacion3,Math.PI,[1,0,0]);
		mat4.rotate(transformacion3,transformacion3,angulo,[-1,0,0]);
		this.receptor1.applyMatrix(transformacion3);
		this.add(this.receptor1);

		mat4.translate(transformacion2,transformacion2,[0,0.05,0]);
		mat4.rotate(transformacion2,transformacion2,Math.PI,[0,1,0]);
		mat4.rotate(transformacion2,transformacion2,angulo,[1,0,0]);
		this.receptor2.applyMatrix(transformacion2);
		this.add(this.receptor2);

	},
	cerrar: function(signo)
	{
		var transformacion1 = mat4.create();
		var transformacion2 = mat4.create();
		mat4.rotate(transformacion1,transformacion1,Math.PI/2,[-1,0,0]);
		mat4.rotate(transformacion2,transformacion2,Math.PI/2,[1,0,0]);
		this.receptor1.applyMatrix(transformacion1);
		this.receptor2.applyMatrix(transformacion2);
	},

	abrir: function(signo)
	{
		var transformacion1 = mat4.create();
		var transformacion2 = mat4.create();
		mat4.rotate(transformacion1,transformacion1,Math.PI/2,[1,0,0]);
		mat4.rotate(transformacion2,transformacion2,Math.PI/2,[-1,0,0]);
		this.receptor1.applyMatrix(transformacion1);
		this.receptor2.applyMatrix(transformacion2);
	}
})
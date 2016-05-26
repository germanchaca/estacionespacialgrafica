var DobleReceptor = Conjunto.extend({
	initialize: function(angulo)
	{
		Conjunto.prototype.initialize.call(this);

		var cilindro = new Cilindro(0.1);
		var receptor1 = new Receptor();
		var receptor2 = new Receptor();
		
		var transformacion1 = mat4.create();
		var transformacion2 = mat4.create();
		
		mat4.scale(transformacion1,transformacion1,[0.2,0.1,0.2]);
		cilindro.applyMatrix(transformacion1);
		this.add(cilindro);

		this.add(receptor1);

		mat4.rotate(transformacion2,transformacion2,Math.PI,[0,1,0]);
		receptor2.applyMatrix(transformacion2);
		this.add(receptor2);

	}
})
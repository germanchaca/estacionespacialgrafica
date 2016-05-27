var Nave = Conjunto.extend({
	initialize: function()
	{
		Conjunto.prototype.initialize.call(this);

		var cuerpoNave = new CuerpoNave();
		this.add(cuerpoNave);


		var cilindro = new Cilindro(0.1);
		var transformacion1 = mat4.create();
		var transformacion2 = mat4.create();
		
		//mat4.rotate(transformacion,transformacion,-0.25*i*Math.PI,[0,1,0]);
		//mat4.rotate(transformacion,transformacion,-0.5*Math.PI,[0,0,1]);
		mat4.translate(transformacion1,transformacion1,[1.2,1.2,3.5]);
		mat4.rotate(transformacion1,transformacion1,-0.5*Math.PI,[1,0,0]);
		mat4.scale(transformacion1,transformacion1,[1,7,1]);
		cilindro.applyMatrix(transformacion1);
		cilindro.setColor([0.1,0.1,0.1]);
		this.add(cilindro);

		var brazo1 = new Brazo();
		this.add(brazo1);

		var brazo2 = new Brazo();


/*
		var transformacionReceptor = mat4.create();

		//var dobleReceptor = new DobleReceptor(Math.PI*0.5);
		var dobleReceptor = new DobleReceptor(0);
		mat4.translate(transformacionReceptor,transformacionReceptor,[0,6,0]);
		dobleReceptor.applyMatrix(transformacionReceptor);
		this.add(dobleReceptor);
*/

	}
})
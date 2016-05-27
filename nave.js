var Nave = Conjunto.extend({
	initialize: function()
	{
		Conjunto.prototype.initialize.call(this);

		var cuerpoNave = new CuerpoNave();
		this.add(cuerpoNave);


		var cilindro = new Cilindro(0.1);
		var transformacionCilindro = mat4.create();
		var transformacionBrazo1 = mat4.create();
		var transformacionBrazo2 = mat4.create();
		
		//mat4.rotate(transformacion,transformacion,-0.25*i*Math.PI,[0,1,0]);
		//mat4.rotate(transformacion,transformacion,-0.5*Math.PI,[0,0,1]);
		mat4.translate(transformacionCilindro,transformacionCilindro,[1.2,1.2,3.5]);
		mat4.rotate(transformacionCilindro,transformacionCilindro,-0.5*Math.PI,[1,0,0]);
		mat4.scale(transformacionCilindro,transformacionCilindro,[1,7,1]);
		cilindro.applyMatrix(transformacionCilindro);
		cilindro.setColor([0.1,0.1,0.1]);
		this.add(cilindro);

		var brazo1 = new Brazo();
		mat4.translate(transformacionBrazo1,transformacionBrazo1,[1.2,1.25,-4]);
		mat4.rotate(transformacionBrazo1,transformacionBrazo1,0.5*Math.PI,[0,1,0]);
		mat4.rotate(transformacionBrazo1,transformacionBrazo1,0.5*Math.PI,[1,0,0]);
		mat4.scale(transformacionBrazo1,transformacionBrazo1,[0.7,0.7,1]);
		brazo1.applyMatrix(transformacionBrazo1);
		this.add(brazo1);

		var brazo2 = new Brazo();
		mat4.translate(transformacionBrazo2,transformacionBrazo2,[1.2,1.25,4]);
		mat4.rotate(transformacionBrazo2,transformacionBrazo2,-0.5*Math.PI,[0,1,0]);
		mat4.rotate(transformacionBrazo2,transformacionBrazo2,-0.5*Math.PI,[1,0,0]);
		mat4.scale(transformacionBrazo2,transformacionBrazo2,[0.7,0.7,1]);
		brazo2.applyMatrix(transformacionBrazo2);
		this.add(brazo2);

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
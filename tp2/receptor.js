var Receptor = Conjunto.extend({
	initialize: function(angulo)
	{
		Conjunto.prototype.initialize.call(this);

		var cilindroBase = new Cilindro(0.1);
		var cilindroSoporte = new Cilindro(0.1);
		var paleta1 = new Paleta(1,0.15,10,10);
		var paleta2 = new Paleta(1,0.15,10,10);

		//paleta1.initReflexMap("maps/refMap.jpg");
		paleta1.initNormalMap("maps/panelsolar-normalMap.jpg");
		//paleta2.initReflexMap("maps/refMap.jpg");
		paleta2.initNormalMap("maps/panelsolar-normalMap.jpg");

		var transformacionBase = mat4.create();
		var transformacionSoporte = mat4.create();
		var transformacionPaleta1 = mat4.create();
		var transformacionPaleta2 = mat4.create();
		
		mat4.rotate(transformacionBase,transformacionBase,0.5*Math.PI,[0,0,1]);
		mat4.scale(transformacionBase,transformacionBase,[0.01,0.8,0.01]);
		cilindroBase.applyMatrix(transformacionBase);
		this.add(cilindroBase);

		mat4.translate(transformacionSoporte,transformacionSoporte,[0.8,-0.15,0]);
		mat4.scale(transformacionSoporte,transformacionSoporte,[0.01,0.3,0.01]);
		cilindroSoporte.applyMatrix(transformacionSoporte);
		this.add(cilindroSoporte);

		mat4.translate(transformacionPaleta1,transformacionPaleta1,[0.8,0.12,0]);
		paleta1.applyMatrix(transformacionPaleta1);
		this.add(paleta1);

		mat4.translate(transformacionPaleta2,transformacionPaleta2,[0.8,-0.12,0]);
		paleta2.applyMatrix(transformacionPaleta2);
		this.add(paleta2);
	}
})
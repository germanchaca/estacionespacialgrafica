var Turbina = SupRevolucion.extend({
	initialize: function(paso)
	{
		
		var perfil = new Perfil(); //Objeto perfil
		var curva = new CurvaBezier([[0.75,-0.5,0], [0.77,-0.53,0], [0.786,-0.56,0], [0.8,-0.6,0], [0.9,-0.5,0], [2,2,0], [0.5,0.5,0]]);
		perfil.generarConCurva(curva,0.05);

		var eje = [0,1,0];
		var anguloRevolucion = 2*Math.PI;
		
		SupRevolucion.prototype.initialize.call(this, perfil, eje, anguloRevolucion, paso);
	/*
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		var whitePixel = new Uint8Array([255, 255, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
	*/	
		this.useTexture = 0.0;
		this.setColor([0.7,0.9,0.6]);


		var colorTapas = [0.0,0.0,1.0];

		var perfilTapaDelantera = new Perfil();
		var curva = new CurvaBezier([[0,-0.5,0], [0.25,-0.5,0], [0.5,-0.5,0], [0.75,-0.5,0]]);
		perfilTapaDelantera.generarConCurva(curva,0.05);
		var tapaDelantera = new SupRevolucion(perfilTapaDelantera, eje, anguloRevolucion, paso);
		tapaDelantera.setColor(colorTapas);
		this.addDependencie(tapaDelantera);

		var perfilTapaTrasera = new Perfil();
		var curva = new CurvaBezier([[0,0.7,0], [0.16,0.7,0], [0.33,0.7,0], [0.7,0.7,0]]);
		perfilTapaTrasera.generarConCurva(curva,0.05); 
		var tapaTrasera = new SupRevolucion(perfilTapaTrasera, eje, anguloRevolucion, paso);
		tapaTrasera.setColor(colorTapas);
		this.addDependencie(tapaTrasera);
	
	},
})
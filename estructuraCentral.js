/****************************************
EstructuraCentral

Esta clase representa a la estructura central de la estación espacial
****************************************/

var EstructuraCentral = SupRevolucion.extend({
	initialize: function(paso1, paso2)
	//paso1 es el paso para generar la curva
	//paso2 es el paso para ir rotando el angulo
	{
		var puntos = [[0,50,0], [1,50,0], [2,50,0], [3,50,0], [3,49.67,0], [3,49.33,0], [3,49,0], [5.25,49,0], [4.95,47,0], [6,47,0], [6,45.34,0], [6,43.67,0],[6,42,0]];
		
		//var puntos = [ [6,42,0], [6,43.67,0], [6,45.34,0], [6,47,0], [4.95,47,0], [5.25,49,0], [3,49,0], [3,49.33,0], [3,49.67,0], [3,50,0], [2,50,0], [1,50,0], [0,50,0]];

		var curva = new CurvaBezier(puntos);
		var perfil = new Perfil();
		perfil.generarConCurva(curva,paso1);

		var eje = [0,1,0];
		var angulo = 2*Math.PI;
		
		SupRevolucion.prototype.initialize.call(this, perfil, eje, angulo, paso2);
	/*
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		var whitePixel = new Uint8Array([255, 255, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
	*/	
		this.useTexture = 0.0;
	
	},
})
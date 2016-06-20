/****************************************
Cilindro
Esta clase representa a un cilindro generado como una superficie de revolucion

radio = 1
altura = 1
****************************************/

var Cilindro = SupRevolucion.extend({
	initialize: function(paso)
	{
		
		var perfil = new Perfil(); //Objeto perfil
		var puntos = [[0,0,0],[1,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[1,1,0],[0,1,0]];
		perfil.setPuntos(puntos);
		var tangentes = [[1,0,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[-1,0,0]];
		perfil.setTangentes(tangentes);
		var normales = [[0,-1,0],[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,0,0],[0,1,0]];
		perfil.setNormales(normales);
		var eje = [0,1,0];
		var angulo = 2*Math.PI;
		
		SupRevolucion.prototype.initialize.call(this, perfil, eje, angulo, paso);
	/*
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		var whitePixel = new Uint8Array([255, 255, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
	*/	
		this.useTexture = 0.0;
	
	},
})
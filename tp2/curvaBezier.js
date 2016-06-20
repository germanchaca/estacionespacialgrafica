/****************************************
CurvaBezier
Esta clase representa a una curva de Bezier que se dibuja en pantalla
****************************************/

var CurvaBezier = Curva.extend({
	initialize: function(puntos)
	{
		Curva.prototype.initialize.call(this,puntos);
	},
	
	setBases: function()
	{
		this.bases = "bezier3";
	
		// Definimos las Bases de Berstein, dependen de u
		this.base0=function(u) { return (1-u)*(1-u)*(1-u);}  // 1*(1-u) - u*(1-u) = 1-2u+u2  ,  (1-2u+u2) - u +2u2- u3 ,  1 - 3u +3u2 -u3

		this.base1=function(u) { return 3*(1-u)*(1-u)*u; }

		this.base2=function(u) { return 3*(1-u)*u*u;}

		this.base3=function(u) { return u*u*u; }

		// bases derivadas

		this.base0der=function(u) { return -3*u*u+6*u-3;} //-3u2 +6u -3

		this.base1der=function(u) { return 9*u*u-12*u+3; }  // 9u2 -12u +3

		this.base2der=function(u) { return -9*u*u+6*u;}		 // -9u2 +6u

		this.base3der=function(u) { return 3*u*u; }			// 3u2
	},	

	getIndiceInicialTramo: function(tramo)
	{
		return (tramo - 1) * 3;
	},

	getTramosFromPuntos: function(puntos)
	{
		return (puntos.length - 1) / 3;
	}
})
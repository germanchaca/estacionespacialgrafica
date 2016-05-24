/****************************************
Curva BSpline
Esta clase representa a una curva BSpline que se dibuja en pantalla
****************************************/

var CurvaBSpline = Curva.extend({
	initialize: function(puntos)
	{
		Curva.prototype.initialize.call(this,puntos);
	},
	
	setBases: function()
	{
		this.bases = "bspline3";
		
		this.base0=function(u) { return (1-3*u+3*u*u-u*u*u)*1/6;}  // (1 -3u +3u2 -u3)/6

		this.base1=function(u) { return (4-6*u*u+3*u*u*u)*1/6; }  // (4  -6u2 +3u3)/6

		this.base2=function(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6} // (1 -3u +3u2 -3u3)/6

		this.base3=function(u) { return (u*u*u)*1/6; }  //    u3/6


		this.base0der=function(u) { return (-3 +6*u -3*u*u)/6 }  // (-3 +6u -3u2)/6

		this.base1der=function(u) { return (-12*u+9*u*u)/6 }   // (-12u +9u2)  /6

		this.base2der=function(u) { return (3+6*u-9*u*u)/6;}	// (-3 +6u -9u2)/6

		this.base3der=function(u) { return (3*u*u)*1/6; }			
	},	

	getIndiceInicialTramo: function(tramo)
	{
		return (tramo - 1);
	},
	
	getTramosFromPuntos: function(puntos)
	{
		return puntos.length - 3;
	}
})


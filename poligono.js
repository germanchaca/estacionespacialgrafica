/****************************************
Poligono
Esta clase abstracta representa a un poligono plano compuesto por una determinada cantidad de vertices

Por convención se asume que el poligono se encuentra en el plano xy (la normal al plano que lo contiene es el eje z)!!!
****************************************/

var Poligono = Base.extend({
	initialize: function()
	{
		this.puntos;
		this.tangentes;
		this.normales; //Las normales de los puntos
		this.centro;
	},

	setPuntos: function(puntos)
	{
		this.puntos = puntos.slice(0);
	},

	setNormales: function(normales)
	{
		this.normales = normales.slice(0);
	},

	setTangentes: function(tangentes)
	{
		this.tangentes = tangentes.slice(0);
	},

	setCentro: function(centro)
	{
		this.centro = centro;
	},

	obtenerPoligonoTransformado: function(nuevoCentro, base)
	{
		
	},

	generarConCurva: function(curva, paso)
	//La curva debe ser una curva cerrada para ser un polígono
	{
		var puntos = [];
		var normales = [];
		var tangentes = [];
		var punto,tangente;
		var normal = vec3.create();
		var ejez = vec3.fromValues(0,0,1);
		var x,y,z = 0;

		for (var u = curva.minU ; u <= curva.maxU; u += paso)
		{
			punto = curva.CurvaCubica(u);
			x += punto[0];
			y += punto[1];
			z += punto[2];
			tangente = curva.CurvaCubicaDerivadaPrimera(u);
			vec3.cross(normal,tangente,ejez);
			puntos.push(punto);
			tangentes.push(tangente);
			normales.push(normal);
		}
		var xCentro = x/puntos.length;
		var yCentro = y/puntos.length;
		var zCentro = z/puntos.length;
		var centro = vec3.fromValues(xCentro, yCentro, zCentro);
		this.setPuntos(puntos);
		this.setTangentes(tangentes);
		this.setNormales(normales);
		this.setCentro(centro);
	}
	
})
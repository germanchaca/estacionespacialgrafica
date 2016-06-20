/****************************************
Poligono
Esta clase abstracta representa a un poligono plano compuesto por una determinada cantidad de vertices

Por convención se asume que el poligono se encuentra en el plano xy (la normal al plano que lo contiene es el eje z)!!!

Los poligonos iniciales que se utilizan para generar otro poligonos transformados se asumen en la base canónica
****************************************/

var Poligono = Base.extend({
	initialize: function()
	{
		this.puntos;
		this.tangentes;
		this.normales; //Las normales de los puntos
		this.centro;
		this.base; //Base ortonormal
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

	setBase: function(base)
	{
		this.base = base;
	},

	matrizCambioDeBase: function(baseRecorrido)
	{
		var matriz = mat3.create();
		var base;
		for (var col = 0; col < baseRecorrido.length; col++)
		{
			base = baseRecorrido[col];
			for (var fil = 0; fil < base.length; fil++)
			{
				matriz[fil * baseRecorrido.length + col] = base[fil];
			}
		}
		return matriz;
	},

	transformarVectores: function(vectores, transformacion)
	{
		var vectoresTransformados = [];
		var vector, vectorTransformado;
		for (var i = 0; i < vectores.length; i++)
		{
			vector = vec3.fromValues(vectores[i][0],vectores[i][1],vectores[i][2]);
			vectorTransformado = vec3.create();
			vec3.transformMat3(vectorTransformado, vector, transformacion);
			vectoresTransformados.push(vectorTransformado);
		}
		return vectoresTransformados;
	},

	sumarDesplazamiento: function(puntos, desplazamiento)
	{
		var puntosDesplazados = [];
		var punto, puntosDesplazado;
		for (var i = 0; i < puntos.length; i++)
		{
			punto = vec3.fromValues(puntos[i][0], puntos[i][1],puntos[i][2]);
			puntosDesplazado = vec3.fromValues(punto[0] + desplazamiento[0], punto[1] + desplazamiento[1], punto[2] + desplazamiento[2]);
			puntosDesplazados.push(puntosDesplazado);
		}
		return puntosDesplazados;
	},

	obtenerPoligonoTransformado: function(nuevoCentro, nuevaBase)
	{
		var poligonoTransformado = new Poligono();
		poligonoTransformado.setCentro(nuevoCentro);
		var vectorDistancia = vec3.fromValues(nuevoCentro[0] - this.centro[0], nuevoCentro[1] - this.centro[1], nuevoCentro[2] - this.centro[2] )
		var cambioDeBase = this.matrizCambioDeBase(nuevaBase);

		var puntosTransformados = this.transformarVectores(this.puntos, cambioDeBase);
		puntosTransformados = this.sumarDesplazamiento(puntosTransformados, vectorDistancia);
		poligonoTransformado.setPuntos(puntosTransformados);
		var tangentesTransformadas = this.transformarVectores(this.tangentes, cambioDeBase);
		poligonoTransformado.setTangentes(tangentesTransformadas);
		var normalesTransformadas = this.transformarVectores(this.normales, cambioDeBase);
		poligonoTransformado.setNormales(normalesTransformadas);

		return poligonoTransformado;
	},

	generarConCurva: function(curva, paso)
	//La curva debe ser una curva cerrada para ser un polígono
	{
		var puntos = [];
		var normales = [];
		var tangentes = [];
		var punto,tangente;
		var ejez = vec3.fromValues(0,0,1);
		var x = 0; 
		var y = 0;
		var z = 0;

		for (var u = curva.minU ; u <= curva.maxU; u += paso)
		{
			var normal = vec3.create();
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
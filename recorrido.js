/****************************************
Recorrido
Esta clase representa un recorrido 3D mediante algunos puntos y la base ortonormal correspondiente a cada punto
****************************************/

var Recorrido = Base.extend({
	initialize: function()
	{
		this.puntos;
		this.normales;
		this.tangentes;
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

	rotarVectores: function(vectores, rotacion)
	{
		var vectoresRotados = [];
		var vector, vectorRotado;
		for (var i = 0; i < vectores.length; i++)
		{
			vector = vec3.fromValues(vectores[i][0],vectores[i][1],vectores[i][2]);
			vectorRotado = vec3.create();
			vec3.transformMat4(vectorRotado, vector, rotacion);
			vectoresRotados.push(vectorRotado);
		}
		return vectoresRotados;
	},
	
	obtenerPerfilRotado: function(eje, angulo)
	{
		var perfilRotado = new Perfil();
		var matriz = mat4.create();
		mat4.identity(matriz);
		mat4.rotate(matriz, matriz, angulo, eje);
		
		var puntosRotados = this.rotarVectores(this.puntos, matriz);
		perfilRotado.setPuntos(puntosRotados);
		var tangentesRotadas = this.rotarVectores(this.tangentes, matriz);
		perfilRotado.setTangentes(tangentesRotadas);
		var normalesRotadas = this.rotarVectores(this.normales, matriz);
		perfilRotado.setNormales(normalesRotadas);
		
		return perfilRotado;
	},

	generarConCurva: function(curva, paso)
	//paso es el deltaU
	{
		var puntos = [];
		var normales = [];
		var tangentes = [];
		var punto,tangente;
		var normal = vec3.create();
		var ejez = vec3.fromValues(0,0,1);

		for (var u = curva.minU ; u <= curva.maxU; u += paso)
		{
			punto = curva.CurvaCubica(u);
			tangente = curva.CurvaCubicaDerivadaPrimera(u);
			vec3.cross(normal,tangente,ejez);
			puntos.push(punto);
			tangentes.push(tangente);
			normales.push(normal);
		}
		this.setPuntos(puntos);
		this.setTangentes(tangentes);
		this.setNormales(normales);
	}

})
var Cable = SupBarrido.extend({
	initialize: function(paso){
		var poligono = new Poligono();
		var curvaCirculo = new CurvaBezier([[-0.01,0,0],[-0.01,0.01,0],[0.01,0.01,0],[0.01,0,0],[0.01,-0.01,0],[-0.01,-0.01,0],[-0.01,0.005,0]]);
		poligono.generarConCurva(curvaCirculo,0.05);
		var curvaRecorrido = new CurvaBSpline([[1,1,0],[1,1,0],[1,1,0],[1.5,0.6,0.3],[1.4,0.9,0.4],[0.8,0.3,1],[0.1,0.5,1.5],[0,0,2],[1.3,0.6,1],[1.4,-1.2,1.4],[1.6,0.4,0.5],[1.5,0.5,0.4],[1.5,0.5,0.4],[1.5,0.5,0.4]]);
		
		var u = 0;
		var puntosRecorrido = [];
		var basesRecorrido = [];
		var punto, base;
		var tangente, normal;
		var normaNormal;
		var normaVecAux;
		var ejeZ = vec3.fromValues(0,0,1);
		var vecAux = vec3.create();
		var normaTangente;

		while(u <= curvaRecorrido.maxU)
		{
			punto = curvaRecorrido.CurvaCubica(u);
			puntosRecorrido.push(punto);
			tangente = curvaRecorrido.CurvaCubicaDerivadaPrimera(u);
			normaTangente = Math.sqrt(Math.pow(tangente[0],2)+Math.pow(tangente[1],2)+Math.pow(tangente[2],2));
			tangente = [-tangente[0]/normaTangente, tangente[1]/normaTangente, -tangente[2]/normaTangente];
			normal = vec3.create();
			vec3.cross(vecAux,ejeZ,tangente);
			normaVecAux = Math.sqrt(Math.pow(vecAux[0],2)+Math.pow(vecAux[1],2)+Math.pow(vecAux[2],2));
			vecAux = [vecAux[0]/normaVecAux, vecAux[1]/normaVecAux, vecAux[2]/normaVecAux];
			vec3.cross(normal,vecAux,tangente);
			normaNormal = Math.sqrt(Math.pow(normal[0],2)+Math.pow(normal[1],2)+Math.pow(normal[2],2));
			normal = [normal[0]/normaNormal, normal[1]/normaNormal, normal[2]/normaNormal];
			base = [normal,vecAux,tangente];
			basesRecorrido.push(base);
			u += paso;
		}

		SupBarrido.prototype.initialize.call(this, poligono, puntosRecorrido, basesRecorrido);

	}
})

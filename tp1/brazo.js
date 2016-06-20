var Brazo = SupBarrido.extend({
	initialize: function(angulo)
	{
		
		var poligono = new Poligono();
		var puntos = [[0,1,0], [1,1,0], [1,1,0], [1,0,0], [1,-1,0], [1,-1,0], [0,-1,0], [-1,-1,0], [-1,-1,0], [-1,0,0], [-1,1,0], [-1,1,0], [0,1,0]];
		poligono.setPuntos(puntos);
		var tangentes = [[0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1]];
		poligono.setTangentes(tangentes);
		var normales = [[0,1,0], [0,1,0], [1,0,0], [1,0,0], [1,0,0], [0,-1,0], [0,-1,0], [0,-1,0], [-1,0,0], [-1,0,0], [-1,0,0], [0,1,0], [0,1,0]];
		poligono.setNormales(normales);
		poligono.setCentro([0,0,0]);
		poligono.setBase([[1,0,0],[0,1,0],[0,0,1]]);
	
		
		var puntosRecorrido = [[3,0,-6],[2,0,-5],[1,0,-4],[0,0,-3],[0,0,-2],[0,0,-1],[0,0,0],[0,0,1],[0,0,2],[0,0,3],[1,0,4],[2,0,5],[3,0,6]];
		var basesRecorrido = [ [[0.71,0,0.71],[0,1,0],[0.71,0,-0.71]], [[0.71,0,0.71],[0,1,0],[0.71,0,-0.71]], [[0.71,0,0.71],[0,1,0],[0.71,0,-0.71]],
								[[1,0,0],[0,1,0],[0,0,1]], [[1,0,0],[0,1,0],[0,0,1]], [[1,0,0],[0,1,0],[0,0,1]], [[1,0,0],[0,1,0],[0,0,1]], 
								[[1,0,0],[0,1,0],[0,0,1]], [[1,0,0],[0,1,0],[0,0,1]], [[1,0,0],[0,1,0],[0,0,1]], [[0.71,0,-0.71],[0,1,0],[-0.71,0,-0.71]],
								[[0.71,0,-0.71],[0,1,0],[-0.71,0,-0.71]], [[0.71,0,-0.71],[0,1,0],[-0.71,0,-0.71]]  ];
		
		SupBarrido.prototype.initialize.call(this, poligono, puntosRecorrido, basesRecorrido);
		
		rotacion = mat4.create();
		mat4.rotate(rotacion,rotacion,angulo,[1,0,0]);
		this.applyMatrix(rotacion);
		
		this.useTexture = 0.0;

		//Turbinas

		var transformacion1 = mat4.create();
		var turbina1 = new Turbina(0.05);
		mat4.translate(transformacion1,transformacion1,[3.7,0.0,6.8]);
		mat4.rotate(transformacion1,transformacion1,-angulo,[1,0,0]);
		mat4.scale(transformacion1,transformacion1,[2,2.5,2]);
		turbina1.applyMatrix(transformacion1);
		this.addDependencie(turbina1);
		
		var transformacion2 = mat4.create();
		var turbina2 = new Turbina(0.05,-angulo);
		mat4.translate(transformacion2,transformacion2,[3.7,0.0,-6.8]);
		mat4.rotate(transformacion2,transformacion2,-angulo,[1,0,0]);
		mat4.scale(transformacion2,transformacion2,[2,2.5,2]);
		turbina2.applyMatrix(transformacion2);
		this.addDependencie(turbina2);

	
	},
})

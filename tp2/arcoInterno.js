var ArcoInterno = SupBarrido.extend({
	initialize: function(puntosRecorrido, basesRecorrido)
	{

		//curva = new CurvaBezier([[-4,2,0],[-3.2,2.2,0],[3.2,2.2,0],[4,2,0],[4,1,0],[4,-1,0],[4,-2,0],[2,-2,0],[-2,-2,0],[-4,-2,0],[-4,-1,0],[-4,1,0],[-4,2,0]]);
		this.curva = new CurvaBezier([ [-0.5,0.25,0], [-0.3,0.5,0], [0.3,0.5,0], [0.5,0.25,0], [0.5,0.13,0], [0.5,-0.04,0], [0.5,-0.25,0], [0.17,-0.25,0], [-0.16,-0.25,0], [-0.5,-0.25,0], [-0.5,-0.04,0], [-0.5,0.13,0], [-0.5,0.25,0] ]);

		poligono = new Poligono();
		poligono.generarConCurva(this.curva,0.05);
		
		SupBarrido.prototype.initialize.call(this, poligono, puntosRecorrido, basesRecorrido);
	
		this.useTexture = 0.0;

	},
})

var Arco = SupBarrido.extend({
	initialize: function()
	{

		curva = new CurvaBezier([ [-0.75,0.20,0], [-0.63,0.75,0], [0.63,0.75,0], [0.75,0.20,0], [0.71,0.20,0], [0.67,0.20,0], [0.63,0.20,0], [0.69,0.1,0], [0.69,-0.1,0], [0.63,-0.2,0], 
			[0.67,-0.2,0], [0.71,-0.2,0], [0.75,-0.2,0], [0.63,-0.75,0], [-0.63,-0.75,0], [-0.75,-0.20,0], [-0.71,-0.2,0], [-0.67,-0.2,0], [-0.63,-0.20,0], [-0.69,-0.1,0], [-0.69,0.1,0], [-0.63,0.2,0], 
			[-0.67,0.2,0], [-0.71,0.2,0], [-0.75,0.2,0] ]);

		poligono = new Poligono();
		poligono.generarConCurva(curva,0.05);
	
		puntosRecorrido = [[0,0,0],[0,0,1],[0,0,2]];
		basesRecorrido = [[[1,0,0],[0,1,0],[0,0,1]], [[1,0,0],[0,1,0],[0,0,1]],[[1,0,0],[0,1,0],[0,0,1]]];
		
		
		SupBarrido.prototype.initialize.call(this, poligono, puntosRecorrido, basesRecorrido);
	
		this.useTexture = 0.0;
	
	},
})

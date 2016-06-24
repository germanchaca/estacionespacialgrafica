var Galaxia = Conjunto.extend({
	initialize: function(distancia)
	{
		Conjunto.prototype.initialize.call(this);

		var universo = new Paleta(5,5,100,100);
		universo.initTexture("maps/sky.jpg");

		var matUniverso = mat4.create();
		mat4.translate(matUniverso,matUniverso,[0,0,distancia ]);
		mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
		mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
		universo.applyMatrix(matUniverso);
		this.add(universo);

		var matUniverso = mat4.create();
		var universo = new Paleta(5,5,100,100);
		universo.initTexture("maps/sky.jpg");
		mat4.translate(matUniverso,matUniverso,[0,0,-distancia *2]);
		universo.applyMatrix(matUniverso);
		this.add(universo);

		var matUniverso = mat4.create();
		var universo = new Paleta(5,5,100,100);
		universo.initTexture("maps/sky.jpg");
		mat4.rotateY(matUniverso,matUniverso,Math.PI/2);
		mat4.translate(matUniverso,matUniverso,[0,0,distancia]);
		mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
		mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
		universo.applyMatrix(matUniverso);
		this.add(universo);

		var matUniverso = mat4.create();
		var universo = new Paleta(5,5,100,100);
		universo.initTexture("maps/sky.jpg");
		mat4.rotateY(matUniverso,matUniverso,Math.PI/2);
		mat4.translate(matUniverso,matUniverso,[0,0,-distancia]);
		mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
		mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
		universo.applyMatrix(matUniverso);
		this.add(universo);

		var matUniverso = mat4.create();
		var universo = new Paleta(5,5,100,100);
		universo.initTexture("maps/sky.jpg");
		mat4.rotateX(matUniverso,matUniverso,Math.PI/2);
		mat4.translate(matUniverso,matUniverso,[0,0,distancia]);
		mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
		mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
		universo.applyMatrix(matUniverso);
		this.add(universo);

		var matUniverso = mat4.create();
		var universo = new Paleta(5,5,100,100);
		universo.initTexture("maps/sky.jpg");
		mat4.rotateX(matUniverso,matUniverso,Math.PI/2);
		mat4.translate(matUniverso,matUniverso,[0,0,-distancia]);
		mat4.scale(matUniverso,matUniverso,[distancia*2,distancia*2,1]);
		mat4.translate(matUniverso,matUniverso,[-0.5,-0.5,0]);
		universo.applyMatrix(matUniverso);
		this.add(universo);
/*

		var transformacion = mat4.create();
		var placa = new Paleta(5,5,100,100);
		placa.initTexture("maps/sky.jpg");
		mat4.translate(transformacion,transformacion,[0,0,500])
		mat4.rotate(transformacion,transformacion,0*Math.PI/2,[0,1,0]);
		mat4.scale(transformacion,transformacion,[100,100,100]);	
		placa.applyMatrix(transformacion);
		this.add(placa);

		var transformacion = mat4.create();
		var placa = new Paleta(5,5,100,100);
		placa.initTexture("maps/sky.jpg");
		mat4.translate(transformacion,transformacion,[500,0,0])
		mat4.rotate(transformacion,transformacion,1*Math.PI/2,[0,1,0]);
		mat4.scale(transformacion,transformacion,[100,100,100]);	
		placa.applyMatrix(transformacion);
		this.add(placa);

		var transformacion = mat4.create();
		var placa = new Paleta(5,5,100,100);
		placa.initTexture("maps/sky.jpg");
		mat4.translate(transformacion,transformacion,[0,0,-500])
		mat4.rotate(transformacion,transformacion,2*Math.PI/2,[0,1,0]);
		mat4.scale(transformacion,transformacion,[100,100,100]);	
		placa.applyMatrix(transformacion);
		this.add(placa);

		var transformacion = mat4.create();
		var placa = new Paleta(5,5,100,100);
		placa.initTexture("maps/sky.jpg");
		mat4.translate(transformacion,transformacion,[-500,0,0])
		mat4.rotate(transformacion,transformacion,3*Math.PI/2,[0,1,0]);
		mat4.scale(transformacion,transformacion,[100,100,100]);	
		placa.applyMatrix(transformacion);
		this.add(placa);

		var transformacion = mat4.create();
		var placa = new Paleta(5,5,100,100);
		placa.initTexture("maps/sky.jpg");
		mat4.translate(transformacion,transformacion,[0,500,0])
		mat4.rotate(transformacion,transformacion,1*Math.PI/2,[1,0,0]);
		mat4.scale(transformacion,transformacion,[100,100,100]);	
		placa.applyMatrix(transformacion);
		this.add(placa);

		var transformacion = mat4.create();
		var placa = new Paleta(5,5,100,100);
		placa.initTexture("maps/sky.jpg");
		mat4.translate(transformacion,transformacion,[0,-500,0])
		mat4.rotate(transformacion,transformacion,-1*Math.PI/2,[1,0,0]);
		mat4.scale(transformacion,transformacion,[100,100,100]);	
		placa.applyMatrix(transformacion);
		this.add(placa);
*/
	}
})
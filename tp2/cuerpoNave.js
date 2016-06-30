var CuerpoNave = Geometria.extend({
	initialize: function()
	{
		

		this.puntos = [ [[-10,0.7,1.5], [-4.5,2,2], [-1.5,3.3,2.5], [4,4,3], [7.5,3.5,2], [8.5,3.4,2]],
						[[-10,0.35,1.75], [-4.75,1,2], [-1.5,2,3], [4,2.5,3.5], [7.5,1.75,3], [9.5,1.5,2]],
						[[-10,0,2], [-5,0,2.5], [-1.5,0,3], [4,0,3], [7.5,0,2.5], [10,0,2.5]],
						[[-9.5,-0.75,1.5], [-4.75,-1.5,2], [-1.5,-2,2.5], [4,-2,2.5], [7.5,-1,2], [9.5,-1,2]],
						[[-9.5,-0.75,-1.5], [-4.75,-1.5,-2], [-1.5,-2,-2.5], [4,-2,-2.5], [7.5,-1,-2], [9.5,-1,-2]],
						[[-10,0,-2], [-5,0,-2.5], [-1.5,0,-3], [4,0,-3], [7.5,0,-2.5], [10,0,-2.5]],
						[[-10,0.35,-1.75], [-4.75,1,-2], [-1.5,2,-3], [4,2.5,-3.5], [7.5,1.75,-3], [9.5,1.5,-2]],
						[[-10,0.7,-1.5], [-4.5,2,-2], [-1.5,3.3,-2.5], [4,4,-3], [7.5,3.5,-2], [8.5,3.4,-2]],
						[[-10,0.7,1.5], [-4.5,2,2], [-1.5,3.3,2.5], [4,4,3], [7.5,3.5,2], [8.5,3.4,2]] ];

		this.normales = [ [[0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0]],
						[[0,1,1], [0,1,1], [0,1,1], [0,1,1], [0,1,1], [0,1,1]],
						[[0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1], [0,0,1]],
						[[0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0]],
						[[0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0]],
						[[0,1,-1], [0,1,-1], [0,1,-1], [0,1,-1], [0,1,-1], [0,1,-1]],
						[[0,0,-1], [0,0,-1], [0,0,-1], [0,0,-1], [0,0,-1], [0,0,-1]],
						[[0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0]],
						[[0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0]] ];

		this.tangentes = [ [[0.8,0.2,0], [1,0,0], [1,0,0], [0.8,0.2,0], [0.8,0.2,0], [0.6,-0.4,0]],
						[[1,0,0], [1,0,0], [1,0,0], [1,0,0], [1,0,0], [1,0,0]],
						[[1,0,0], [1,0,0], [1,0,0], [1,0,0], [1,0,0], [1,0,0]],
						[[1,0,0], [1,0,0], [1,0,0], [1,0,0], [1,0,0], [1,0,0]],
						[[0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0], [0,-1,0]],
						[[0,1,-1], [0,1,-1], [0,1,-1], [0,1,-1], [0,1,-1], [0,1,-1]],
						[[0,0,-1], [0,0,-1], [0,0,-1], [0,0,-1], [0,0,-1], [0,0,-1]],
						[[0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0]],
						[[0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0], [0,1,0]] ];  //CORREGIR TANGENTES
						

		Geometria.prototype.initialize.call(this);
		this.initTexture("maps/dorado.jpg");
		this.initReflexMap("maps/refMap.jpg");


		var tapaTrasera = new TapaNaveTrasera();
		this.addDependencie(tapaTrasera);

		var tapaDelantera = new TapaNaveDelantera();
		this.addDependencie(tapaDelantera);

		var ventana = new Paleta(4,3,10,10);
		var transformacion = mat4.create();
		mat4.translate(transformacion,transformacion,[-2.8,2.90,0]);
		mat4.rotate(transformacion,transformacion,-0.365*Math.PI,[0,0,1]);
		mat4.rotate(transformacion,transformacion,0.5*Math.PI,[0,1,0]);
		ventana.applyMatrix(transformacion);
		ventana.setColor([0.1,0.1,0.05]);

		this.addDependencie(ventana);

		this.useTexture = 0.0;
	
	},

	
	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLES; 
		this.tangent_buffer = []; 

		this.cols = 6;
		this.rows = 9;

		var punto,normal;
			
		for (row = 0; row < this.rows; row++)
		{
			for (col = 0; col < this.cols; col++)
			{
				punto = this.puntos[row][col];
				normal = this.normales[row][col];
				tangente = vec3.fromValues(0,0,0);
				
				this.position_buffer.push(punto[0]);
				this.position_buffer.push(punto[1]);
				this.position_buffer.push(punto[2]);

				this.color_buffer.push(0.9);
				this.color_buffer.push(0.9); //Color default
				this.color_buffer.push(0.9);

				this.tangent_buffer.push(0);
				this.tangent_buffer.push(0);
				this.tangent_buffer.push(0); //Falta tangente
				
				this.normals_buffer.push(normal[0]);
				this.normals_buffer.push(normal[1]); 
				this.normals_buffer.push(normal[2]);

				binormal = vec3.create();
				vec3.cross(binormal,tangente,normal);
				this.binormal_buffer.push(binormal[0]);
				this.binormal_buffer.push(binormal[1]);
				this.binormal_buffer.push(binormal[2]);

				this.texture_coord_buffer.push(0.0);
				this.texture_coord_buffer.push(0.0);
				this.texture_coord_buffer.push(0.0);
			}
		}
	
	}
})

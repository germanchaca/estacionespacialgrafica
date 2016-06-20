var TapaNaveDelantera = Geometria.extend({
	initialize: function()
	{
		
		this.puntos = [ [[-10,0.7,1.5],[-10,0.35,1.75],[-10,0,2],[-9.5,-0.75,1.5]],
						[[-10,0.7,0],[-10,0.35,0],[-10,0,0],[-9.5,-0.75,0]],
						[[-10,0.7,-1.5],[-10,0.35,-1.75],[-10,0,-2],[-9.5,-0.75,-1.5]] ];

		this.normal = [-1,0,0];
		
		Geometria.prototype.initialize.call(this);

		this.useTexture = 0.0;
	
	},

	createGrid: function()
	{
		this.draw_mode=gl.TRIANGLE_STRIP; 
		this.tangent_buffer = []; 

		this.cols = 4;
		this.rows = 3;

		var punto;
			
		for (row = 0; row < this.rows; row++)
		{
			for (col = 0; col < this.cols; col++)
			{
				punto = this.puntos[row][col];
				
				this.position_buffer.push(punto[0]);
				this.position_buffer.push(punto[1]);
				this.position_buffer.push(punto[2]);

				this.color_buffer.push(0.9);
				this.color_buffer.push(0.9); //Color default
				this.color_buffer.push(0.9);

				this.tangent_buffer.push(0);
				this.tangent_buffer.push(0);
				this.tangent_buffer.push(0); //Falta tangente
				
				this.normals_buffer.push(this.normal[0]);
				this.normals_buffer.push(this.normal[1]); 
				this.normals_buffer.push(this.normal[2]);

				this.texture_coord_buffer.push(0.0);
				this.texture_coord_buffer.push(0.0);
			}
		}
	
	}
})
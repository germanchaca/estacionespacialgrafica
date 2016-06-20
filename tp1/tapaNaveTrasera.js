var TapaNaveTrasera = Geometria.extend({
	initialize: function()
	{
		
		this.puntos = [ [[8.5,3.4,2], [9.5,1.5,2], [10,0,2.5], [9.5,-1,2]],
						[[8.5,3.4,0], [9.5,1.5,0], [10,0,0], [9.5,-1,0]],
						[[8.5,3.4,-2], [9.5,1.5,-2], [10,0,-2.5], [9.5,-1,-2]] ];

		this.normal = [1,0,0];
		
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
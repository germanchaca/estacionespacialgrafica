var TexturedSphere = Geometria.extend({
	initialize: function(latitude_bands,longitude_bands,inv_normals)
	{
		this.rows = latitude_bands;
        this.cols = longitude_bands;
        this.inv_normals = inv_normals;

		
		Geometria.prototype.initialize.call(this);
		
		this.useTexture = 0.0;
		this.draw_mode = gl.TRIANGLES;
	},

	createGrid: function()
	{
		var latNumber;
        var longNumber;

        var factorNormales = 1;
        if (this.inv_normals)
        	factorNormales = -1;
        for (latNumber=0; latNumber <= this.rows; latNumber++) 
        {
            var theta = latNumber * Math.PI / this.rows;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (longNumber=0; longNumber <= this.cols; longNumber++) 
            {
                var phi = longNumber * 2 * Math.PI / this.cols;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1.0 - (longNumber / this.cols);
                var v = 1.0 - (latNumber / this.rows);

                normal = vec3.fromValues(x,y,z)*factorNormales;
                this.normals_buffer.push(normal[1]);
                this.normals_buffer.push(normal[2]);
                this.normals_buffer.push(normal[3]);

                tangente = vec3.fromValues(0,0,0); //CORREGIR
                this.tangent_buffer.push(tangente[0]);
                this.tangent_buffer.push(tangente[1]);
                this.tangent_buffer.push(tangente[2]);

                binormal = vec3.create();
                vec3.cross(binormal,tangente,normal);
                this.binormal_buffer.push(binormal[0]);
                this.binormal_buffer.push(binormal[1]);
                this.binormal_buffer.push(binormal[2]);

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                this.texture_coord_buffer.push(0);

                this.position_buffer.push(x);
                this.position_buffer.push(y);
                this.position_buffer.push(z);
            
                this.color_buffer.push(1.0);
                this.color_buffer.push(1.0);
                this.color_buffer.push(1.0);
            }
        }

        // Buffer de indices de los triangulos
      /*  this.index_buffer = [];
      
        for (latNumber=0; latNumber < this.rows; latNumber++) 
        {
            for (longNumber=0; longNumber < this.cols; longNumber++) 
            {
                var first = (latNumber * (this.cols + 1)) + longNumber;
                var second = first + this.rows + 1;
                this.index_buffer.push(first);
                this.index_buffer.push(second);
                this.index_buffer.push(first + 1);

                this.index_buffer.push(second);
                this.index_buffer.push(second + 1);
                this.index_buffer.push(first + 1);
            }
        }
        */
	},

	createIndexBuffer: function()
	{
		this.index_buffer = [];
      
        for (latNumber=0; latNumber < this.rows; latNumber++) 
        {
            for (longNumber=0; longNumber < this.cols; longNumber++) 
            {
                var first = (latNumber * (this.cols + 1)) + longNumber;
                var second = first + this.rows + 1;
                this.index_buffer.push(first);
                this.index_buffer.push(second);
                this.index_buffer.push(first + 1);

                this.index_buffer.push(second);
                this.index_buffer.push(second + 1);
                this.index_buffer.push(first + 1);
            }
        }
        
	},

})
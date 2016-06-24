/****************************************
Geometria
Esta clase representa un objeto que se dibuja en pantalla
****************************************/

var Geometria = Base.extend({

	initialize: function()
	{
	this.draw_mode = gl.TRIANGLE_STRIP;
	this.dependencies = [];

	this.texture = null;
	this.useTexture = 0.0;
	
	// buffers
	this.position_buffer = [];
	this.color_buffer = [];
	this.index_buffer = [];
	this.normals_buffer = [];
	this.texture_coord_buffer = [];
	
	this.model_matrix = mat4.create();
	
	this.webgl_position_buffer = null;
	this.webgl_color_buffer = null;
	this.webgl_index_buffer = null;
	this.webgl_normals_buffer = null;
	this.webgl_texture_coord_buffer = null;
	
	this.tangent_buffer = [];
	this.binormal_buffer = [];
	
	this.webgl_tangent_buffer = null;
	this.webgl_binormal_buffer = null;

	this.useLights = true;

	this.ka = 0.2;
	this.kd = 0.5;
	this.ks = 0.3;
	this.shininess = 0.01;
	this.color_diffuse = 0.7;
	this.color_specular = vec3.fromValues(0.1,0.1,0.1);
	this.reflectiveness = 0.3;

	this.useNormalMap = false;
	this.normalMap = null;
	this.useReflexMap = false;
	this.reflexMap = null;
	this.useDiffuseMap = false;
	this.diffuseMap = null;
	this.useIlumMap = false;
	this.ilumMap = null;

	this.createGrid();//crea grilla del objeto - ES PROPIO DE CADA OBJETO QUE HEREDE DE ESTA CLASE
	this.createIndexBuffer(); //crea el index buffer
	this.setupWebGLBuffers();
	},

	/*clone: function()
	{
		var clon = new Geometria();
		clon.position_buffer = this.position_buffer.slice(0);
		clon.color_buffer = this.color_buffer.slice(0);
		return clon;
	},
	*/
	moveVertex: function(i, x, y, z)
	{
		this.position_buffer.splice(i, 3, x, y, z);
	},


	applyMatrix: function(matrix) 
	{
		mat4.multiply(this.model_matrix, matrix, this.model_matrix);
	},

	addDependencie: function(geom) 
	{
		this.dependencies.push(geom);
	},
	
	getCenter: function(m) 
	{
		var cantidadVertices = this.position_buffer.length/3.0;
		var x_centro = 0, y_centro = 0, z_centro = 0;
		for ( var i = 0, l = this.position_buffer.length; i < l; i+=3 ) {
			x_centro += this.position_buffer[i];
			y_centro += this.position_buffer[i+1];
			z_centro += this.position_buffer[i+2];
		}
		x_centro = x_centro / cantidadVertices;
		y_centro = y_centro / cantidadVertices;
		z_centro = z_centro / cantidadVertices;
		var centro = vec3.fromValues(x_centro, y_centro, z_centro);
		var centro_mod = vec3.create();
		if(m === undefined) m = mat4.create();
		var m_final = mat4.create();
		mat4.multiply(m_final, m, this.model_matrix);
		vec3.transformMat4(centro_mod, centro, m_final);
		return centro_mod;
	},
	
	setTransform: function(matrix) 
	{
		mat4.copy(this.model_matrix, matrix);
	},
	
	// las clases que heredan deben redefinir esta funcion
	createGrid: function(){	},
	
	// crea indices para la figura
	createIndexBuffer: function(){

	if(this.draw_mode == gl.LINE_STRIP)
	{
		for (var i = 0.0; i < this.cols; i++)
		{
			this.index_buffer.push(i);
		}
	}
	else if(this.draw_mode == gl.TRIANGLES){
		for (var i = 0.0; i < this.rows-1; i++) {
			for (var j = 0.0; j < this.cols-1; j++) {
				v0 = (i * this.cols) + j;
				v1 = (i * this.cols) + j + 1;
				v2 = ((i + 1) * this.cols) + j;
				v3 = ((i + 1) * this.cols) + j + 1;
				this.index_buffer.push(v0);
				this.index_buffer.push(v1);
				this.index_buffer.push(v2);
				this.index_buffer.push(v1);
				this.index_buffer.push(v2);
				this.index_buffer.push(v3);
			}
		}
	} 
	else if(this.draw_mode == gl.TRIANGLE_STRIP)
		{
			//Triangle strip
			var i = 0.0, j = 0.0, j_add = 1.0, j_add_anterior = 0, i_add = 0;
			while(true)
			{
				if((i != 0 && j == 0) || j == this.cols-1)
				{
					j_add = -1 * j_add;
					i++;
				}
				//Condicion de corte
				if(i >= this.rows-1)
				{
					break;
				}
				var v0, v1, v2, v3, v4;
																
				if(j_add > 0)
				{
					v0 = (i * this.cols) + j;
					v1 = (i * this.cols) + j + 1;
					v2 = ((i + 1) * this.cols) + j;
					v3 = ((i + 1) * this.cols) + j + 1;
					v4 = v3 + this.rows;
		
					if(j == 0)
					{
						this.index_buffer.push(v0);
						this.index_buffer.push(v2);
					}
					this.index_buffer.push(v1);
					this.index_buffer.push(v3);
				} 
				else if (j_add < 0)
				{	
					v0 = (i * this.cols) + j - 1;
					v1 = (i * this.cols) + j;
					v2 = ((i + 1) * this.cols) + j - 1;
					v3 = ((i + 1) * this.cols) + j;
					v4 = v3 + this.rows;
			
					if(j == this.cols-1)
					{
						this.index_buffer.push(v1);
						this.index_buffer.push(v3);
					}
					this.index_buffer.push(v0);
					this.index_buffer.push(v2);
				}
				i+=i_add;
				j+=j_add;
			}
		}
	},

	initNormalMap: function(map_file)
	{
		this.useNormalMap = true;
		this.normalMap = this.loadMap(map_file);
	},
/*
	initDiffuseMap: function(map_file)
	{
		this.useDiffuseMap = true;
		this.diffuseMap = this.loadMap(map_file);
	},
*/	
/*	initIlumMap: function(map_file)
	{
		this.useIlumMap = true;
		this.ilumMap = this.loadMap(map_file);
	},
*/
	initReflexMap: function(map_file)
	{
		this.useReflexMap = true;
		this.reflexMap = this.loadMap(map_file);
	},

	initTexture: function(texture_file)
	{
		this.texture = this.loadMap(texture_file);
	},

	loadMap: function(map_file)
	{
        var aux_texture = gl.createTexture();
        var texture = aux_texture;
        texture.image = new Image();

        var that = this;

        texture.image.onload = function () 
        {
        	that.handleLoadedTexture(texture)
        }
        texture.image.src = map_file;
    	return texture;
    },

    handleLoadedTexture: function(texture) 
    {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
        //Agregar return texture?
    },
	
	setColor: function(color)
	{
		for(var i = 0; i < this.color_buffer.length; i+=3)
		{
			this.color_buffer.splice(i, 3, color[0], color[1], color[2]);
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
	},
	
	setupWebGLBuffers: function(){

		this.webgl_position_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
		this.webgl_position_buffer.itemSize = 3;
        this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

		// información del color
		this.webgl_color_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);   
		this.webgl_color_buffer.itemSize = 3;
        this.webgl_color_buffer.numItems = this.color_buffer.length / 3;

        //Texturas
        this.webgl_texture_coord_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coord_buffer), gl.STATIC_DRAW);
        this.webgl_texture_coord_buffer.itemSize = 2;
        this.webgl_texture_coord_buffer.numItems = this.texture_coord_buffer.length / 2;

		//Indices
		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
		this.webgl_index_buffer.itemSize = 1;
        this.webgl_index_buffer.numItems = this.index_buffer.length;
		
		// información de las normales
		this.webgl_normals_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normals_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals_buffer), gl.STATIC_DRAW); 
		this.webgl_normals_buffer.itemSize = 3;
        this.webgl_normals_buffer.numItems = this.normals_buffer.length / 3;

		//información de las tangentes
		if(this.tangent_buffer != null)
		{
			this.webgl_tangent_buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);
			this.webgl_tangent_buffer.itemSize = 3;
        	this.webgl_tangent_buffer.numItems = this.tangent_buffer.length / 3;
		}
		
		// binormales
		if(this.binormal_buffer != null)
		{
			this.webgl_binormal_buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);
			this.webgl_binormal_buffer.itemSize = 3;
        	this.webgl_binormal_buffer.numItems = this.binormal_buffer.length / 3;
		}
	},

	//dibujar el VertexGrid. render
	draw: function(m)
	{
		gl.uniform1f(glProgram.UseTexture, this.useTexture);

        gl.uniform1i(glProgram.uUseNormalMap, this.useNormalMap);
        gl.uniform1i(glProgram.uUseReflection, this.useReflexMap);
        gl.uniform1i(glProgram.uUseLights, this.useLights);

        gl.uniform1f(glProgram.uKa, this.ka);
        gl.uniform1f(glProgram.uKd, this.kd);
        gl.uniform1f(glProgram.uKs, this.ks);
        gl.uniform1f(glProgram.uShininess, this.shininess);
        gl.uniform1f(glProgram.uReflectiveness, this.reflectiveness);

       	gl.uniform3fv(glProgram.uColorSpecular, this.color_specular);
                

		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(glProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.vertexAttribPointer(glProgram.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_texture_coord_buffer);
        gl.vertexAttribPointer(glProgram.textureCoordAttribute, this.webgl_texture_coord_buffer.itemSize, gl.FLOAT, false, 0, 0);

   		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normals_buffer);
		gl.vertexAttribPointer(glProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

		gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(glProgram.uSampler, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.normalMap);
        gl.uniform1i(glProgram.uNormalSampler, 1);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.reflexMap);
        gl.uniform1i(glProgram.uCubeSampler, 2);
		
        var model_matrix_final = mat4.create();
		mat4.multiply(model_matrix_final, m, this.model_matrix);
		gl.uniformMatrix4fv(glProgram.ModelMatrixUniform, false, model_matrix_final); //le pasa al programa de vertices la matriz de modelado del objeto

        var normals_matrix = mat4.create();
        mat4.invert(normals_matrix, model_matrix_final);
		mat4.transpose(normals_matrix, normals_matrix);
		gl.uniformMatrix4fv(glProgram.nMatrixUniform, false, normals_matrix);

		//gl.bindTexture(gl.TEXTURE_2D, this.texture);
		
		if(this.webgl_tangent_buffer != null)
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
			gl.vertexAttribPointer(glProgram.vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);
		}
		
		if(this.webgl_binormal_buffer != null)
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
			gl.vertexAttribPointer(glProgram.vertexBinormalAttribute, 3, gl.FLOAT, false, 0, 0);
		}
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

		// Dibuja
		gl.drawElements(this.draw_mode, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
		/*gl.disableVertexAttribArray(vertexPositionAttribute);
		gl.disableVertexAttribArray(vertexColorAttribute);
		gl.disableVertexAttribArray(vertexNormalAttribute);
		gl.disableVertexAttribArray(vertexTangentAttribute);
		gl.disableVertexAttribArray(vertexBinormalAttribute);
*/
		//Dibuja a sus dependencias
		for(var i = 0; i < this.dependencies.length; i+=1)
		{
			this.dependencies[i].draw(model_matrix_final);
		}
	}
})

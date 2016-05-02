/****************************************
ObjetoGrafico
Esta clase representa un objeto que se dibuja en pantalla
****************************************/

var ObjetoGrafico = function() {
	
	if(this.constructor == ObjetoGrafico){
		throw new Error("ObjetoGrafico es abstracta");
	}
	
	this.draw_mode = gl.TRIANGLE_STRIP;
	
	// buffers
	this.position_buffer = [];
	this.color_buffer = [];
	this.index_buffer = [];
	this.normals_buffer = [];
	
	this.model_matrix = mat4.create();
	
	this.webgl_position_buffer = null;
	this.webgl_color_buffer = null;
	this.webgl_index_buffer = null;
	this.webgl_normals_buffer = null;
	
	this.tangent_buffer = null;
	this.binormal_buffer = null;
	
	this.webgl_tangent_buffer = null;
	this.webgl_binormal_buffer = null;
}

ObjetoGrafico.prototype = {
	constructor: ObjetoGrafico,
	
	clone: function(geom){
		if(this.constructor == Geometry){
			throw new Error("Geometry es abstracta, no se puede clonar");
		}
		var clon = new this.constructor();
		clon.position_buffer = this.position_buffer.slice(0);
		clon.color_buffer = this.color_buffer.slice(0);
		return clon;
	},

	init: function(){
		this.createGrid();//crea grilla del objeto - ES PROPIO DE CADA OBJETO QUE HEREDE DE ESTA CLASE
		this.createIndexBuffer(); //crea el index buffer
		this.setupWebGLBuffers(); //hace el 
	},
	
	moveVertex: function(i, x, y, z){
		this.position_buffer.splice(i, 3, x, y, z);
	},


	applyMatrix: function(matrix) {
		mat4.multiply(this.model_matrix, matrix, this.model_matrix);
	},
	
	getCenter: function(m) {
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
	
	setTransform: function(matrix) {
		mat4.copy(this.model_matrix, matrix);
	},
	
	// las clases que heredan deben redefinir esta funcion
	createGrid: function(){	},
	
	// crea indices para la figura
	createIndexBuffer: function(){

	if(this.draw_mode == gl.TRIANGLES){
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
	} else if(this.draw_mode == gl.TRIANGLE_STRIP){
			//Triangle strip
			var i = 0.0, j = 0.0, j_add = 1.0, j_add_anterior = 0, i_add = 0;
			while(true){
				if((i != 0 && j == 0) || j == this.cols-1){
					j_add = -1 * j_add;
					i++;
				}
				//Condicion de corte
				if(i >= this.rows-1){
					break;
				}
				var v0, v1, v2, v3, v4;
																
				if(j_add > 0){
					v0 = (i * this.cols) + j;
					v1 = (i * this.cols) + j + 1;
					v2 = ((i + 1) * this.cols) + j;
					v3 = ((i + 1) * this.cols) + j + 1;
					v4 = v3 + this.rows;
		
					if(j == 0){
						this.index_buffer.push(v0);
						this.index_buffer.push(v2);
					}
					this.index_buffer.push(v1);
					this.index_buffer.push(v3);
				} else if (j_add < 0){	
					v0 = (i * this.cols) + j - 1;
					v1 = (i * this.cols) + j;
					v2 = ((i + 1) * this.cols) + j - 1;
					v3 = ((i + 1) * this.cols) + j;
					v4 = v3 + this.rows;
			
					if(j == this.cols-1){
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
	
	setColor: function(color){
		for(var i = 0; i < this.color_buffer.length; i+=3){
			this.color_buffer.splice(i, 3, color[0], color[1], color[2]);
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);
	},
	
	setupWebGLBuffers: function(){

		this.webgl_position_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);

		// información del color
		this.webgl_color_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.color_buffer), gl.STATIC_DRAW);   

		this.webgl_index_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
		
		// información de las normales
		this.webgl_normals_buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normals_buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals_buffer), gl.STATIC_DRAW); 
		
		//información de las tangentes
		if(this.tangent_buffer != null){
			this.webgl_tangent_buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tangent_buffer), gl.STATIC_DRAW);
		}
		
		// binormales
		if(this.binormal_buffer != null){
			this.webgl_binormal_buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.binormal_buffer), gl.STATIC_DRAW);
		}
	},

	//dibujar el VertexGrid. render
	drawVertexGrid: function(m){

		var vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
		gl.enableVertexAttribArray(vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
		gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		
		var model_matrix_final = mat4.create();
		mat4.multiply(model_matrix_final, m, this.model_matrix);
		gl.uniformMatrix4fv(glProgram.uMMatrix, false, model_matrix_final); //le pasa al programa de vertices la matriz de modelado del objeto
		
		var normals_matrix = mat4.create();
		mat4.invert(normals_matrix, model_matrix_final);
		mat4.transpose(normals_matrix, normals_matrix);
		gl.uniformMatrix4fv(glProgram.uNMatrix, false, normals_matrix);

		var vertexColorAttribute = gl.getAttribLocation(glProgram, "aVertexColor");
		gl.enableVertexAttribArray(vertexColorAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_color_buffer);
		gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
		
		var vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
		gl.enableVertexAttribArray(vertexNormalAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normals_buffer);
		gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
		
		if(this.webgl_tangent_buffer != null){
			var vertexTangentAttribute = gl.getAttribLocation(glProgram, "aVertexTangent");
			gl.enableVertexAttribArray(vertexTangentAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_tangent_buffer);
			gl.vertexAttribPointer(vertexTangentAttribute, 3, gl.FLOAT, false, 0, 0);
		}
		
		if(this.webgl_binormal_buffer != null){
			var vertexBinormalAttribute = gl.getAttribLocation(glProgram, "aVertexBinormal");
			gl.enableVertexAttribArray(vertexBinormalAttribute);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_binormal_buffer);
			gl.vertexAttribPointer(vertexBinormalAttribute, 3, gl.FLOAT, false, 0, 0);
		}
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);

		// Dibuja
		gl.drawElements(this.draw_mode, this.index_buffer.length, gl.UNSIGNED_SHORT, 0);
		gl.disableVertexAttribArray(vertexPositionAttribute);
		gl.disableVertexAttribArray(vertexColorAttribute);
		gl.disableVertexAttribArray(vertexNormalAttribute);
		gl.disableVertexAttribArray(vertexTangentAttribute);
		gl.disableVertexAttribArray(vertexBinormalAttribute);
	}
}

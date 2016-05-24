/****************************************
CONJUNTO
Esta clase sirve para armar conjuntos de objetos
No representa nada que se dibuje, pero dibuja y aplica transformaciones a todos sus objetos
****************************************/

var Conjunto = function() {
	this.matrix_local = mat4.create();
	//this.matrix_normals_local = mat4.create();
	this.objects = [];
	//this.type = 'Conjunto';
}

Conjunto.prototype = {

	constructor: Conjunto,
	
	clone: function(){		
		var clon = new this.constructor();
		clon.matrix_local = mat4.clone(this.matrix_local);
		for(var i = 0; i < this.objects.length; i++){
			clon.add(this.objects[i].clone());
		}
		return clon;
	},
	
	// aplico una matriz de transformacion
	applyMatrix: function(m){
		mat4.multiply(this.matrix_local, m, this.matrix_local);
	},
	
	// setea la matriz de modelado
	setTransform: function(m){
		mat4.copy(this.matrix_local, m);
	},
	
	// devuelve un objeto a partir de su índice
	get: function(i){
		return this.objects[i];
	},
	
	// agrega un objeto
	add: function(object){
		this.objects.push(object);
	},
	
	// borra a un objeto
	remove: function(object){
		var index = this.objects.indexOf(object);
		if(index !== -1){
			this.objects.splice(index, 1);
		}
	},
	
	render: function(m){
		var m_final = mat4.create();
		if(m !== undefined){
			mat4.multiply(m_final, m, this.matrix_local);
		}
		for ( var i = 0, l = this.objects.length; i < l; i ++ ) {
			if(m !== undefined)
				this.objects[i].render(m_final);
			else
				this.objects[i].render(this.matrix_local);
		}
	},
	
	getCenter: function(m){
		if(m === undefined) m = mat4.create();
		var m_final = mat4.create();
		mat4.multiply(m_final, m, this.matrix_local);
		var centro_objetos = vec3.fromValues(0, 0, 0);
		for ( var i = 0, l = this.objects.length; i < l; i ++ ) {
			var centro_objeto = this.objects[i].getCenter(m_final);
			vec3.add(centro_objetos, centro_objetos, centro_objeto);
		}
		vec3.scale(centro_objetos, centro_objetos, 1/this.objects.length);
		return centro_objetos;
	},
	
	setColor: function(color){
		for ( var i = 0, l = this.objects.length; i < l; i ++ ) {
			this.objects[i].setColor(color);
		}
	},
}
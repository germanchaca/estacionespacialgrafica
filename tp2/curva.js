/****************************************
Curva
Esta clase abstracta representa a una curva que se dibuja en pantalla
****************************************/

var Curva = Geometria.extend({
	initialize: function(puntos)
	{
		this.bases = null;
		this.base0 = null;
		this.base1 = null;
		this.base2 = null;
		this.base3 = null;

		this.base0der = null;
		this.base1der = null;
		this.base2der = null;
		this.base3der = null;
		
		this.minU = 0;
		this.maxU = 1;
		
		this.tramos = 1;	//Por defecto, se modifica automaticamente cuando se setean los puntos de control
		this.deltaU = 0.01; //Valor por defecto
							// es el paso de avance sobre la curva cuanto mas chico mayor es el detalle (parametro local, no global)
		this.puntosDeControl = null; //Lista de listas (cada lista interior es un punto xyz)

		

		//Hace falta declarar las rows y cols aca?

		this.setBases();
		this.setPuntosDeControl(puntos);
		Geometria.prototype.initialize.call(this);

		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		var whitePixel = new Uint8Array([255, 255, 255, 255]);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);
		
		this.useTexture = 0.0;
	},
	
	setBases: function(){},

	getIndiceInicialTramo: function(tramo){},
	
	getTramosFromPuntos: function(puntos){},

	setDeltaU: function(delta)
	//el delta debe ser un valor local entre 0 y 1
	{
		if ( (delta > 0) && (delta < 1) )
			this.deltaU = delta;
	},

	setPuntosDeControl: function(puntos)
	//puntos debe ser una lista de puntos, cada punto deberia ser un lista de 3 items (x,y,z)
	{
		var tramos = this.getTramosFromPuntos(puntos);
		this.puntosDeControl = puntos.slice();
		this.maxU = tramos * 1.000;
		this.tramos = tramos;
	},

	CurvaCubica: function(u)
	//u debe ser un valor entre 0 y maxU
	{
		// devuelve un punto de la curva segun el parametro u
		var uLocal = u % 1;
		var tramo = Math.floor(u) + 1;
		var i = this.getIndiceInicialTramo(tramo);

		var p0=this.puntosDeControl[i];
		var p1=this.puntosDeControl[i+1];
		var p2=this.puntosDeControl[i+2];
		var p3=this.puntosDeControl[i+3];

		var punto=[];

		punto.push(this.base0(uLocal) * p0[0] + this.base1(uLocal) * p1[0] + this.base2(uLocal) * p2[0] + this.base3(uLocal) * p3[0]);
		punto.push(this.base0(uLocal) * p0[1] + this.base1(uLocal) * p1[1] + this.base2(uLocal) * p2[1] + this.base3(uLocal) * p3[1]);
		punto.push(this.base0(uLocal) * p0[2] + this.base1(uLocal) * p1[2] + this.base2(uLocal) * p2[2] + this.base3(uLocal) * p3[2]);

		return punto;
	},

	CurvaCubicaDerivadaPrimera: function(u){

		var uLocal = u % 1;
		var tramo = Math.floor(u) + 1;
		var i = this.getIndiceInicialTramo(tramo);

		var p0=this.puntosDeControl[i];
		var p1=this.puntosDeControl[i+1];
		var p2=this.puntosDeControl[i+2];
		var p3=this.puntosDeControl[i+3];

		var punto=[];

		punto.push(this.base0der(uLocal)*p0[0]+this.base1der(uLocal)*p1[0]+this.base2der(uLocal)*p2[0]+this.base3der(uLocal)*p3[0]);
		punto.push(this.base0der(uLocal)*p0[1]+this.base1der(uLocal)*p1[1]+this.base2der(uLocal)*p2[1]+this.base3der(uLocal)*p3[1]);
		punto.push(this.base0der(uLocal)*p0[2]+this.base1der(uLocal)*p1[2]+this.base2der(uLocal)*p2[2]+this.base3der(uLocal)*p3[2]);

		return punto;
	},

	createGrid: function(){

		this.draw_mode=gl.LINE_STRIP; //Estas tres definiciones tienen que estar aca
		this.rows = 1
		this.cols = Math.ceil(this.tramos / this.deltaU);
		var u = 0;
		var col;
		var vec_product = vec3.create();
		var normal = vec3.create();
					
		for (col = 0; col < this.cols; col++)
		{
			var punto=this.CurvaCubica(u);
			this.position_buffer.push(punto[0]);
			this.position_buffer.push(punto[1]);
			this.position_buffer.push(punto[2]);

			this.color_buffer.push(1.0);
			this.color_buffer.push(1.0); //Color default
			this.color_buffer.push(1.0);

			var puntoDer = this.CurvaCubicaDerivadaPrimera(u);
			this.tangent_buffer.push(puntoDer[0]);
			this.tangent_buffer.push(puntoDer[1]);
			this.tangent_buffer.push(puntoDer[2]);
			
			var tangente = vec3.fromValues(puntoDer[0], puntoDer[1], puntoDer[2]);
			var ejez = vec3.fromValues(0,0,1);
			vec3.cross(vec_product,ejez,tangente);
			vec3.cross(normal,vec_product,tangente);

			this.normals_buffer.push(normal.x);
			this.normals_buffer.push(normal.y); //La implementacion de normales solo sirve si Z nunca es paralela a la tangente
			this.normals_buffer.push(normal.z);

			binormal = vec3.create();
			vec3.cross(binormal,tangente,normal);
			this.binormal_buffer.push(binormal[0]);
			this.binormal_buffer.push(binormal[1]);
			this.binormal_buffer.push(binormal[2]);

			this.texture_coord_buffer.push(0.0);
			this.texture_coord_buffer.push(0.0);
			this.texture_coord_buffer.push(0);
			
			u += this.deltaU;
			//if (u==0) ctx.moveTo(punto.x,punto.y);
		}
	
	}
})
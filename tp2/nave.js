var Nave = Conjunto.extend({
	initialize: function(anguloBrazos)
	{
		Conjunto.prototype.initialize.call(this);

		var cuerpoNave = new CuerpoNave();
		this.add(cuerpoNave);
//INICIO variables para movimiento de nave
		posicion=vec3.fromValues(7,0,-10);
		this.TECLA_ARRIBA=0;
		this.TECLA_ABAJO=1;
		this.TECLA_IZQUIERDA=2;
		this.TECLA_DERECHA=3;
		this.TECLA_MAS=4;
		this.TECLA_MENOS=5;
		this.TECLA_GIRO_HORARIO=6;
		this.TECLA_GIRO_ANTIHORARIO=7;
		estadoTeclas = [false,false,false,false,false,false];
		rotacion=mat4.create();
		mat4.identity(rotacion);
		potenciaMotor=0.01;
		velocidad=0;
		angCabezeo=0; // Z
		angRolido=0; // respecto del X de la Nave
		angVirada=0;
		momento=vec3.fromValues(0,0,0);
//FIN variables para movimiento de nave
		var cilindro = new Cilindro(0.1);
		var transformacionCilindro = mat4.create();
		var transformacionBrazo1 = mat4.create();
		var transformacionBrazo2 = mat4.create();
		
		//mat4.rotate(transformacion,transformacion,-0.25*i*Math.PI,[0,1,0]);
		//mat4.rotate(transformacion,transformacion,-0.5*Math.PI,[0,0,1]);
		mat4.translate(transformacionCilindro,transformacionCilindro,[1.2,1.2,3.5]);
		mat4.rotate(transformacionCilindro,transformacionCilindro,-0.5*Math.PI,[1,0,0]);
		mat4.scale(transformacionCilindro,transformacionCilindro,[1,7,1]);
		cilindro.applyMatrix(transformacionCilindro);
		cilindro.setColor([0.1,0.1,0.1]);
		this.add(cilindro);

		var brazo1 = new Brazo(anguloBrazos);
		mat4.translate(transformacionBrazo1,transformacionBrazo1,[1.2,1.25,-4]);
		mat4.rotate(transformacionBrazo1,transformacionBrazo1,Math.PI,[0,0,1]);
		mat4.rotate(transformacionBrazo1,transformacionBrazo1,0.5*Math.PI,[0,1,0]);
		mat4.rotate(transformacionBrazo1,transformacionBrazo1,0.5*Math.PI,[1,0,0]);
		mat4.scale(transformacionBrazo1,transformacionBrazo1,[0.7,0.7,1]);
		brazo1.applyMatrix(transformacionBrazo1);
		this.add(brazo1);

		var brazo2 = new Brazo(-anguloBrazos);
		mat4.translate(transformacionBrazo2,transformacionBrazo2,[1.2,1.25,4]);
		mat4.rotate(transformacionBrazo2,transformacionBrazo2,Math.PI,[0,0,1]);
		mat4.rotate(transformacionBrazo2,transformacionBrazo2,-0.5*Math.PI,[0,1,0]);
		mat4.rotate(transformacionBrazo2,transformacionBrazo2,-0.5*Math.PI,[1,0,0]);
		mat4.scale(transformacionBrazo2,transformacionBrazo2,[0.7,0.7,1]);
		brazo2.applyMatrix(transformacionBrazo2);
		this.add(brazo2);

/*
		var transformacionReceptor = mat4.create();

		//var dobleReceptor = new DobleReceptor(Math.PI*0.5);
		var dobleReceptor = new DobleReceptor(0);
		mat4.translate(transformacionReceptor,transformacionReceptor,[0,6,0]);
		dobleReceptor.applyMatrix(transformacionReceptor);
		this.add(dobleReceptor);
*/

	},
	step: function(){
		
		//console.log("STEP ");
		angCabezeo=0;
		angCabezeo=(estadoTeclas[this.TECLA_ARRIBA])? -0.005:angCabezeo;
		angCabezeo=(estadoTeclas[this.TECLA_ABAJO])?   0.005:angCabezeo;		

		
		angRolido=0;
		angRolido=(estadoTeclas[this.TECLA_GIRO_HORARIO])? -0.005:angRolido;
		angRolido=(estadoTeclas[this.TECLA_GIRO_ANTIHORARIO])?   0.005:angRolido;


		angVirada=0;
		angVirada=(estadoTeclas[this.TECLA_IZQUIERDA])? -0.005:angVirada;
		angVirada=(estadoTeclas[this.TECLA_DERECHA])?   0.005:angVirada;

		angRolido=(estadoTeclas[this.TECLA_DERECHA])? -0.001:angRolido;
		angRolido=(estadoTeclas[this.TECLA_IZQUIERDA])?   0.001:angRolido;


		var impulso=0;
		impulso=(estadoTeclas[this.TECLA_MAS])? 0.1:impulso;
		impulso=(estadoTeclas[this.TECLA_MENOS])? -0.1:impulso;
		console.log("Impulso:" + impulso);

		velocidad+=impulso;

		var ejeX=vec3.fromValues(1,0,0);
		mat4.rotate(rotacion,rotacion,angRolido,ejeX);

		var ejeZ=vec3.fromValues(0,0,1);
		mat4.rotate(rotacion,rotacion,angCabezeo,ejeZ);

		var ejeY=vec3.fromValues(0,1,0);
		mat4.rotate(rotacion,rotacion,angVirada,ejeY);


		var direccion=vec3.fromValues(Math.max(0,velocidad),0,0);
		vec3.transformMat4(direccion,direccion,rotacion);

		var inercia=0.99;
		momento[0]=momento[0]*inercia+direccion[0]*0.0001;
		momento[1]=momento[1]*inercia+direccion[1]*0.0001;
		momento[2]=momento[2]*inercia+direccion[2]*0.0001;

		vec3.add(posicion,posicion,momento);
	},
	
	onTeclaDown: function(tecla){
		console.log("onTeclaDown "+tecla);
		var n=parseInt(tecla);
		if (!isNaN(n)) estadoTeclas[n]=true;
	},
	getPosition: function(){
		return posicion;
	},
	getRotation: function(){
		return rotacion;
	},
	onTeclaUp: function(tecla){
		console.log("onTeclaUp "+tecla);
		var n=parseInt(tecla);
		if (!isNaN(n)) estadoTeclas[n]=false;
		
	}
})
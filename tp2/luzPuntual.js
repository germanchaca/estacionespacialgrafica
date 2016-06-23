/****************************************
LUZ PUNTUAL
Esta clase representa una luz puntual, que emana en todas las direcciones
Puse que se dibuje una esfera en donde esta la luz para que sea mas facil ubicarla
Tiene intensidades (especular, difusa) y contribucion a ambiente
Guarda tambien la posicion de la luz en coordenadas de mundo
****************************************/
var point_index = 0;

var LuzPuntual = Base.extend({
	
	initialize: function(ppos,iip,iia)
	{
		this.index = point_index;
		point_index += 1;
		this.pos = vec3.create();
		this.ip = vec3.create();
		this.ia = vec3.create();
		this.on = true;
		
		if(ppos === undefined)
			ppos = vec3.fromValues(0.0, 0.0, 0.0);
		vec3.copy(this.pos, ppos);
		
		if(iip === undefined)
			iip = vec3.fromValues(1.0, 1.0, 1.0);
		vec3.copy(this.ip, iip);
		
		if(iia === undefined)
			iia = vec3.fromValues(1.0, 1.0, 1.0);
		vec3.copy(this.ia, iia);
	},

	render: function()
	{
		var i = this.index;

		if(!this.on){
			this.reset();
			return;
		}
		
		gl.uniform3fv(glProgram.pointLights[i][0], this.pos);
		
		gl.uniform3fv(glProgram.pointLights[i][1], this.ia);
		
		gl.uniform3fv(glProgram.pointLights[i][2], this.ip);
	},
	
	reset: function()
	{
		var i = this.index;
		
		gl.uniform3fv(glProgram.pointLights[i][1], [0, 0, 0]);
	
		gl.uniform3fv(glProgram.pointLights[i][2], [0, 0, 0]);
	},

	turnOn: function()
	{
		this.on = true;
	},

	turnOff: function()
	{
		this.on = false;
	},
	
})
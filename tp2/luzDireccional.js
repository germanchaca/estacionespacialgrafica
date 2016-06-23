/****************************************
LUZ DIRECCIONAL
Esta clase representa una luz direccional, que emana desde en infinito en una direccion en todo punto
Tiene intensidades (especular, difusa) y contribucion a ambiente
Guarda tambien la direccion de la luz en coordenadas de mundo
****************************************/
var dir_index = 0;

var LuzDireccional = Base.extend({
	initialize: function(dir, iip, iia)
	{
	this.index = dir_index;
	dir_index += 1;
	this.dir = vec3.create();
	this.ip = vec3.create();
	this.ia = vec3.create();
	this.on = true;
	
	if(dir === undefined)
		dir = vec3.fromValues(0.0, 0.0, 1.0);
	vec3.copy(this.dir, dir);
	
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
		if(!this.on)
		{
			this.reset();
			return;
		}
	
		gl.uniform3fv(glProgram.dirLights[i][0], this.dir);

		gl.uniform3fv(glProgram.dirLights[i][1], this.ia);
		
		gl.uniform3fv(glProgram.dirLights[i][2], this.ip);
	},
	
	reset: function()
	{
		var i = this.index;
		gl.uniform3fv(glProgram.dirLights[i][1], [0, 0, 0]);
		
		gl.uniform3fv(glProgram.dirLights[i][2], [0, 0, 0]);
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

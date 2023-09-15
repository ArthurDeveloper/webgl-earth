const canvas = document.querySelector('#webgl-canvas');

const gl = canvas.getContext('webgl');

console.log(gl.canvas.width);
console.log(gl.canvas.height);

gl.canvas.width = window.innerWidth;
gl.canvas.height = window.innerHeight;

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

const circleCoords = [];
const radius = 0.5;

for (let i = 0; i < 2*Math.PI; i += Math.PI/4) {
	circleCoords.push(...[

	]);
}

const vertices = new Float32Array([
	-0.5, -0.5, 0.0,
	0.5, -0.5, 0.0,
	0.0, 0.5, 0.0
]);

const colors = new Float32Array([
	1.0, 0.0, 0.0,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0
]);

const vertexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

const sources = {
	vertex: document.querySelector('#vs').innerHTML,
	fragment: document.querySelector('#fs').innerHTML,
};

const vs = compileShader(gl, sources.vertex, gl.VERTEX_SHADER);
const fs = compileShader(gl, sources.fragment, gl.FRAGMENT_SHADER);
const program = linkShaders(gl, vs, fs);

const positionLocation = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

const colorBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);

const colorLocation = gl.getAttribLocation(program, 'a_Color');
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colorLocation);

gl.useProgram(program);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);

function compileShader(gl, source, type) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log(`Error on shader compilation: ${gl.getShaderInfoLog(shader)}`);
	}

	return shader;
}

function linkShaders(gl, vs, fs) {
	const program = gl.createProgram();
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.log('Couldn\'t link program');
	}

	return program;
}
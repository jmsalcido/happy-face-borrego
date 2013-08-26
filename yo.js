radius = 190;
minRadius = -2.5;
maxRadius = 10;

function fillColors()
{
	var select_boxes = document.getElementsByName("colors");
	var i = 0;
	for(i = 0; i < select_boxes.length; i++) {
		// crear opcion
		var opcion = document.createElement("option");
		opcion.value = "blue";
		opcion.text = "azul";
		select_boxes[i].add(opcion, 0);
		opcion = document.createElement("option");
		opcion.value = "red";
		opcion.text = "rojo";
		select_boxes[i].add(opcion, 1);
		opcion = document.createElement("option");
		opcion.value = "green";
		opcion.text = "verde";
		select_boxes[i].add(opcion, 2);
		opcion = document.createElement("option");
		opcion.value = "black";
		opcion.text = "negro";
		select_boxes[i].add(opcion, 3);
	}
}

// function fillFaces()
// {
// 	var select_box = document.getElementById("faces");
// 	var opcion;
// 	opcion = document.createElement("option");
// 	opcion.text = "Happy";
// 	opcion.value = "happy";
// 	select_box.add(opcion,0);
// 	opcion = document.createElement("option");
// 	opcion.text = "Sad";
// 	opcion.value = "sad";
// 	select_box.add(opcion,1);
// 	opcion = document.createElement("option");
// 	opcion.text = "Poker";
// 	opcion.value = "poker";
// 	select_box.add(opcion,2);
// }

function drawCircle()
{
	var fillColor = "yellow";
	var strokeStyleColor = "black";

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;

	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
	context.fillStyle = fillColor;
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = strokeStyleColor;
	context.stroke();
	context.restore();
}

function drawCoolMouth(incremento, color)
{
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var strokeStyleColor = color;
	var controlX = 250;
	var controlY = 400-parseFloat(incremento);
	var endX = 350;
	var endY = 300;
	context.beginPath();
	context.moveTo(150, 300);
	context.quadraticCurveTo(controlX, controlY, endX, endY);
	context.lineWidth = 5;
	context.strokeStyle = strokeStyleColor;
	context.stroke();
	context.restore();
}

// dibujar la boca dependiendo de un estilo
function drawMouth()
{
	var style = "happy";
	var strokeStyleColor = "black";

	// necesario, podria definirlos globales pero NO.
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	context.beginPath();
	context.strokeStyle = strokeStyleColor;

	// poker face
	if(style == "poker") {
		// solamente nos movemos a la mitad del radio definido
		var midrad = radius/2;

		// dibujamos a la derecha la mitad del radio nuevamente
		context.moveTo(centerX, centerY+midrad);
		context.lineTo(centerX + midrad, centerY+midrad);

		// regresamos al centro y dibujamos a la izquierda la mitad del radio nuevamente
		context.moveTo(centerX, centerY+midrad);
		context.lineTo(centerX - midrad, centerY+midrad);
		context.stroke();
		context.restore();
		return;
	}

	if(style == "happy") {
		var startPointX = centerX;
		var startPointY = centerY;
		context.arc(startPointX, startPointY, radius * 2/3, Math.PI* 1/4, Math.PI * 3/4, false);
		context.stroke();
	} else {
		var startPointX = centerX;
		var startPointY = centerY + radius;
		context.arc(startPointX, startPointY, radius * 2/3, Math.PI * 5/4, Math.PI * 7/4, false);
		context.stroke();
	}

	// liberar el chavo
	context.restore();
}

function drawRightEye(rad, incremento, color)
{
	var strokeStyleColor = "black";
	var fillColor = color;

	// necesario, podria definirlos globales pero NO.
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	context.beginPath();
	context.strokeStyle = strokeStyleColor;

	context.lineWidth = 5;
	incremento = 6+parseFloat(incremento);
	context.arc(centerX+rad, centerY-rad, radius/(incremento), 0, 2*Math.PI, false);
	context.fillStyle = fillColor;
	context.fill();
	context.stroke();
	context.restore();

}

function drawLeftEye(rad, incremento, color)
{
	var strokeStyleColor = "black";
	var fillColor = color;

	// necesario, podria definirlos globales pero NO.
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	context.beginPath();
	context.arc(centerX-rad, centerY-rad, 5, 0, 2*Math.PI, false);
	context.stroke();
	context.restore();
	context.beginPath();
	context.strokeStyle = strokeStyleColor;
	context.lineWidth = 5;
	incremento = 6-parseFloat(incremento);
	context.arc(centerX-rad, centerY-rad, radius/(incremento), 0, 2*Math.PI, false);
	context.fillStyle = fillColor;
	context.fill();
	context.stroke();
	context.restore();
}

function drawEyes(left, lColor, right, rColor) 
{
	var midrad = radius/3;
	drawRightEye(midrad, right, rColor);
	drawLeftEye(midrad, left, lColor);
}

function drawNose(incremento, color)
{
	var strokeStyleColor = color;

	// necesario, podria definirlos globales pero NO.
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	context.beginPath();
	context.strokeStyle = strokeStyleColor;

	incremento = 20 + parseFloat(incremento);
	context.moveTo(centerX-30, centerY+incremento);
	context.lineTo(centerX, centerY);
	context.moveTo(centerX, centerY);
	context.lineTo(centerX+30, centerY+incremento);
	context.stroke();
	context.restore();

}

// draw face

function drawInitialFace()
{
	drawCircle();
	drawNose(0, "black");
	drawEyes(0, "white", 0, "white");
	// esto es lo que cambia nomas...
	drawCoolMouth(0, "black");
}

function drawFace(nose, mouth, left_eye, right_eye)
{
	drawCircle();
	var color = document.getElementById("noseColor").value;
	if(nose == 0) {
		nose = document.getElementById("nose").value;
	}
	drawNose(nose, color);
	if(mouth == 0) {
		mouth = document.getElementById("mouth").value;
	}
	color = document.getElementById("mouthColor").value;
	drawCoolMouth(mouth, color);

		
	if(left_eye == 0) {
		left_eye = document.getElementById("le").value;
	}
	color = document.getElementById("leColor").value;
	if(right_eye == 0) {
		right_eye = document.getElementById("re").value;
	}
	reColor = document.getElementById("reColor").value;
	drawEyes(left_eye, color, right_eye, reColor);
}

function init()
{
	//fillColors();
	//fillFaces();
	drawInitialFace();
}

window.onload = init;
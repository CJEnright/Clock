var canv = document.getElementById("clockCanvas"),
	ctx = canv.getContext("2d");

canv.width = $("#canvDiv").width();
canv.height = $("#canvDiv").height();

var date = new Date(),
	updateTime = 1000;

var clockInterval = setInterval(drawAnalogClock, updateTime);

/*                       ___                       
                        /\_ \                      
   __      ___      __  \//\ \     ___      __     
 /'__`\  /' _ `\  /'__`\  \ \ \   / __`\  /'_ `\   
/\ \L\.\_/\ \/\ \/\ \L\.\_ \_\ \_/\ \L\ \/\ \L\ \  
\ \__/.\_\ \_\ \_\ \__/.\_\/\____\ \____/\ \____ \ 
 \/__/\/_/\/_/\/_/\/__/\/_/\/____/\/___/  \/___L\ \
                                            /\____/
                                            \_/__/*/
function drawAnalogClock() {
	clearCanvas();
	ctx.fillStyle = "#000";
	ctx.lineWidth=canv.height/100;
	ctx.translate(canv.width/2, canv.height/2);
	drawAnalogTicks();
	drawAnalogCircle();
	ctx.lineCap = "round";
	date = new Date();
	drawAnalogHours();
	drawAnalogMins();
	drawAnalogSecs();
	drawAnalogCenterCircle();
}

function drawAnalogCenterCircle() {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle="#000";
	ctx.arc(0, 0, canv.height/100, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

function drawAnalogCircle() {
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle="#000";
	ctx.arc(0, 0, canv.height/4, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawAnalogTicks() {
	for(var i=0; i<360; i+=6) {
		if(i%15==0) {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle="#000";
			ctx.rect(0, canv.height/4.5, canv.height/200, 4*canv.height/200);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		} else {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle="#000";
			ctx.rect(0, canv.height/4.5, canv.height/200, 4*canv.height/200);
			ctx.fill()
			ctx.closePath();
			ctx.restore();
		}
		ctx.rotate(6*Math.PI/180);
	}
}

function drawAnalogHours() {
	ctx.save();
	var hours = date.getHours();
	ctx.beginPath();
	ctx.strokeStyle="#000";
	ctx.rotate(Math.PI);
	ctx.rotate(30*(hours%12+date.getMinutes()/60)*Math.PI/180);
	ctx.moveTo(0,0)
	ctx.lineTo(0,canv.height/8);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawAnalogMins() {
	ctx.save();
	var mins = date.getMinutes();
	ctx.beginPath();
	ctx.strokeStyle="#000";
	ctx.lineWidth=canv.height/125;
	ctx.rotate(Math.PI);
	ctx.rotate(6*(mins + date.getSeconds()/60)*Math.PI/180);
	ctx.moveTo(0,0)
	ctx.lineTo(0,canv.height/7);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawAnalogSecs() {
	ctx.save();
	var secs = date.getSeconds();
	ctx.beginPath();
	ctx.strokeStyle="#FF0000";
	ctx.lineWidth=canv.height/150;
	ctx.rotate(Math.PI);
	ctx.rotate(6*secs*Math.PI/180);
	ctx.moveTo(0,0)
	ctx.lineTo(0,canv.height/5.5);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function clearCanvas() {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0,0,canv.width, canv.height);
}

/*                 __            __                            
                  /\ \          /\ \__  __                     
 __  __  _____    \_\ \     __  \ \ ,_\/\_\    ___      __     
/\ \/\ \/\ '__`\  /'_` \  /'__`\ \ \ \/\/\ \ /' _ `\  /'_ `\   
\ \ \_\ \ \ \L\ \/\ \L\ \/\ \L\.\_\ \ \_\ \ \/\ \/\ \/\ \L\ \  
 \ \____/\ \ ,__/\ \___,_\ \__/.\_\\ \__\\ \_\ \_\ \_\ \____ \ 
  \/___/  \ \ \/  \/__,_ /\/__/\/_/ \/__/ \/_/\/_/\/_/\/___L\ \
           \ \_\                                        /\____/
            \/_/                                        \_/__/*/

$(window).resize(function() {
	canv.width = $("#canvDiv").width();
	canv.height = $("#canvDiv").height();
	drawAnalogClock();
});

drawAnalogClock();

function lineChart(tableData){
	let drawing = document.getElementById("drawing"),
	 	ctx = drawing.getContext("2d");
	drawing.width = drawing.offsetWidth;
	drawing.height = drawing.offsetHeight;
	ctx.lineWidth = 1;
	ctx.textAlign = "center";
	ctx.font = "bold 11.5px Arial";
	let max = getMax(tableData);
	axis(ctx, max);
	drawLine(tableData, ctx, max);
}

function axis(ctx, max){
	let chartHeight = 320,
		chartWidth = 980,
		heightP = 320/(max * 1.1),
		widethP = (980/10) - 10;
	ctx.translate(40, 310);
	ctx.beginPath();
	//y-axis
	ctx.moveTo(0.5, 5);
	ctx.lineTo(0.5, -300);
	//x-axis
	ctx.moveTo(-5, 0.5);
	ctx.lineTo(980, 0.5);
	ctx.stroke();
	for(let i = 0.5, k = 1; i < 980; i += widethP, k++){
		ctx.beginPath();
		ctx.moveTo(i, 0.5);
		ctx.lineTo(i, 5);
		ctx.stroke();
		if(k < 13){
			ctx.fillText(k + '月', i, 16.5);
		}
	}
	for(let i = 0.5, k = 0; i > -321; i -= heightP*max*0.2, k += max*0.2){
		ctx.beginPath();
		ctx.moveTo(0.5, i);
		ctx.lineTo(-5.5, i);
		ctx.strokeStyle = "#000000";
		ctx.stroke();
		let roundK = Math.round(k);
		if(k < max+1) ctx.fillText(roundK, -16.5, i+4);
		if(i < 0.5){
			ctx.beginPath();
			ctx.moveTo(0.5, i);
			ctx.lineTo(980, i);
			ctx.strokeStyle = "#6F6F6F";
			ctx.stroke();
		}
	}
}

function getMax(tableData){
	let max = 0;
	if(tableData[0].sale == undefined){
		tableData.forEach(item => {
			if(item - max > 0) max = item;
		})
	}else{
		tableData.forEach(item => {
			item.sale.forEach(item => {
				if(item > max) max = item;
			})
		})
	}
	return max * 1.1;
}

function drawLine(tableData, ctx, max){
	colors = [
      '#000000',
      '#8E24AA',
      '#3949AB',
      '#039BE5',
      '#00897B',
      '#689F38',
      '#FFA000',
      '#E64A19',
      '#5D4037'
    ];
    let heightP = 320/(max * 1.1),
		widethP = (980/10) - 10,
		len = tableData.length,
		exDot = null;
	if(tableData[0].sale == undefined){
		for(let i = 0; i < len; i++){
			let dot = tableData[i];
			ctx.beginPath();
			ctx.arc(widethP * i, -dot * heightP, 2, 0, 2 * Math.PI, false);
			ctx.strokeStyle = "black";
			ctx.stroke();
			if(i != 0){
				ctx.beginPath();
				ctx.moveTo(widethP * (i-1), -exDot * heightP);
				ctx.lineTo(widethP * i, -dot * heightP)
				ctx.strokeStyle = "#0032AF";
				ctx.stroke();
			}
			exDot = dot;
		}
	}else{
		for(let i = 0; i < len; i++){
			for(let j = 0; j < 12; j++){
				let dot = tableData[i].sale[j];
				ctx.beginPath();
				ctx.arc(widethP * j, -dot * heightP, 2, 0, 2 * Math.PI, false);
				ctx.strokeStyle = "black";
				ctx.stroke();
				if(j != 0){
					ctx.beginPath();
					ctx.moveTo(widethP * (j-1), -exDot * heightP);
					ctx.lineTo(widethP * j, -dot * heightP)
					ctx.strokeStyle = colors[i];
					ctx.stroke();
				}
				exDot = dot;
			}
		}
	}
}
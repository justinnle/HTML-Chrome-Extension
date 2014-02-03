function addElement(element){
	var el = document.createElement(element);
	el.setAttribute("class",element);
	el.setAttribute("draggable","true");
	var t = document.createTextNode(element+"!");
	el.appendChild(t);
	document.body.appendChild(el);
}
var numCols = 4;
var numRows= 15;

function setGrid(){
	var cellWidth = window.innerWidth/numCols;
	var cellHeight = window.innerHeight/numRows;
	var table = document.createElement("table");
	table.setAttribute("style","border:2px dashed blue");
	for(var ii=0;ii<numRows;ii++){
		var row = document.createElement("tr");
		row.setAttribute("style","height:"+cellHeight+"px;border:1px dashed blue");
		for(var jj=0; jj<numCols;jj++){
			var cell = document.createElement("td");
			cell.setAttribute("style","width:"+cellWidth+"px;border:1px dashed white;resize:both");
			cell.setAttribute("align","center");
			cell.setAttribute("ondragover","allowDrop(event)");
			cell.setAttribute("ondrop","drop(event)");
			cell.setAttribute("id","r"+ii+"c"+jj);
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	document.body.appendChild(table);
}

//drag/drop
function drag(event)
{
console.log('drag');
event.dataTransfer.setData("Text",event.target.id);
}

function allowDrop(event)
{
console.log('allowDrop');
event.preventDefault();
}

function drop(event)
{
	console.log('drop');
	//console.log(event.target.id);
	var target = document.getElementById(event.target.id);
	event.preventDefault();
	var data=event.dataTransfer.getData("Text");
	var object = document.getElementById(data);
	var idRow = event.target.id.substring(event.target.id.indexOf('r'),event.target.id.indexOf('c'));
	if(object.id.substring(object.id.length-2)=='h1'){
		document.getElementById(idRow+"c0").setAttribute('colspan',numCols);
		document.getElementById(idRow+"c0").appendChild(object);
		document.getElementById(idRow+"c0").setAttribute("style","background-color:"+object.style.backgroundColor);
	}
	else if(object.id.substring(object.id.length-2)=='h2'
				||object.id.substring(object.id.length-2)=='h3'){
				if(parseInt(target.id.substring((target.id.indexOf('c')+1)))+1 == numCols){
					document.getElementById(idRow+"c"+(numCols-2)).setAttribute('colspan',numCols/2);
					document.getElementById(idRow+"c"+(numCols-2)).appendChild(object);
					document.getElementById(idRow+"c"+(numCols-2)).setAttribute("style","background-color:"+object.style.backgroundColor);
				}
				else{
					event.target.setAttribute('colspan',numCols/2);
					event.target.appendChild(object);
					event.target.setAttribute("style","background-color:"+object.style.backgroundColor);
				}
	}
	else if(object.id.substring(object.id.length-4,object.id.length-1)=='col'){
		var colSize = parseInt(object.id.charAt(object.id.length-1));
		var idCol = event.target.id.substring(event.target.id.indexOf('c'));
		if(colSize==1){
			document.getElementById("r0"+idCol).setAttribute('rowspan',numRows);
			document.getElementById("r0"+idCol).appendChild(object);
			document.getElementById("r0"+idCol).setAttribute("style","background-color:"+object.style.backgroundColor);
		}
		else if(colSize==2){
			var half = Math.floor(numRows/2);
			if(parseInt(idRow.substring(1))>half){
				document.getElementById("r"+(half)+idCol).setAttribute('rowspan',half+1);
				document.getElementById("r"+(half)+idCol).appendChild(object);
				document.getElementById("r"+(half)+idCol).setAttribute("style","background-color:"+object.style.backgroundColor);
			}
			else{
				event.target.setAttribute('rowspan',half);
				event.target.appendChild(object);
				event.target.setAttribute("style","background-color:"+object.style.backgroundColor);
			}	
		}
		else if(colSize==3){
			var third = Math.floor(numRows/3);
			if(parseInt(idRow.substring(1))>(third*2)){
				document.getElementById("r"+(third*2)+idCol).setAttribute('rowspan',(third*2));
				document.getElementById("r"+(third*2)+idCol).appendChild(object);
				document.getElementById("r"+(third*2)+idCol).setAttribute("style","background-color:"+object.style.backgroundColor);
			}
			else{
				event.target.setAttribute('rowspan',third);
				event.target.appendChild(object);
				event.target.setAttribute("style","background-color:"+object.style.backgroundColor);
			}
		}
		else if(colSize==4){
			var fourth = Math.floor(numRows/4);
			if(parseInt(idRow.substring(1))>(fourth*3)){
				document.getElementById("r"+(fourth*3)+idCol).setAttribute('rowspan',(fourth));
				document.getElementById("r"+(fourth*3)+idCol).appendChild(object);
				document.getElementById("r"+(fourth*3)+idCol).setAttribute("style","background-color:"+object.style.backgroundColor);
			}
		    else{
				event.target.setAttribute('rowspan',fourth);
				event.target.appendChild(object);
				event.target.setAttribute("style","background-color:"+object.style.backgroundColor);
			}
		}
		
	}
	else{
		event.target.appendChild(object);
		event.target.setAttribute("style","background-color:"+object.style.backgroundColor);
	}
	
}
setGrid();
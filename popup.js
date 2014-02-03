
function addEl(e) {
	var buildElement = [elementType(e),
								  "var t = document.createTextNode('" + document.getElementById("text").value +"')",
								  "el.setAttribute('class','"+e.target.id+"')",
								  "el.setAttribute('draggable','true')",
								  "el.setAttribute('ondragstart','drag(event)')",
								  "el.setAttribute('id','"+document.getElementById("text").value+"_"+e.target.id+"')",
								  elementStyle(),
								  "el.appendChild(t)",
								  "document.body.appendChild(el)"];
	for(var ii=0;ii<buildElement.length;ii++){
	  chrome.tabs.executeScript(null,
		  {code:buildElement[ii]});
	}
   window.close();
}
function elementType(e){
	if(e.target.id.substring(0,3)=="col"){
		return "var el = document.createElement('div')";
	}
	else{
		return "var el = document.createElement('" + e.target.id+"')";
	}
}
function elementStyle(){
var output="el.setAttribute('style','color:"+getColor()+"; background-color:"+getBGColor();
if(document.getElementById("text").value==""){
	output+=";width:10px;height:10px;border:"+getBGColor();
}
output+="')";
return output;
}

function getColor(){
	if(document.getElementById("color").value!=null && (document.getElementById("color").value).charAt(0)=='#'){
		return document.getElementById("color").value;
	}
	else{
		return "black";
	}
}
function getBGColor(){
	if(document.getElementById("bgcolor").value!=null && (document.getElementById("bgcolor").value).charAt(0)=='#'){
		return document.getElementById("bgcolor").value;
	}
	else{
		return "white";
	}
}

function template(e){
	if(e.target.id=='beach'){
		document.getElementById("color").value="#F4FA58";
		document.getElementById("bgcolor").value="#01DFA5";
	}
	else{
		document.getElementById("color").value="#CEE3F6";
		document.getElementById("bgcolor").value="#170B3B";
	}
}

function putImg(){
	var buildImage=["var el = document.createElement('img')",
							  "el.setAttribute('src','"+document.getElementById("imgText").value+"')",
							  "el.setAttribute('draggable','true')",
							  "el.setAttribute('ondragstart','drag(event)')",
							  "el.setAttribute('id','"+document.getElementById('imgText').value.substring(0,7)+"')",
							  "document.body.appendChild(el)"];
	for(var ii=0;ii<buildImage.length;ii++){
	  chrome.tabs.executeScript(null,
	 {code:buildImage[ii]});
	}
	window.close();
}
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    if(divs[i].className=='template'){
		divs[i].addEventListener('click',template);
	}
	else if(divs[i].id=='putImg'){
		divs[i].addEventListener('click',putImg);
	}
	else{
		divs[i].addEventListener('click', addEl);
	}
  }
});

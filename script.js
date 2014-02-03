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
event.preventDefault();
var data=event.dataTransfer.getData("Text");
console.log(event.dataTransfer);
event.target.appendChild(document.getElementById(data));
}

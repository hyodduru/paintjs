const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";
let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}







function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling===true){
        filling = false;
        mode.innerText = "fill";}
        else{
            filling = true;
            mode.innerText = "paint";
        }
    }

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
    }
}

function handleCM(event){
    event.preventDefault();
}


function handleSaveBtn(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "JSCOLOR";
    link.click();

}
    

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
   mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveBtn);
}
Array.from(color).forEach((color)=>color.addEventListener("click",handleColorClick))
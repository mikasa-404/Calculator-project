let runningTotal=0;
let buffer="0";
let prevOperator=null;
const screen= document.querySelector('.screen');


function click(value){
    //if button is number and if button is symbol
    if(isNaN(parseInt(value))){
        symbolWork(value);
    }
    else{
        numberWork(value);
    }
    screen.innerText=buffer;
}
function numberWork(value){
    console.log("value", value);
    if(buffer === "0")
        buffer=value;
    else
        buffer+=value;
}

//handle maths
function mathsSolve(value){
    console.log("buffer", buffer);
    if(buffer==='0')
        return;
    
    const intbuffer=parseInt(buffer);
    if(runningTotal===0){
        runningTotal=intbuffer;
    }
    else{
        flushOperation(intbuffer);
    }

    prevOperator=value;
    buffer="0";
}
function flushOperation(intBuffer) {
    if (prevOperator === "+") {
      runningTotal += intBuffer;
    } else if (prevOperator === "-") {
      runningTotal -= intBuffer;
    } else if (prevOperator === "×") {
      runningTotal *= intBuffer;
    } else {
      runningTotal /= intBuffer;
    }

    console.log("running total", runningTotal);
  }

  function symbolWork(value){
    switch (value) {
        case "C":
            buffer="0";
            runningTotal=0;
            break;
        case "←": 
        if (buffer.length === 1) {
            buffer = "0";
          } else {
            buffer = buffer.substring(0, buffer.length - 1);
          }
            break;
        case "=":
            if (prevOperator===null) {
                return;
            }
            flushOperation(parseInt(buffer));
            prevOperator=null;
            buffer= +runningTotal;
            runningTotal=0;
            break;
        case "÷": 
        case "+": 
        case "×": 
        case "-": 
            mathsSolve(value);
            break;
    } 
}

//main driver function
function init(){
    document
    .querySelector(".calc-buttons")
    .addEventListener("click", function(event) {
      click(event.target.innerText);
    });
}
init();
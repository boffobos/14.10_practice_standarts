/*jshint esversion: 7*/
let inputWindow = document.querySelector('.output__digits');
let flowOutputWindow = document.querySelector('.output__flow');
let firstOperand = null;
let secondOperand = null;
let operation = null;
let lastButtonClass = null;
let lastButtonId = null;
let displayVar = '';
inputWindow.textContent = 0;
let dotFlag = false;
const btnTranslate = {
    "btn__0": "0",
    "btn__1": "1",
    "btn__2": "2",
    "btn__3": "3",
    "btn__4": "4",
    "btn__5": "5",
    "btn__6": "6",
    "btn__7": "7",
    "btn__8": "8",
    "btn__9": "9",
    "btn__comma": ".",
    "operations__plusmn": function(opr) {
        return -opr;
    },
    "operations__percent": function(opr) {
        if (firstOperand === null) return opr / 100;
        else return firstOperand / 100 * opr;
    },
    "operations__sum": "sum",
    "operations__sub": "sub",
    "operations__multiply": "mult",
    "operations__division": "div",
    "sum": function(opr) {
        displayVar = firstOperand + displayVar;
    },
    "sub": function(opr) {
        displayVar = firstOperand - displayVar;
    },
    "mult": function(opr) {
        displayVar = firstOperand * displayVar;
    },
    "div": function(opr) {
        displayVar = firstOperand / displayVar;
    },

};
const operationToFlow = {
    "operations__sum": "+",
    "operations__sub": "-",
    "operations__multiply": "*",
    "operations__division": "/",
};

function checkPressedButtons() {
    const buttons = document.querySelectorAll('button');
    const buttonsArr = Array.from(buttons);
    buttonsArr.forEach(elem => elem.addEventListener('click', (event) => {
           let keyId = event.target.classList[0];
           let keyClass = event.target.classList[1];
           calcLogic(keyId, keyClass);
        }));
}

//output digits to the calc screen
function keyOutput(kId) {
    //KISS - made function simpler than before
    let num = btnTranslate[kId];
    let isInt = Number.isInteger;  
    if(dotFlag === true && isInt(displayVar)) displayVar += `.${num}`;
    else displayVar += `${num}`;
    displayVar = Number(displayVar);
    inputWindow.textContent = displayVar;
}

function unaryOperator(kId) {
    //YAGNI redused function not from task
    //KISS made function easer;
    displayVar = Number(displayVar);
    let oper = btnTranslate[kId];
    displayVar = inputWindow.textContent = oper(displayVar);
}

//make operation between operand in variable and display content. Input should be variable operation
function binaryOperator(operation) {
    displayVar = Number(displayVar);
    function output() {
        //DRY
        inputWindow.textContent = displayVar;
        firstOperand = displayVar;
    }
    let oper = btnTranslate[operation];
    oper();
    output();
}

//print out previous input and operation to separate calc field
function flowOutput(kId, kClass, lastButtonClass) {
    let oper = operationToFlow[kId];
    if (kId === 'operations__result') {
        flowOutputWindow.textContent = '';
    } else if ( kClass.includes('binary') && lastButtonClass !== 'unary' ) {
        flowOutputWindow.textContent += `${displayVar} ${oper} `;
    } else if ( kClass.includes('binary') ) {
        flowOutputWindow.textContent += ` ${oper} `;
    }
    //output unary operations
    else if ( kClass.includes('unary') ) {
        if(kId === 'operations__percent') flowOutputWindow.textContent += `${btnTranslate[kId](displayVar)} `;
        else if(kId === 'operations__plusmn' && lastButtonClass !== 'unary') flowOutputWindow.textContent += `(${btnTranslate[kId](displayVar)}) `;
    } else if (kId === "operations__clr") {
        flowOutputWindow.textContent = '';
    }
}

function calcLogic(kId, kClass)
{
    if(kId === 'operations__clr') {
        firstOperand = null;
        operation = null;
        lastButtonClass = null;
        inputWindow.textContent = 0;
        displayVar = '';
        dotFlag = false;
    }

    if(kId === 'btn_ce') {
        inputWindow.textContent = 0;
        displayVar = '';
        dotFlag = false;
    }

    if(kId === 'btn__comma') dotFlag = true;
    
    flowOutput(kId, kClass, lastButtonClass);

    if(firstOperand !== null) {
        if(kClass.includes('nums')) {
            if(lastButtonClass === 'nums') {
                keyOutput(kId);
            }
            else if(lastButtonClass === 'binary' || lastButtonClass === 'unary' || lastButtonClass === 'service')
            {
                displayVar = '';
                inputWindow.textContent = displayVar;
                keyOutput(kId);
            }
            // here can be else for some use if add new key classes over nums binary unary
        }
        else if(kClass.includes('binary') || kClass.includes('unary') )
        {
            if(kClass.includes('unary'))
            {
                if(typeof displayVar === 'number')
                {
                    if(lastButtonClass === 'nums' || lastButtonId === 'operations__result' || lastButtonClass === 'unary')
                    {
                        unaryOperator(kId);
                    }
                    else if(lastButtonClass === 'binary')
                    {
                        unaryOperator(kId);
                    }
                }
                else
                {
                    inputWindow.textContent = 'Error';
                }
            }
            else
            {
                if(lastButtonClass === 'nums')
                {
                    binaryOperator(operation);
                    operation = btnTranslate[kId];
                }
                else if(lastButtonClass === 'binary' || lastButtonClass === 'unary')
                {
                    if(lastButtonClass === 'unary')
                    {
                        binaryOperator(operation);
                        operation = btnTranslate[kId];
                    }
                    else
                    {
                        operation = btnTranslate[kId];
                    }
                }
            }
        }
    } else {
        //when first operand === null
        if (inputWindow.textContent === '0')
        {
            if (kClass.includes('nums'))
            {
                displayVar = '';
                inputWindow.textContent = displayVar;
                keyOutput(kId);
            }
        }
        else if (kClass.includes('nums'))
        {       
            if (lastButtonClass === 'unary')
            {   
                displayVar = '';
                inputWindow.textContent = displayVar;
                keyOutput(kId);
            }
            else
            {
                keyOutput(kId); 
            }
                
        }
        else if(kClass.includes('unary') || kClass.includes('binary'))
        {
            if(kClass.includes('unary'))
            {
                unaryOperator(kId);
            }
            else
            {
                firstOperand = Number(displayVar);
                operation = btnTranslate[kId];
            }
        }
        
    }
        lastButtonClass = kClass;
}

checkPressedButtons();
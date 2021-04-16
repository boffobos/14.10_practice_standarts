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
};

function checkPressedButtons() {
    const buttons = document.querySelectorAll('button');
    const buttonsArr = Array.from(buttons);
    buttonsArr.forEach(elem => elem.addEventListener('click', (event) => {
           console.log(event);
           let keyId = event.target.classList[0];
           let keyClass = event.target.classList[1];
           calcLogic(keyId, keyClass);
        }));
}

    

//output digits to the calc screen
function keyOutput(kId) {
    //KISS - made function simpler than before
    let num = btnTranslate[kId];   
    if(dotFlag === true && Number.isInteger(displayVar)) displayVar += `.${num}`;
    else if (num !== '.') displayVar += `${num}`;
    displayVar = Number(displayVar);
    inputWindow.textContent = displayVar;
    if (num === '.') dotFlag = true;
}

function unaryOperator(kId) 
{   displayVar = Number(displayVar);
    if(kId === 'btn_plusmn') {
        displayVar = - displayVar;
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_sqrt') {
        displayVar = Math.sqrt(displayVar);
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_square') {
        displayVar = displayVar ** 2;
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_reciprocal') {
        displayVar = 1 / displayVar;
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_lg') {
        displayVar = Math.log10(displayVar);
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_cbrt') {
        displayVar = Math.cbrt(displayVar);
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_sin') {
        displayVar = Math.sin(displayVar * Math.PI / 180);
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_cos') {
        displayVar = Math.cos(displayVar * Math.PI / 180);
        inputWindow.textContent = displayVar;
    } else if(kId === 'btn_ln') {
        displayVar = Math.log(displayVar);
        inputWindow.textContent = displayVar;
    }
    


}

//make operation between operand in variable and display content. Input should be variable operation
function binaryOperator(kId)
{
    displayVar = Number(displayVar);
    if (kId === 'sum') {
        displayVar = firstOperand + displayVar;
        inputWindow.textContent = displayVar;
        firstOperand = displayVar;
    } else if (kId === 'sub') {
        displayVar = firstOperand - displayVar;
        inputWindow.textContent = displayVar;
        firstOperand = displayVar;
    } else if (kId === 'mult') {
        displayVar = firstOperand * displayVar;
        inputWindow.textContent = displayVar;
        firstOperand = displayVar;
    } else if (kId === 'div') {
        displayVar = firstOperand / displayVar;
        inputWindow.textContent = displayVar;
        firstOperand = displayVar;
    }
    
}

//Handle key input and write meaning of operation to variable operation
function operationDeclaration(kId)
{   
    if(kId === 'btn_sum') {
        operation = 'sum';
    } else if(kId === 'btn_sub') {
        operation = 'sub';
    } else if(kId === 'btn_multiply') {
        operation = 'mult';
    } else if(kId === 'btn_division') {
        operation = 'div';
    }
}
function operationExplanation(kId)
{   let oper;
    if (kId === 'btn_sum') {
        oper = '+';
    } else if (kId === 'btn_sub') {
        oper = '-';
    }
    else if (kId === 'btn_multiply') {
        oper = '*';
    }
    else if (kId === 'btn_division') {
        oper = '/';
    }
    return oper;
}

//print out previous input and operatin to separeate calc field
function flowOutput(kId, kClass, lastButtonClass)
{
    let oper = operationExplanation(kId);
    if (kId === 'btn_result') {
        flowOutputWindow.textContent = '';
    } else if ( kClass.includes('binary') && lastButtonClass !== 'unary' ) {
        flowOutputWindow.textContent += `${displayVar} ${oper} `;
    } else if ( kClass.includes('binary') ) {
        flowOutputWindow.textContent += ` ${oper} `;
    }
    //output unary operations
    else if ( kClass.includes('unary') ) {
        if (kId === 'btn_sqrt') {
            flowOutputWindow.textContent += `sqrt(${displayVar}) `;
        } else if(kId === 'btn_square') {
            flowOutputWindow.textContent += `${displayVar}^2 `;
        } else if(kId === 'btn_reciprocal') {
            flowOutputWindow.textContent += `1/${displayVar} `;
        } else if(kId === 'btn_lg') {
            flowOutputWindow.textContent += `lg(${displayVar}) `;
        } else if(kId === 'btn_cbrt') {
            flowOutputWindow.textContent += `cbrt(${displayVar}) `;
        } else if(kId === 'btn_sin') {
            flowOutputWindow.textContent += `sin(${displayVar}) `;
        } else if(kId === 'btn_cos') {
            flowOutputWindow.textContent += `cos(${displayVar}) `;
        } else if(kId === 'btn_ln') {
            flowOutputWindow.textContent += `ln(${displayVar}) `;
        }
    } else if (kId === "btn_clr") {
        flowOutputWindow.textContent = '';
    }
}

//handle keyboard input in addition to mouse input from page
function keyBoardHandler(keyboardKey) {
        // operation keys 
        if (keyboardKey === '+') {
            keyId = 'btn_sum';
            keyClass = 'binary';
        } else if (keyboardKey === '-') {
            keyId = 'btn_sub';
            keyClass = 'binary';
        } else if (keyboardKey === '*') {
            keyId = 'btn_multiply';
            keyClass = 'binary';
        } else if (keyboardKey === '/') {
            keyId = 'btn_division';
            keyClass = 'binary';
        } else if (keyboardKey === 'Enter') {
            keyId = 'btn_result';
            keyClass = 'binary';
        }
        //number keys
        else if (keyboardKey === '0') {
            keyId = 'btn_0';
            keyClass = 'nums';
        } else if (keyboardKey === '1') {
            keyId = 'btn_1';
            keyClass = 'nums';
        } else if (keyboardKey === '2') {
            keyId = 'btn_2';
            keyClass = 'nums';
        } else if (keyboardKey === '3') {
            keyId = 'btn_3';
            keyClass = 'nums';
        } else if (keyboardKey === '4') {
            keyId = 'btn_4';
            keyClass = 'nums';
        } else if (keyboardKey === '5') {
            keyId = 'btn_5';
            keyClass = 'nums';
        } else if (keyboardKey === '6') {
            keyId = 'btn_6';
            keyClass = 'nums';
        } else if (keyboardKey === '7') {
            keyId = 'btn_7';
            keyClass = 'nums';
        } else if (keyboardKey === '8') {
            keyId = 'btn_8';
            keyClass = 'nums';
        } else if (keyboardKey === '9') {
            keyId = 'btn_9';
            keyClass = 'nums';
        } else if (keyboardKey === '.') {
            keyId = 'btn_comma';
            keyClass = 'nums';
        }
        //service keys
        else if (keyboardKey === 'Escape') {
            keyId = 'btn_clr';
            keyClass = '';
        } else if (keyboardKey === 'Delete') {
            keyId = 'btn_clr';
            keyClass = 'service';
        } else if (keyboardKey === 'Enter') {   
            keyId = 'btn_result';
            keyClass = 'binary';
        }

        calcLogic(keyId, keyClass);
}

function calcLogic(kId, kClass)
{
    if(kId === 'operations_clr') {
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
                    if(lastButtonClass === 'nums' || lastButtonId === 'btn_result' || lastButtonClass === 'unary')
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
                    operationDeclaration(kId);
                }
                else if(lastButtonClass === 'binary' || lastButtonClass === 'unary')
                {
                    if(lastButtonClass === 'unary')
                    {
                        binaryOperator(operation);
                        operationDeclaration(kId);
                    }
                    else
                    {
                        operationDeclaration(kId);
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
                operationDeclaration(kId);
            }
        }
        
    }
   
    if (kClass.includes('nums'))
    {
        lastButtonClass = 'nums';
    }
    else if (kClass.includes('unary'))
    {
        lastButtonClass = 'unary';
    }
    else if (kClass.includes('binary'))
    {
        lastButtonClass = 'binary';
    }
    else if (kClass.includes('service'))
    {
        lastButtonClass = 'service';
    }
    lastButtonId = kId;
   
}





checkPressedButtons();
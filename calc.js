/*jshint esversion: 7*/

let dotFlag = false;
const calcLogic = {
    firstOperand: null,
    secondOperand: null,
    currentOperation: null,
    hist: [],
    sum: function() {
        return this.firstOperand + this.secondOperand;
    },
    sub: function() {
        return this.firstOperand - this.secondOperand;
    },
    division: function() {
        if (!secondOperand) return false;
        return this.firstOperand / this.secondOperand;
    },
    multuply: function() {
        return this.firstOperand * this.secondOperand;
    },
    percent: function() {
        return (this.firstOperand / 100) * secondOperand;
    },
    input: function(key) {
        
        let oper = this.isOperation;
        function isLastOperation() {
            return this.isOperation(this.hist.slice(-1).toString());
        } 
        
        //check if there was digits input
        if (oper(key)[0] && this.hist == 0) return console.warn('no digit input');
        else {
            switch(key) {
                case '.':
                    if (this.hist == 0 || (this.hist.length === 1 && this.hist[0] === '0')) { 
                        this.hist.push('0', '.');
                        dotFlag = true;
                    }
                    if (!dotFlag && !oper(this.hist.slice(-1).toString())[0]) { 
                        this.hist.push('.');
                        dotFlag = true;
                    } else console.warn('dot has been already pressed');   
                    break;
                case '+':
                    if(isLastOperation()) {
                        console.warn('operation has been entered last time');
                    } else if (this.firstOperand !== null) {

                    }   
                default: 
                if (isLastOperation()[0]){

                }
                this.hist.push(key);   
                    
                }
            
                
        
        
        }
    },
    keyTranslate: function(btnClass) {
        switch (btnClass) {
            case 'nums__0':
                return '0';
            case 'nums__1':
                return '1';
            case 'nums__2':
                return '2';
            case 'nums__3':
                return '3';
            case 'nums__4':
                return '4';
            case 'nums__5':
                return '5';
            case 'nums__6':
                return '6';
            case 'nums__7':
                return '7';
            case 'nums__8':
                return '8';
            case 'nums__9':
                return '9';
            case 'nums__comma':
                return '.';
            case 'operations__plusmn':
                return 'plusmn';
            case 'operations__percent':
                return 'percent';
            case 'operations__division':
                return '/';
            case 'operations__multiply':
                return '*';
            case 'operations__sub':
                return '-';
            case 'operations__sum':
                return '+';
            default:
                return false;
        }
    },
    isOperation: function(key) {
        const operations = ['+', '-', '*', '/', 'plusmn', 'percent'];
        const binary = ['+', '-', '*', '/'];
        let oper = false;
        let bin = false;
        let arr = [];
        
        operations.forEach(el => {
            if (el === key) oper = true;
        });

        binary.forEach(el => {
            if (el === key) bin = true;
        });

        arr.push(oper);
        arr.push(bin);
        return arr;
    },
    
};


 function buttons () {
    // cheking clicks on buttons and return button
     const buttonArr = Array.from(document.querySelectorAll('button'));
     buttonArr.forEach(el => el.addEventListener('click', function(event)  {
         button = event.target.classList[0];
         calcLogic.input(calcLogic.keyTranslate(button));
         console.log(button);
     }));
    //  if (!isNaN(button) && button !== undefined) {
    //      console.log(button);
    //      return button;
    //  }   
    //  else return false;
 }

buttons();


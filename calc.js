/*jshint esversion: 7 */

const calcLogic = {
    firstOperand: null,
    secondOperand: null,
    currentOperation: null,
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

};


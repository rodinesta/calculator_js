import { print } from './utils/print.js'
const main = () => {
    const calc = new Calculator()

    return (state) => {
        switch (state) {
            case '+':
            case '-':
            case 'x':
            case '/':
                calc.setOperation(state)
                break;
            case '=':
                calc.calculate()
                break;
            case 'С':
                calc.clear()
                break;
            case 'АС':
                calc.deleteLast()
                break;
            case '.':
                calc.appendDot()
                break;
            default:
                calc.appendSymbol(state)
                break;
        }
        print(calc.inputStr)
    }
}

export default main

class Calculator {
    constructor() {
        this.leftValue = null
        this.operation = null
        this.inputStr = ''
    }

    clear() {
        this.leftValue = null
        this.operation = null
        this.inputStr = ''
    }

    deleteLast() {
        this.inputStr = this.inputStr.slice(0, -1)
    }

    appendSymbol(value) {
        this.inputStr += value
    }

    appendDot() {
        if (this.inputStr.includes('.') || this.inputStr.length === 0) return
        this.inputStr += '.'
    }

    setOperation(value) {
        if (this.operation !== null) {
            this.calculate()
        }
        this.operation = value
        this.leftValue = this.inputStr
        this.inputStr = ''
    }

    calculate() {
        const left = parseFloat(this.leftValue)
        const right = parseFloat(this.inputStr)
        if (isNaN(left) || isNaN(right)) this.inputStr = 'Error'
        
        switch(this.operation) {
            case '+':
                this.inputStr = (left + right).toString()
                break;
            case '-':
                this.inputStr = (left - right).toString()
                break;
            case 'x':
                this.inputStr = (left * right).toString()
                break;
            case '/':
                if(right === 0) return alert('Делить на 0 нельзя')
                this.inputStr = (left / right).toString()
                break;
        }
        this.operation = null
    }
}
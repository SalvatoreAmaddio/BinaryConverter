class Bit 
{
    value = 0;

    toString() 
    {
        return this.value;
    }
}

class Nibble
{
    bits = []
    len = 4;
    full = false;
    constructor() 
    {
        for(let i = 0; i < this.len; i++)
            this.bits[i] = new Bit();
    }

    add(index, value) 
    {
        let bit = new Bit();
        bit.value = value;
        this.bits[index] = bit;
        if (index == 3) this.full = true;
    }

    toString() 
    {
        return this.bits.toString();
    }
}

class Byte extends Nibble 
{
    len = 8;
    constructor() 
    {
        super();
    }
}

class Convert
{
    number=0;
    #result = 0;
    #base = 2;
    #power = 0;
    binPlaceValues = [];

    constructor(number) 
    {
        this.number = number;
        this.calculatePowers();
    }

    calculatePowers() 
    {
        let i = 0;
        let powers = []
        let bin = []
        while(true) 
        {
            this.#result = this.#base ** this.#power;
            write(`${this.#base} ^ ${this.#power} = ${this.#result}`);
            powers[i] = this.#result;
            bin[i] = 0;

            this.#power++;
            i++;
            if (this.#result > this.number) break;
        }
        
        powers.reverse();
        this.binPlaceValues.push([powers, bin]);
        this.printBinPlaceValues();
    }

    printBinPlaceValues() 
    {
        document.writeln(`<table>`);   
        let powers;
        let result;
        document.writeln(`<tr>`);   
        for(let r = 0 ; r < this.binPlaceValues[0][0].length; r++) 
        {
            powers = this.binPlaceValues[0][0][r];
            result = this.number - powers;
//            console.log(`${this.number} - ${powers} = ${result}`);
            document.writeln(`<th>${powers}</th>`); 
            
            if (result >= 0) 
            {
                this.binPlaceValues[0][1][r] = 1;
                this.number = result;
            }
        }

        document.writeln(`</tr>`);        
        document.writeln(`<tr>`);   

        for(let r = 0 ; r < this.binPlaceValues[0][0].length; r++) 
        {
            let binVal = this.binPlaceValues[0][1][r];
            document.writeln(`<td>${binVal}</td>`); 
        } 
        
        document.writeln(`</tr>`);
        document.writeln(`</table>`);   
    }

    write(n) 
    {
        document.writeln(`<p>${n}</p>`);   
    }

}

let conv = new Convert(64);

function write(n) 
{
    document.writeln(`<p>${n}</p>`);   
}

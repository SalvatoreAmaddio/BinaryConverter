class Bit 
{
    value = 0;

    get reversValue() 
    {
        return (this.value==0) ? 1 : 0;
    }
    
    toString() 
    {
        return this.value;
    }
}

class Nibble
{
    #bits = [new Bit(), new Bit(), new Bit(), new Bit()]

    get len() 
    {
        return this.#bits.length;
    }

    reverseBits() 
    {
        this.#bits.reverse();
    }

    addBit(index, value) 
    {
        if (index > this.len-1) 
            throw "Nibbles can have only 4 bits";

        let bit = new Bit();
        bit.value = value;
        this.#bits[index] = bit;
    }

    get firstBit() 
    {
        return this.#bits[0];
    }

    get lastBit() 
    {
        return this.#bits[this.len-1];
    }

    getBit(index) 
    {
        return this.#bits[index];
    }

    getReversBit(index) 
    {
        return (this.#bits[index].value==0) ? 1 : 0;
    }

    toString() 
    {
        return this.#bits.toString();
    }
}

class Byte extends Nibble 
{
    #index = 0;
    #bits = [new Bit(), new Bit(), new Bit(), new Bit(), new Bit(), new Bit(), new Bit(), new Bit()];

    addNibble(nibble) 
    {
        for(let i = 0; i < nibble.len; i ++) 
        {
            this.#bits[this.#index] = nibble.getBit(i);
            this.#index++;
        }
    }

    get full() 
    {
        return this.#index == this.len-1;
    }

    getFirstNibble() 
    {
        let nibble = new Nibble();
        for(let i = 0; i < 4; i++) 
            nibble.addBit(this.#bits[i]);
        return nibble;
    }

    getLastNibble() 
    {
        let nibble = new Nibble();
        for(let i = 4; i < this.len; i++) 
            nibble.addBit(this.#bits[i]);        
        return nibble;
    }
}

class Convert
{
    #number=0;
    #result = 0;
    #base = 2;
    #power = 0;
    #binPlaceValues = [];
    #nibbles = [];
    #str;
    #num;

    constructor(number) 
    {
        this.#num = number;
        this.#number = number;
        this.calculatePowers();
        this.#buildUpToString();
        this.#breakIntoNibbles();
    }

    get result() 
    {
        return `The binary value of ${this.number.toLocaleString()} is:`;
    }

    get number()
    {
        return this.#num;
    }

    calculatePowers() 
    {
        let i = 0;
        let powers = []
        let bin = []
        while(true) 
        {
            this.#result = this.#base ** this.#power;
            powers[i] = this.#result;
            bin[i] = 0;

            this.#power++;
            i++;
            if (this.#result > this.#number) break;
        }
        
        powers.reverse();
        this.#binPlaceValues.push([powers, bin]);
    }

    #buildUpToString() 
    {
        this.#str = `<table><tr>`;
        let powers;
        let result;
        for(let r = 0 ; r < this.#binPlaceValues[0][0].length; r++) 
        {
            powers = this.#binPlaceValues[0][0][r];
            result = this.#number - powers;
            this.#str = this.#str + `<th>${powers}</th>`;
            
            if (result >= 0) 
            {
                this.#binPlaceValues[0][1][r] = 1;
                this.#number = result;
            }
        }

        this.#str = this.#str + `</tr><tr>`;

        for(let r = 0 ; r < this.#binPlaceValues[0][0].length; r++) 
        {
            let binVal = this.#binPlaceValues[0][1][r];
            this.#str = this.#str + `<td>${binVal}</td>`;
        } 

        this.#str = this.#str + `</tr></table>`;
    }

    #breakIntoNibbles() 
    {
        let nibble = new Nibble();
        let bit = 0;
        this.#binPlaceValues[0][1].reverse();
        
        for(let r = 0 ; r < this.#binPlaceValues[0][1].length; r++) 
        {
            let binVal = this.#binPlaceValues[0][1][r];

            if (bit > 3 || r == this.#binPlaceValues[0][0].length-1) 
            {
                bit = 0;
                nibble.reverseBits();
                this.#nibbles.push(nibble);                
                nibble = new Nibble();
            }
            nibble.addBit(bit,binVal);
            bit++;
        } 
        this.#nibbles.reverse();
    }

    get nibblesCount() 
    {
        return this.#nibbles.length;
    }

    nibblesAsStr() 
    {
        let str = "[";

        for(let n = 0; n < this.#nibbles.length; n++)
            str = str + this.#nibbles[n] + " ";

        str = str + "]";
        return str;
    }

    printNibbles() 
    {
        for(let n = 0; n < this.#nibbles.length; n++)
            write(this.#nibbles[n]);
    }

    getNibble(index) 
    {
        return this.#nibbles[index];
    }

    toString() 
    {
        return this.#str;
    }
}

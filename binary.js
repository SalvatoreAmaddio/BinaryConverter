let binaryPlaces = [0];
let binaryValues = [];
let n = 84;
let flag = true;
let i = 0; 

if (isPower(n))    
    binaryPlaces[0] = 1;
else 
{
    let tempN = n-1;
    while(!isPower(tempN)) 
        tempN=tempN-1;
    
    let tempBinaryValues = [...binaryValues];

        i=0;
        flag = true;
        while(flag) 
        {
            tempN = n;
            n = n - tempBinaryValues[i];
            if (n > 0) 
            {
                flag = false;
            }
            else 
            {
                n = n + tempBinaryValues[i];
                i=i+1;    
            }
        }

        tempBinaryValues.splice(i,1);
        i = binaryValues.findIndex((v)=>v==n);
        alert(i);
        binaryPlaces[i]=1;

    alert(binaryPlaces.toString());
}

function isPower(n) 
{
    let flag = true;
    binaryValues = [];
    binaryPlaces = [0];
    binaryValues.push(n);
    while(flag) 
    {
        n = n / 2;
        if (n==1) 
        {
            binaryPlaces.push(0);
            binaryValues.push(1);
            return true;
        }
        
        binaryValues.push(n);       
        if (isOdd(n)) return false;
        binaryPlaces.push(0);       
    }
}

function isOdd (n) 
{
    return (n % 2) !== 0;
}
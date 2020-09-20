class IP {

    ipAddressAutocomplete(input = '') {
        if (input === null) return ''; //null
        if (input.match(/[^(0-9|.)]/)) return input; //NOT an IP address
        input = input.toString();
        let ipArray = input.split('.');
        const numberOnTheRight = ipArray[ipArray.length - 1];
        let exceptNumberOnRight = '';
        let remainder = '';
        for (let i = 0; i < 3; i ++) {
            exceptNumberOnRight += (i <= ipArray.length - 2) ? ipArray[i] : '';
            exceptNumberOnRight += (i <= ipArray.length - 2) ? '.' : '';

            remainder += (i >= ipArray.length - 1) ? '.0-255' : '';
        }
        
        const possibilities = this.expectedNotationRange(numberOnTheRight);
        let rawOutput = [];
        for (let i = 0; i < possibilities.length; i ++) {
            rawOutput.push(exceptNumberOnRight + possibilities[i] + remainder);
        }

        return rawOutput.join(', ');
    }

    expectedNotationRange (input = 0) {
        if (input === null) return ['0-255'];
        if (input === 0) return ['0'];
        let stringInput = input.toString();
        let possibleNumbers = [stringInput];
        for (let i = 0; i < 3; i ++) {
            if (stringInput.length < 3) {
                stringInput += '0';
                if (parseFloat(stringInput) < 255) {
                    possibleNumbers.push(stringInput);
                }
            }
        }
        possibleNumbers.forEach((number, index) => {
            if (index > 0) {
                const originalNumber = number;
                let add = '0';
                for (let a = 0; a < number.split("0").length - 1; a ++) {
                    add += '9';
                }
                let maxNum = originalNumber + Math.min(parseFloat(number) + parseFloat(add), 255).toString();
                possibleNumbers[index] = `${number}-${maxNum.slice(number.length)}`;
            }
        });
        return possibleNumbers;
    }
}

module.exports = IP;
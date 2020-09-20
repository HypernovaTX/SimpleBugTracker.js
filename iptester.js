function expectedNotationRange (input = 0) {
	if (input === null) return ['0-255'];
	if (input === 0) return ['0'];
	let stringInput = input.toString();
	let possibleNumbers = [];
	for (let i = 0; i < 3; i ++) {
		let tempNumber = stringInput;
        stringInput += (stringInput.length < 3) ? '0' : '';
        possibleNumbers
	}
	
}
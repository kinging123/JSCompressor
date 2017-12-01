function generate(fileLength) {
	const allowedCharacters = require('./includes').allowedCharacters;
	let result = '';
	for (let i = 0; i < parseInt(fileLength); i++) {
		const randomChar = Math.round(Math.random() * (allowedCharacters.length - 1));
		result += allowedCharacters[randomChar];
	}
	console.log(`Generated input.txt file with ${fileLength} characters.`);
	return result;
}



if (!module.parent) { // Called directly

	var fs = require('fs');
	// const fileLength = Math.round(Math.random() * 10000 + 1);
	const [, , fileLength = 1000, outputFile = 'original.txt'] = process.argv;

	let result = generate(fileLength);

	fs.writeFile(outputFile, result, {}, ()=>{});
}

module.exports = {
	generate
};

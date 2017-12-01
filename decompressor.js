const decompress = file => {
	console.log(`File size before decompression: ${file.length}`);
	
	if(file.indexOf(';') < 0) throw new Error('No dictionary in compressed file.');

	const dictionaryKeys = require('./includes').dictionaryKeys;
	
	const [ dictionary, compressedData ] = file.split(';');
	let result = compressedData;
	dictionaryKeys.forEach((key, i) => {
		const keyPos = dictionary.indexOf(key);
		if(keyPos < 0) return;

		let nextKeyPos = keyPos+1;
		while(dictionaryKeys.indexOf(dictionary.charAt(nextKeyPos)) < 0 && nextKeyPos < dictionary.length) nextKeyPos++;

		const value = dictionary.substring(keyPos + 1, nextKeyPos);
		const keyRegex = new RegExp(RegExp.escape(key), "g");
		result = result.replace(keyRegex, value);

	});


	console.log(`File size after decompression: ${result.length}`);
	return result;
};


RegExp.escape = function (s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};


if (!module.parent) { // Called directly
	var fs = require('fs');
	
	const [, , inputFile = 'compressed.txt', outputFile = 'decompressed.txt'] = process.argv;
	
	const compressionString = fs.readFile(inputFile, 'utf8', (err, content) => {
		const decompressed = decompress(content);
		fs.writeFile(outputFile, decompressed, {}, () => { });
	});
}


module.exports = {
	decompress
};


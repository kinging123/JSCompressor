const dictionaryKeys = require('./includes').dictionaryKeys.slice();

const compress = content => {
	console.log(`File size before compression: ${content.length}`);
	
	let result = '';
	
	const repetitionList = {};
	for(let length = 2; length < content.length; length++) { // Check all substrings that are longer than 2
		const repetitionListLengthBeforeLoop = repetitionList.length;
		for (let startAt = 0; startAt < content.length - length; startAt++) { // Everywhere in the file
			if (!repetitionList[content.substr(startAt, length)]) repetitionList[content.substr(startAt, length)] = 0;
			repetitionList[ content.substr(startAt, length) ]++;
		}
		if(repetitionListLengthBeforeLoop === repetitionList.length) break; // If none found for this string length, none will be found with longer length, so we might as well give up
	}
	
	// Filter only the substrings that occur more than once in the file, and create an array
	const repetitionListArr = [];
	for(str in repetitionList) {
		if(repetitionList[str] < 2)
			delete repetitionList[str];
		else
			repetitionListArr.push(str);
	}
	

	let compressedData = content;

	repetitionListArr
		// .sort((a, b) => (b.length-a.length)) // Sort from the longest to the shortest
		.sort((a, b) => (repetitionList[b] - repetitionList[a])) // Sort from the most popular to the least popular
		.slice(0, dictionaryKeys.length-1) // Take the first n substrings, according to how many characters we have in the dictionaryKeys
		.forEach(str => {
			if(compressedData.indexOf(str) < 0) return; // If we already removed all occurrences of this substring

			const strRegex = new RegExp(str, "g");
			const occCount = compressedData.match(strRegex).length; // Count how many times the substring currently appears in the file
			/**
			 * Check if it's still "worth it" to compress the substring.
			 * For example, if it's a 2-character substring that occurs twice in the file,
			 * putting it in the dictionary won't make a difference
			 * because it would save 2 characters, and then add >2 characters (the keys).
			 * ('abcab' -> 'Aab;AcA')
			 */
			if(occCount * str.length <= str.length + 1 + occCount) return;
			
			const key = dictionaryKeys.pop(); // Pick one key from the list
			result += key + str; // Add key and str to dictionary
			compressedData = compressedData.replace(strRegex, key); // Replace all substrings with the key
		});

	
	result += ';'; // Seperates the dictionary from the actual data
	result += compressedData;
	
	
	console.log(`File size after compression: ${result.length}`);
	console.log(`New Size: ${result.length / content.length * 100}%`);

	return result;
};


if (!module.parent) { // Called directly
	var fs = require('fs');

	const [, , inputFile = 'original.txt', outputFile = 'compressed.txt'] = process.argv;

	const decompressionString = fs.readFile(inputFile, 'utf8', (err, content) => {
		const compressed = compress(content);
		fs.writeFile(outputFile, compressed, {}, () => { });
	});
}


module.exports = {
	compress
};



// Old methods:

// let sameCharCount = 1;
// content.split('').forEach(char => {
// 	if (result.substr(result.length - 1) === char) {
// 		sameCharCount++;
// 	} else {
// 		result += char;
// 		if (sameCharCount > 1) {
// 			result += sameCharCount;
// 			sameCharCount = 1;
// 		}
// 	}
// });



// let matches = [],
// 	substrLength = 2,
// 	repetitionList = [];

// while (matches && substrLength < 8) { // Continue searching for larger substrings untill none are found
// 	substrLength++;
// 	const regExp = new RegExp('(.{' + substrLength + ',}).+?\\1', "g");
// 	matches = content.match(regExp);
// 	if (matches) {
// 		// repetitionList = [];
// 		matches.forEach(match => {
// 			const repeatedChars = match.substr(0, substrLength);
// 			console.log(repeatedChars, ' is in the string ', content.split(repeatedChars).length-1, ' times.');
// 			repetitionList.push(repeatedChars);
// 		});
// 	}

// }

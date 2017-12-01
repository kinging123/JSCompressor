const fileLength = process.argv[2] || 10000;

const generate = require('./generator.js').generate;
const compress = require('./compressor.js').compress;
const decompress = require('./decompressor.js').decompress;

console.log(`> Starting test with ${fileLength} characters...\n`);

const generatedFile = generate(fileLength);

console.log(`\n> Got generated file with ${generatedFile.length} characters.\n`);

const compressedFile = compress(generatedFile);

console.log(`\n> Got compressed file with ${compressedFile.length} characters.\n`);

const decompressedFile = decompress(compressedFile);

console.log(`\n> Got decompressed file with ${decompressedFile.length} characters.
> Checking if the generated file is the same as the decompressed one...\n`);

console.log(decompressedFile == generatedFile);

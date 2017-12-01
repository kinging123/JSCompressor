## How to use this?
1. Make sure you have NodeJS installed

2. Run the generator file like so:

	`node generator.js 1000 generated.txt`
	(1000 is the generated file length, generated is the file name you want to generate)

3. Run the compressor file like so:

	`node compressor.js generated.txt compressed.txt`
	(generated & compressed are the input and output files)

4. Run the decompressor file like so:

	`node decompressor.js compressed.txt decompressed.txt`
	(compressed & decompressed are the input and output files)

5. If you want to run a simple test script to make sure it works or to see how much space is being saved for different file sizes, use test.js:

	`node test.js 1000`
	(1000 is the data length used for the test)

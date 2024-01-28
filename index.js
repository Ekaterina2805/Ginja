const {
	readFromFile,  // (T, N , M) считать из файла {T} {N} символов начиная с {M}
	writeToFile // (T, STR , M) записать в файл {T} строку {STR} начиная с символа {M}
} = require('./RWFile')



const READ_FILE = "text.txt"
const WRITE_FILE = "test.txt"

async function devide(num){
	let index = 0;
	let flag = 0;
	let filePath = 'b.txt'
	let symbol;

	do{
		symbol = await readFromFile(WRITE_FILE, index, 1)

		if(symbol){
			

			writeToFile(filePath, symbol ,num *  Math.floor(index/(2 * num)) + flag)
			
			flag++;

			if(flag == num){ 
				
				flag = 0;

				if (filePath === 'b.txt'){
					filePath = 'c.txt'
				} else {
					filePath = 'b.txt';
				}
				// filePath = filePath === 'b.txt' ? 'c.txt' : 'b.txt';
			}
		}
		index++;
		
	}while (symbol)
}
async function merge (num){
	let index = 0;
	let symbolb; 
	let symbolc;

	let num_b = 0;
	let num_c = 0;

	do{

		if (num_c == num && num_b == num)
		if (!num_b) symbolb = await readFromFile('b.txt', Math.floor(index / 2), 1);
		if (!num_c) symbolc = await readFromFile('c.txt', Math.floor(index / 2), 1);

		if (symbolb && symbolc){

			if(symbolb > symbolc){

				writeToFile(WRITE_FILE, symbolc, index)

				index++;
				num_c++;

				if (num_c == num){
					while( num_b != num && symbolb){
						writeToFile(WRITE_FILE, symbolb, index)
						index++;
						num_b++;
						symbolb = await readFromFile('b.txt', Math.floor(index/2) + num_b, 1);
					}
				}

				symbolc = await readFromFile('c.txt', Math.floor(index/2) + num_c, 1);
				
			}
			else{

				writeToFile(WRITE_FILE, symbolb, index)

				index++;
				num_b++;

				if(num_b == num) {
					while( num_c != num && symbolc){
						writeToFile(WRITE_FILE, symbolc, index)
						index++;
						num_c++;
						symbolc = await readFromFile('c.txt', Math.floor(index/2) + num_c, 1);
					}
				}
				symbolb = await readFromFile('b.txt', Math.floor(index/2) + num_b, 1);
			}
		} 
		else {
			//console.log(index, "B: ", symbolb, " C: ",symbolc)
			let index2 = Math.floor(index/2);
			while(symbolb){
				writeToFile(WRITE_FILE, symbolb, index),
				index++;
				index2++;
				symbolb = await readFromFile('b.txt', index2, 1);
				
			}
			while(symbolc){
				writeToFile(WRITE_FILE, symbolc, index),
				index++;
				index2++;
				symbolc = await readFromFile('c.txt', index2, 1);
				
			}
		}
		index++

	}while(symbolb || symbolc)


}
async function start() {
	let index = 0;
	do{
		data = await readFromFile(READ_FILE, index, 1)
		if(data){
			await writeToFile(WRITE_FILE, data, index)
		}
		index++;
		
	}while (data)
	let limit = 1;
	while( limit < index){
		await devide(limit)
		await merge(limit)
		limit = limit * 2
	}
}

start()
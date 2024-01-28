const fs = require('fs');

exports.readFromFile = function (filePath, startByte, size) {
    return new Promise((resolve, reject) => {
        let data = '';
        const readStream = fs.createReadStream(filePath, { 
            encoding: 'utf-8',
            start: startByte,
            highWaterMark: size
        });

        readStream.on('data', (chunk) => {
            data += chunk;
			if (data.length >= size) {
				
				readStream.close();
			}
        });

        readStream.on('end', () => {
            resolve(data);
        });
		readStream.on('close', () => {
            resolve(data);
        });
		

        readStream.on('error', (err) => {
            reject(err);
        });
    });
}




exports.writeToFile = function (filePath, data, startByte = 0) {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(filePath, {
            flags: 'r+',
            start: startByte
        });

        writeStream.write(data, 'utf-8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            writeStream.close();
            resolve();
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
}
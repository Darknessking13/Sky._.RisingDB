const fs = require('fs');
const path = require('path');

let baseDirectory = __dirname; // Default to the directory of the script

class Database {
    // Save method to store model instances in a single JSON file
    static save(modelInstance, customPath = null) {
        const modelName = modelInstance.constructor.modelName;
        const allData = Database._readFile(modelName, customPath);

        if (!allData[modelName]) {
            allData[modelName] = [];
        }

        // Check for duplicate data
        const existingData = allData[modelName].find((item) => {
            return JSON.stringify(item) === JSON.stringify(modelInstance.data);
        });

        if (!existingData) {
            allData[modelName].push(modelInstance.data);

            const fileName = `${modelName}.json`; // Use model name for the file
            const directoryPath = customPath || baseDirectory; // Use custom path if provided, otherwise use default

            // Save all data to a single file
            Database._writeFile(directoryPath, fileName, allData);
        } else {
            console.log('Duplicate data detected. Not saving.');
        }
    }

    // Find method to query data from the model's JSON file
    static find(modelClass, query = {}, customPath = null) {
        const modelName = modelClass.modelName;
        const allData = Database._readFile(modelName, customPath);
        let results = [];

        if (allData[modelName]) {
            results = allData[modelName].filter((item) => {
                return Object.keys(query).every((key) => {
                    if (Array.isArray(query[key])) {
                        return JSON.stringify(query[key]) === JSON.stringify(item[key]);
                    } else {
                        return query[key] === item[key];
                    }
                });
            });
        }

        return results;
    }

    // Update method to modify data of existing model instances
    static update(modelClass, query = {}, updates = {}, customPath = null) {
        const modelName = modelClass.modelName;
        const allData = Database._readFile(modelName, customPath);

        if (allData[modelName]) {
            allData[modelName] = allData[modelName].map((item) => {
                if (Object.keys(query).every((key) => {
                    if (Array.isArray(query[key])) {
                        return JSON.stringify(query[key]) === JSON.stringify(item[key]);
                    } else {
                        return query[key] === item[key];
                    }
                })) {
                    return { ...item, ...updates };
                }
                return item;
            });

            const fileName = `${modelName}.json`;
            const directoryPath = customPath || baseDirectory;

            // Save updated data to the file
            Database._writeFile(directoryPath, fileName, allData);
        }
    }

    // Set the directory where JSON files will be stored and read from
    static setDirectory(directoryPath) {
        baseDirectory = directoryPath;

        // Create the directory if it doesn't exist
        if (!fs.existsSync(baseDirectory)) {
            fs.mkdirSync(baseDirectory, { recursive: true });
        }
    }

    // Helper method to generate the file path for a model
    static _getFilePath(directoryPath, modelName) {
        return path.resolve(directoryPath || baseDirectory, `${modelName}.json`);
    }

    static _readFile(modelName, customPath = null) {
        const directoryPath = customPath || baseDirectory;
        const filePath = Database._getFilePath(directoryPath, modelName);

        try {
            const rawData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(rawData);
        } catch (error) {
            return {}; // Return an empty object if the file doesn't exist or can't be read
        }
    }

    static _writeFile(directoryPath, fileName, data) {
        const filePath = path.resolve(directoryPath || baseDirectory, fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = Database;
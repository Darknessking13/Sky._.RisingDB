const Database = require('./database');
const { define } = require('./model');

function defineModel(modelDefinition) {
    if (typeof modelDefinition === 'string') {
        // Load model definition from file
        const modelPath = require.resolve(modelDefinition);
        const modelModule = require(modelPath);
        const ModelClass = define(modelModule.name, modelModule.schema);
        return ModelClass; // Return the ModelClass
    } else if (typeof modelDefinition === 'object') {
        // Use model definition object directly
        const ModelClass = define(modelDefinition.name, modelDefinition.schema);
        return ModelClass; // Return the ModelClass
    } else {
        throw new Error('Invalid model definition. Please provide a file path or a model definition object.');
    }
}

function setDirectory(directoryPath) {
    Database.setDirectory(directoryPath);
}

// Exporting all the necessary functions including update
module.exports = {
    defineModel,
    setDirectory,
    save: Database.save,
    find: Database.find,
    update: Database.update
};

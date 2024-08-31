class Model {
    constructor(data) {
        this.data = data;
    }
}

function define(modelName, schema) {
    class CustomModel extends Model {
        constructor(data) {
            super(data);
            this.constructor.modelName = modelName;

            // Validate data against schema
            for (const key in schema) {
                const fieldDefinition = schema[key];
                const expectedType = fieldDefinition.type;
                const actualType = Array.isArray(data[key]) ? 'array' : typeof data[key];
                if (actualType !== expectedType) {
                    throw new Error(`Type mismatch for property ${key}: expected ${expectedType}, got ${actualType}`);
                }

                // Check for required fields
                if (fieldDefinition.required && (data[key] === undefined || data[key] === null)) {
                    throw new Error(`Field '${key}' is required`);
                }

                // Set default values
                if (fieldDefinition.default !== undefined && data[key] === undefined) {
                    data[key] = fieldDefinition.default;
                }
            }
        }
    }

    CustomModel.modelName = modelName;
    return CustomModel;
}

module.exports = {
    define
};
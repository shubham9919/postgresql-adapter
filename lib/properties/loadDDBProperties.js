"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadDDBProperties = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const LOG_PREFIX_CLASS = "LoadProperties|";
if (process.env.ENVIRONMENT === 'dev') {
    const credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile: 'default' });
    aws_sdk_1.default.config.credentials = credentials;
}
class LoadDDBProperties {
    constructor(table, key, feature) {
        this.dynamo = new aws_sdk_1.default.DynamoDB.DocumentClient({ region: 'us-east-1' });
        console.log(LOG_PREFIX_CLASS + ' Loading properties from DDB and SM');
        this.DDB_TABLE = table;
        this.DDB_KEY = key;
        this.DDB_FEATURE = feature;
    }
    async LoadDDBConfigs() {
        var _a, _b;
        try {
            const LOG_PREFIX_FN = "LoadDDBConfigs|";
            console.log(this.DDB_KEY, this.DDB_FEATURE);
            const params = {
                TableName: this.DDB_TABLE,
                Key: {
                    'key': this.DDB_KEY,
                    'feature': this.DDB_FEATURE
                },
            };
            const result = await this.dynamo.get(params).promise();
            console.log(LOG_PREFIX_FN + "**************************************");
            console.log((_a = result.Item) === null || _a === void 0 ? void 0 : _a.value);
            console.log(LOG_PREFIX_FN + "**************************************");
            return (_b = result.Item) === null || _b === void 0 ? void 0 : _b.value;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.LoadDDBProperties = LoadDDBProperties;

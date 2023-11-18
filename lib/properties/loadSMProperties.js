"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadSMProperties = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const LOG_PREFIX_CLASS = "LoadSMProperties|";
if (process.env.ENVIRONMENT === 'dev') {
    const credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile: 'default' });
    aws_sdk_1.default.config.credentials = credentials;
}
class LoadSMProperties {
    constructor(sm_name) {
        this.sm = new aws_sdk_1.default.SecretsManager({ region: 'us-east-1' });
        console.log(LOG_PREFIX_CLASS + ' Loading properties from DDB and SM');
        this.SM_NAME = sm_name;
    }
    async LoadSMConfigs() {
        try {
            const LOG_PREFIX_FN = "LoadSMConfigs|";
            const secretValue = await this.sm.getSecretValue({ SecretId: this.SM_NAME }).promise();
            if (secretValue === null || secretValue === void 0 ? void 0 : secretValue.SecretString) {
                console.log(LOG_PREFIX_FN + "**************************************");
                console.log(JSON.parse(secretValue.SecretString));
                console.log(LOG_PREFIX_FN + "**************************************");
                return JSON.parse(secretValue.SecretString);
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.LoadSMProperties = LoadSMProperties;

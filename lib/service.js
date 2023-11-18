"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmiableAiProperties = void 0;
const constants_json_1 = __importDefault(require("../constants/constants.json"));
const index_1 = require("./properties/index");
const index_2 = require("./utils/index");
const LOG_PREFIX_CLASS = "AmiableAiProperties|";
class AmiableAiProperties {
    constructor(project, environment, search_path) {
        console.log(process.env.PROJECT);
        this.project = project || 'amiable_ai';
        this.environment = environment || 'test';
        this.schema_search_path = search_path || 'amiableai_prod';
    }
    async initialize() {
        // const LOG_PREFIX_FN = LOG_PREFIX_CLASS + "initialize|";
        try {
            if (this.project === 'None' || this.environment === 'None') {
                console.log('Project or environment is Not Defined');
                return "ENVIRONMENT_OR_PROJECT_NOT_DEFINED";
            }
            else {
                const amiableAiTable = constants_json_1.default.DDB_CONFIG_TABLE;
                const amiableAiDDBComponent = constants_json_1.default.DDB_CONFIG_KEY;
                const amiableAiFeature = constants_json_1.default.DDB_CONFIG_FEATURE;
                // logger.silly(`${LOG_PREFIX_FN} DDBComponent: ${sxmDDBFeature} , DDBFeature :${sxmDDBFeature} , SMComponent: ${sxmSMComponent}, SMFeature :${sxmSMFeature}, SMStorageSpace: ${JSON.stringify(smStorageProps)}`);
                // Loading the properties
                const CONFIGS_OBJECT = new index_1.LoadDDBProperties(amiableAiTable, amiableAiDDBComponent, amiableAiFeature);
                const CONFIGS = await CONFIGS_OBJECT.LoadDDBConfigs();
                const FILTER_OBJ = new index_2.FilterProps();
                const PROJECT_DETAILS = FILTER_OBJ.filterProjectDDBProps(CONFIGS, this.project, this.environment);
                const SM_CONFIGS = new index_1.LoadSMProperties(PROJECT_DETAILS['common_secret_name']);
                const SM_CONFIGURATIONS = await SM_CONFIGS.LoadSMConfigs();
                const SM_VALUES = FILTER_OBJ.filterProjectSMProps(SM_CONFIGURATIONS, PROJECT_DETAILS['common_secret_key']);
                const DB_INIT = new index_2.InitializeDatabseConnection(this.schema_search_path);
                const DB_INIT_RES = await DB_INIT.init(SM_VALUES['rds_connection_props']);
                // await DB_INIT.executeSelect('SELECT * FROM user_info where uid = $1', [5])
                return DB_INIT;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AmiableAiProperties = AmiableAiProperties;

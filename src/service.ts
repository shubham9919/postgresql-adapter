import constants from '../constants/constants.json'
import { LoadDDBProperties, LoadSMProperties } from './properties/index'
import { FilterProps, InitializeDatabseConnection } from './utils/index'
const LOG_PREFIX_CLASS = "AmiableAiProperties|";

export class AmiableAiProperties {

    private project: string
    private environment: string
    private schema_search_path: string
    constructor(project: string, environment: string, search_path: string){
        console.log(process.env.PROJECT)
        this.project =  project || 'amiable_ai'
        this.environment = environment || 'test'
        this.schema_search_path = search_path || 'amiableai_prod'
    }

    public async initialize(): Promise<any> {

        // const LOG_PREFIX_FN = LOG_PREFIX_CLASS + "initialize|";
        try {
            if (this.project === 'None' || this.environment === 'None'){
                console.log('Project or environment is Not Defined')
                return "ENVIRONMENT_OR_PROJECT_NOT_DEFINED"
            }else{
                const amiableAiTable: string = constants.DDB_CONFIG_TABLE
                const amiableAiDDBComponent: string = constants.DDB_CONFIG_KEY;
                const amiableAiFeature: string = constants.DDB_CONFIG_FEATURE;
                // logger.silly(`${LOG_PREFIX_FN} DDBComponent: ${sxmDDBFeature} , DDBFeature :${sxmDDBFeature} , SMComponent: ${sxmSMComponent}, SMFeature :${sxmSMFeature}, SMStorageSpace: ${JSON.stringify(smStorageProps)}`);
    
                // Loading the properties
                const CONFIGS_OBJECT = new LoadDDBProperties(amiableAiTable, amiableAiDDBComponent, amiableAiFeature);
                const CONFIGS = await CONFIGS_OBJECT.LoadDDBConfigs()
                const FILTER_OBJ = new FilterProps()
                const PROJECT_DETAILS: any = FILTER_OBJ.filterProjectDDBProps(CONFIGS, this.project, this.environment)
                const SM_CONFIGS = new LoadSMProperties(PROJECT_DETAILS['common_secret_name'])
                const SM_CONFIGURATIONS = await SM_CONFIGS.LoadSMConfigs()
                const SM_VALUES: any = FILTER_OBJ.filterProjectSMProps(SM_CONFIGURATIONS, PROJECT_DETAILS['common_secret_key'])
                const DB_INIT = new InitializeDatabseConnection(this.schema_search_path)
                const DB_INIT_RES = await DB_INIT.init(SM_VALUES['rds_connection_props'])
                // await DB_INIT.executeSelect('SELECT * FROM user_info where uid = $1', [5])
                return DB_INIT;
            }
        } catch (error) {
            throw error;
        }
    }
}
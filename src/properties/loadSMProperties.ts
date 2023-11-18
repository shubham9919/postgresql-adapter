import AWS from 'aws-sdk';

const LOG_PREFIX_CLASS = "LoadSMProperties|";
if (process.env.ENVIRONMENT === 'dev'){
    const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
    AWS.config.credentials = credentials;
}
export class LoadSMProperties {
    private SM_NAME: string
    private sm = new AWS.SecretsManager({region: 'us-east-1'});
    
    constructor(sm_name: string){
        console.log(LOG_PREFIX_CLASS + ' Loading properties from DDB and SM')
        this.SM_NAME = sm_name
    }

    public async LoadSMConfigs(){
        try {
            const LOG_PREFIX_FN = "LoadSMConfigs|";
            const secretValue: AWS.SecretsManager.Types.GetSecretValueResponse =  await this.sm.getSecretValue({ SecretId: this.SM_NAME }).promise()
            if (secretValue?.SecretString){
                console.log(LOG_PREFIX_FN + "**************************************")
                console.log(JSON.parse(secretValue.SecretString))
                console.log(LOG_PREFIX_FN + "**************************************")
                return JSON.parse(secretValue.SecretString)
            }
            
        } catch (error) {
            console.log(error)
            throw error 
        }
    }
}
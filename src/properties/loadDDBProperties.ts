import AWS from 'aws-sdk';

const LOG_PREFIX_CLASS = "LoadProperties|";
if (process.env.ENVIRONMENT === 'dev'){
    const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
    AWS.config.credentials = credentials;
}
export class LoadDDBProperties {
    private DDB_TABLE: string
    private DDB_KEY: string
    private DDB_FEATURE: string
    private dynamo = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
    
    constructor(table: string, key: string, feature: string){
        console.log(LOG_PREFIX_CLASS + ' Loading properties from DDB and SM')
        this.DDB_TABLE = table
        this.DDB_KEY = key
        this.DDB_FEATURE = feature
    }

    public async LoadDDBConfigs(): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput>{
        try {
            const LOG_PREFIX_FN = "LoadDDBConfigs|";
            console.log(this.DDB_KEY , this.DDB_FEATURE)
            const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
                TableName: this.DDB_TABLE,
                Key: {
                    'key': this.DDB_KEY,
                    'feature': this.DDB_FEATURE
                },
            };
            const result: AWS.DynamoDB.DocumentClient.GetItemOutput = await this.dynamo.get(params).promise();
            console.log(LOG_PREFIX_FN + "**************************************")
            console.log(result.Item?.value)
            console.log(LOG_PREFIX_FN + "**************************************")
            return result.Item?.value
        } catch (error) {
            console.log(error)
            throw error 
        }
    }
}
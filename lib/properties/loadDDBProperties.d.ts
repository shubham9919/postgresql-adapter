import AWS from 'aws-sdk';
export declare class LoadDDBProperties {
    private DDB_TABLE;
    private DDB_KEY;
    private DDB_FEATURE;
    private dynamo;
    constructor(table: string, key: string, feature: string);
    LoadDDBConfigs(): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput>;
}

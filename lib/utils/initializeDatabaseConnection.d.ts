export declare class InitializeDatabseConnection {
    private client;
    private schema_search_path;
    constructor(search_path: string);
    init(configs: any): Promise<void>;
    executeQuery(query: string, options: any): Promise<any>;
    end(): Promise<void>;
    beginTransaction(): Promise<any>;
    commit(): Promise<any>;
    rollbackTransaction(): Promise<any>;
    releaseConnection(): Promise<any>;
}

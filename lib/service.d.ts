export declare class AmiableAiProperties {
    private project;
    private environment;
    private schema_search_path;
    constructor(project: string, environment: string, search_path: string);
    initialize(): Promise<any>;
}

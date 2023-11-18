import {Client} from 'pg'

export class InitializeDatabseConnection{

    private client: any
    private schema_search_path: string
    constructor(search_path: string){
        this.client = null
        this.schema_search_path = search_path
    }

    public async init(configs: any){
        try {
            this.client = new Client({
                host: configs.host,
                port: configs.port,
                database: configs.user,
                user: configs.user,
                password: configs.password,
                connectionString: `postgres://${configs.user}:${configs.password}@${configs.host}:${configs.port}/${configs.dbname}`,
                ssl: {
                    rejectUnauthorized: false
                }
              })
            await this.client.connect()
            await this.client.query(`SET search_path TO '${this.schema_search_path}';`)
            // console.log(result)
            // await InitializeDatabseConnection.client.end()
        } catch (error) {
            throw error
        }
    }

    public async executeQuery(query: string, options: any){
        try {
            const res = await this.client.query(query, options)
            return res
        } catch (error) {
            throw error
        }
    }

    public async end(){
        try {
            await this.client.end()
        } catch (error) {
            throw error
        }
    }

    public async beginTransaction(){
        try {
            const res =   await this.client.query('BEGIN')
            return res
        } catch (error) {
            throw error
        }
    }

    public async commit(){
        try {
            const res =   await this.client.query('COMMIT')
            return res
        } catch (error) {
            throw error
        }
    }

    public async rollbackTransaction(){
        try {
            const res =   await this.client.query('ROLLBACK')
            return res
        } catch (error) {
            throw error
        }
    }

    public async releaseConnection(){
        try {
            const res =   await this.client.release()
            return res
        } catch (error) {
            throw error
        }
    }
}
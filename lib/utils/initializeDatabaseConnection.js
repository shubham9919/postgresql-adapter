"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeDatabseConnection = void 0;
const pg_1 = require("pg");
class InitializeDatabseConnection {
    constructor(search_path) {
        this.client = null;
        this.schema_search_path = search_path;
    }
    async init(configs) {
        try {
            this.client = new pg_1.Client({
                host: configs.host,
                port: configs.port,
                database: configs.user,
                user: configs.user,
                password: configs.password,
                connectionString: `postgres://${configs.user}:${configs.password}@${configs.host}:${configs.port}/${configs.dbname}`,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            await this.client.connect();
            await this.client.query(`SET search_path TO '${this.schema_search_path}';`);
            // console.log(result)
            // await InitializeDatabseConnection.client.end()
        }
        catch (error) {
            throw error;
        }
    }
    async executeQuery(query, options) {
        try {
            const res = await this.client.query(query, options);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async end() {
        try {
            await this.client.end();
        }
        catch (error) {
            throw error;
        }
    }
    async beginTransaction() {
        try {
            const res = await this.client.query('BEGIN');
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async commit() {
        try {
            const res = await this.client.query('COMMIT');
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async rollbackTransaction() {
        try {
            const res = await this.client.query('ROLLBACK');
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async releaseConnection() {
        try {
            const res = await this.client.release();
            return res;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.InitializeDatabseConnection = InitializeDatabseConnection;

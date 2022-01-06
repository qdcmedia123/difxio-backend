// @ts-nocheck
import pg from 'pg';

class Pool {
    _pool = null;

    async connect(options:any) {
        this._pool = new pg.Pool(options);
        return this._pool.query('SELECT 1 + 1');
    }
    async close() {
        return await this._pool.end();
    }

    async query(sql, params) {
        return await this._pool.query(sql, params);
    }

}

export default new Pool()
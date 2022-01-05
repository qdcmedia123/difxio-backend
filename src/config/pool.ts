// @ts-nocheck
import pg from 'pg';

class Pool {
    _pool = null;

    async connect(options:any) {
        this._pool = new pg.Pool(options);
        return this._pool.query('SELECT 1 + 1');
    }
}

export default new Pool()
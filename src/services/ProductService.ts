// const product = require('../models/product');
// const pool = require('../database/client');

import product from '../models/product';
import pool from '../database/client';


class ProductService {
    getAll = async (cond : string = null) => {
        let sql : string = `SELECT * FROM product`;

        if (cond) {
            sql += ` WHERE ${cond}`;
        }

        try {
            const [result, fields] = await pool.execute(sql);
            const newRow = result as Array<any>;

            return newRow.map(row => {
                return new product(
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5],
                    row[6],
                    row[7]
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    findByID = async (id : number) => {
        const cond : string = ` id = ${id}`;

        const tmp : product[]  =  await this.getAll(cond);

        if(tmp.length) {
            return tmp[0];
        }
        
        return null;
    }


    // update = () => {

    // }
}

export default new ProductService();
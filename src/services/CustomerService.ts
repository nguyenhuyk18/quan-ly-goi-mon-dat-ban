import customer from "../models/customer";
import pool from "../database/client";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";


class CustomerService {
    getAll = async (cond : string = null) => {
        try {
            let query : string = `SELECT * FROM customer`;
            if (cond) {
                query += cond;
            }

            const [result, fields] = await pool.execute(query);
            const newRow = result as Array<any>

            return newRow.map(row => {
                return new customer(
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    row[5],
                    row[6],
                    row[7],
                    row[8],
                    row[9],
                    row[10],
                    row[11]
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    // tìm kiếm tất cả khách hàng với điều kiện
    find = async (id : number) => {
        const cond : string = ` WHERE id = ${id}`;
        const tmp : customer[] = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        
        return tmp[0];
    }

    // tìm khách hàng theo email
    findByEmail = async (email : string) => {
        const cond : string = ` WHERE \`email\` = '${email}'`;
        const tmp : customer[] = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const customerItem = tmp[0];
        return customerItem;
    }

    // tìm khách hàng theo username
    findByUsername = async (username : string) => {
        const cond : string = ` WHERE \`username\` = '${username}'`;
        const tmp : customer[] = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        // const customerItem = tmp[0];
        return tmp[0];
    }

    // thêm mới khách hàng
    save = async (customerData : customer) => {
        const values : Array<any> = [
            customerData.name,//
            customerData.phone,//
            customerData.email,//
            customerData.ward_id,
            customerData.created_date,//
            customerData.status,//
            customerData.housenumber_street,
            customerData.shipping_name,
            customerData.shipping_mobile,
            customerData.password,//
            customerData.username//
        ];
        // console.log(values)
        try {
            const [result] = await pool.execute(`INSERT INTO customer (name, phone, email, ward_id, created_date, status, housenumber_street, shipping_name, shipping_mobile, password, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [...values]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    // kích hoạt tài khoản
    setActiveStatus = async (email : string) => {
        const query : string = `UPDATE customer SET status = 1 WHERE email = ?`;
        try {
            const [result] = await pool.execute(query, [email]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }




    // cập nhật thông tin khách hàng
    update = async (customerData : customer) => {
        const query : string = `UPDATE customer SET name = ?, phone = ?, email = ?, ward_id = ?, status = ?, housenumber_street = ?, shipping_name = ?, shipping_mobile = ?, password = ?, username = ? WHERE id = ?`;
        const values : Array<any> = [
            customerData.name,
            customerData.phone,
            customerData.email,
            customerData.ward_id,
            customerData.status,
            customerData.housenumber_street,
            customerData.shipping_name,
            customerData.shipping_mobile,
            customerData.password,
            customerData.username,
            customerData.id
        ];
        try {
            const [result] = await pool.execute(query, values) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    // xóa khách hàng
    destroy = async (id : number) => {
        const query : string = `DELETE FROM customer WHERE id = ?`;
        try {
            const [result] = await pool.execute(query, [id]) as [ResultSetHeader, any];
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

}

export default new CustomerService();

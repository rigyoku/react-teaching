import mysql from 'mysql2';

export const getConnection: () => mysql.Connection = () => {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'localtest',
    });
    con.connect();
    return con;
}

export const select = async <T>(con: mysql.Connection, sql: string) => {
    return await new Promise<T>((res, rej) => {
        con.query(sql, (err: Error, result: T) => {
            if (err) {
                return rej(err);
            }
            res(result)
        });
    })
}
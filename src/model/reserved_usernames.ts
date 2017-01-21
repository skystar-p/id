import * as trans from '../translations';
import { connect, Connection, QueryResult } from './utils';

/**
 * Check hosts and reserved_usernames tables
 */
export async function isReservedUserName(conn: Connection, name: string): Promise<boolean> {
  const sel = await conn.query(`select hostname as name from hosts where hostname = $1 union
    select name from reserved_usernames where name = $1`, [name]);
  return sel.rowCount !== 0;
}

/**
 * Add one entry to reserved_usernames
 */
export async function insert(name: string): Promise<QueryResult> {
  if (name === '') {
    throw trans.reservedUserNameEmpty;
  }
  const conn = await connect();
  try {
    const insert = await conn.query('insert into reserved_usernames (name) values ($1)', [name]);
    conn.close();
    return insert;
  } catch (e) {
    conn.close();
    if (e.constraint === 'reserved_usernames_pkey') {
      throw trans.userNameDuplicate(name);
    }
    throw e;
  }
}

/**
 * Delete
 */
export async function remove(name: string): Promise<QueryResult> {
  if (name === '') {
    throw trans.reservedUserNameEmpty;
  }
  const conn = await connect();
  const result = await conn.query('delete from reserved_usernames where name = $1', [name]);
  conn.close();
  if (result.rowCount === 0) {
    throw trans.reservedUserNameNotFound(name);
  }
  return result;
}
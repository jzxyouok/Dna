/**
 * Created by haojiachen on 2016/12/7.
 */
import request from '../utils/request';

export async function query(params) {
  return request.post('api/role/query', params);
}

export async function save(params) {
  return request.post('api/role', params);
}

export async function del(id) {
  return request.del(`api/role/${id}`);
}

export async function isRoleExists(params) {
  return request.post('api/role/exist', params);
}
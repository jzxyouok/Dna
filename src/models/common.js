/**
 * Created by haojiachen on 2016/11/25.
 */
import {notification} from 'antd';
import {routerRedux} from 'dva/router';
import * as authService from '../services/auth';

export default {

  namespace: 'common',

  state: {
    user: {},
    pwdModalVisible: false
  },

  effects: {
    * login ({ payload }, { call, put }){
      const data = yield call(authService.login, payload);
      //跳转登录
      yield put(routerRedux.push('/app'));
      notification.success({
        message: '登录成功!',
        description: `欢迎 ${data.name ? data.name : ' 您使用!'}`
      });
    },
    * logout ({}, { call, put }){
      yield call(authService.logout);
      yield put({ type: 'logoutSuccess' });
      //跳转登录
      yield put(routerRedux.push('/login'));
      //刷新界面,清空redux的缓存
      window.location.reload();
      notification.success({
        message: '成功',
        description: '成功已登出,欢迎再次使用!'
      });

    },
    * getUserInfo ({ payload }, { call, put }){
      const user = yield call(authService.getUserInfo);
      yield put({ type: 'getUserInfoSuccess', payload: { user } })
    },
    * changePwd ({ payload }, { call, put}){
      yield call(authService.changePwd, payload);
      yield put({ type: 'hidePwdModal' });
      notification.success({
        message: '成功!',
        description: '更改密码成功!'
      });
    },
  },

  reducers: {
    getUserInfoSuccess(state, { payload }){
      return { ...state, ...payload }
    },
    logoutSuccess(state){
      return { ...state, user: {} }
    },
    showPwdModal(state, { payload }) {
      return { ...state, ...payload, pwdModalVisible: true };
    },
    hidePwdModal(state) {
      return { ...state, pwdModalVisible: false };
    },
  },

  subscriptions: {}
}

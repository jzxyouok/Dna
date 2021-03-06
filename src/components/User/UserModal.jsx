import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import {isUserExists} from '../../services/user';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const UserModal = ({ form, visible, item = {}, onOk, onCancel, roleList }) => {

  const { getFieldDecorator, validateFields, getFieldsValue, } = form;

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...item, ...getFieldsValue() };
      onOk(data);
    });
  };

  const modalOpts = {
    maskClosable: false,
    title: `${!item.id ? '新增' : '修改'}用户`,
    visible,
    onOk: handleOk,
    onCancel,
  };

  /**
   * 检测用户是否重复
   * @param rule
   * @param value
   * @param callback
   * @param source
   */
  const checkAccount = (rule, value, callback, source) => {
    if (!value || value === item.account) {
      callback();
    } else {
      if (item.id) {
        source.id = item.id;
      }
      //查询当前用户
      isUserExists(source).then(result => {
        result ? callback([new Error('抱歉，该用户名已被占用。')]) : callback();
      }).catch((error) => {
        error.showError && error.showError();
      });
    }
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="姓名：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              { required: true, message: '名称未填写' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="账号：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('account', {
            initialValue: item.account,
            rules: [
              { required: true, message: '不能为空' },
              { validator: checkAccount }
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="手机号：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('mobile', {
            initialValue: item.mobile
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="email：" hasFeedback {...formItemLayout} >
          {getFieldDecorator('email', {
            initialValue: item.email
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem label="角色：" {...formItemLayout} >
          {getFieldDecorator('roles', {
            initialValue: item.roles ? item.roles.map(n => n.id) : []
          })(
            <Select
              multiple
              placeholder="请选择"
            >
              {roleList.map(n => (<Option key={n.id}>{n.name}</Option>))}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

UserModal.propTypes = {};
UserModal.defaultProps = {};

export default Form.create()(UserModal);

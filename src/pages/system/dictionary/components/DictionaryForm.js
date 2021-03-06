import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, Button, message } from 'antd';
import { connect } from 'umi';
import { isEmpty } from '@/utils/utils';

const DictionaryForm = connect(({ systemDictionary: { dictionary }, loading }) => ({
  dictionary,
  loading:
    loading.effects['systemDictionary/fetchById'] ||
    loading.effects['systemDictionary/add'] ||
    loading.effects['systemDictionary/update'],
}))(({ loading, visible, isEdit, id, dictionary, closeModal, dispatch, ...rest }) => {
  const [form] = Form.useForm();
  const { location, match } = rest;
  const {
    query: { name: parentName },
  } = location;
  const {
    params: { id: parentId },
  } = match;
  const { resetFields, setFieldsValue } = form;

  // 【修改时，获取字典表单数据】
  useEffect(() => {
    if (visible && isEdit) {
      dispatch({
        type: 'systemDictionary/fetchById',
        payload: {
          id,
        },
      });
    }
    return () => {
      dispatch({
        type: 'systemDictionary/clear',
      });
    };
  }, [visible, isEdit, id, dispatch]);

  // 【修改时，回显字典表单】
  useEffect(() => {
    // 👍 将条件判断放置在 effect 中
    if (visible && isEdit) {
      if (!isEmpty(dictionary)) {
        setFieldsValue(dictionary);
      }
    }
  }, [visible, isEdit, dictionary, setFieldsValue]);

  // 【添加与修改】
  const handleAddOrUpdate = (values) => {
    if (isEdit) {
      dispatch({
        type: 'systemDictionary/update',
        payload: {
          ...values,
          id,
          parentId,
        },
        callback: () => {
          resetFields();
          closeModal();
          message.success('修改字典成功。');
        },
      });
    } else {
      dispatch({
        type: 'systemDictionary/add',
        payload: {
          ...values,
          parentId,
        },
        callback: () => {
          resetFields();
          closeModal();
          message.success('添加字典成功。');
        },
      });
    }
  };

  // 【表单布局】
  const layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };
  const tailLayout = {
    wrapperCol: {
      xs: { offset: 0, span: 24 },
      sm: { offset: 5, span: 19 },
    },
  };

  return (
    <Modal destroyOnClose title={isEdit ? '修改' : '新增'} visible={visible} onCancel={closeModal} footer={null}>
      <Form
        {...layout}
        form={form}
        name="dictionaryForm"
        className="form"
        initialValues={{
          status: true,
        }}
        onFinish={handleAddOrUpdate}
      >
        {parentName && (
          <Form.Item label="父级名称">
            <Input value={parentName} disabled />
          </Form.Item>
        )}
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请将名称长度保持在1至20字符之间！',
              min: 1,
              max: 20,
            },
          ]}
        >
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item
          label="编码"
          name="code"
          rules={[
            {
              required: true,
              message: '请将编码长度保持在1至20字符之间！',
              min: 1,
              max: 20,
            },
          ]}
        >
          <Input placeholder="请输入字典编码" />
        </Form.Item>
        <Form.Item
          label="值"
          name="value"
          rules={[{ required: true, message: '请将值长度保持在1至20字符之间！', min: 1, max: 20 }]}
        >
          <Input placeholder="请输入字典值" />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={[{ required: true }]} valuePropName="checked">
          <Switch checkedChildren="开" unCheckedChildren="关" />
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <InputNumber placeholder="请输入字典排序" min={0} max={999} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ message: '请将描述长度保持在1至50字符之间！', min: 1, max: 50 }]}
        >
          <Input.TextArea placeholder="请输入字典描述。" autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button onClick={closeModal}>取消</Button>
          <Button type="primary" loading={loading} htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default DictionaryForm;

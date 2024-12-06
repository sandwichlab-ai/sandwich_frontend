import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ReactComponent as EditIcon } from '../../assets/images/edit.svg';
import { Form } from 'antd';
import Loading from '../loading/loading';

export default function EditFormItem({
  children,
  className,
  btnClassName,
  label,
  value,
  onConfirm,
  rootClassName,
}) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleConfirm = async (values) => {
    setLoading(true);
    await onConfirm?.(values);
    setLoading(false);
  };

  return (
    <div className={`edit-form-item ${rootClassName}`}>
      <Form className={className} form={form} onFinish={handleConfirm}>
        {label && <span className='mr-2'>{label}</span>}
        {loading ? (
          <Loading />
        ) : edit ? (
          <div className='flex items-center'>
            {children}
            <span
              key='2'
              className={`cursor-pointer ${btnClassName} ml-2`}
              onClick={(e) => {
                e.stopPropagation();
                setEdit(false);
              }}
            >
              <CloseOutlined />
            </span>
            <span
              key='2'
              className={`cursor-pointer ${btnClassName} ml-2`}
              onClick={(e) => {
                e.stopPropagation();
                form.submit(); // 触发表单提交
                setEdit(false);
              }}
            >
              <CheckOutlined />
            </span>
          </div>
        ) : (
          <span className='flex items-center'>
            {value}
            <span
              className={`cursor-pointer ${btnClassName}`}
              onClick={(e) => {
                e.stopPropagation();
                setEdit(true);
              }}
            >
              <EditIcon />
            </span>
          </span>
        )}
      </Form>
    </div>
  );
}

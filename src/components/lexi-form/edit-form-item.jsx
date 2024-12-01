import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { ReactComponent as EditIcon } from '../../assets/images/edit.svg';
import { Form } from 'antd';

export default function EditFormItem({
  children,
  className,
  btnClassName,
  label,
  value,
  onConfirm,
}) {
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  return (
    <div className='edit-form-item'>
      <Form className={className} form={form} onFinish={onConfirm}>
        {label && <span className='mr-2'>{label}</span>}
        {edit ? (
          <>
            {children}
            <span
              key='2'
              className={`cursor-pointer ${btnClassName}`}
              onClick={(e) => {
                e.stopPropagation();
                form.submit(); // 触发表单提交
                setEdit(false);
              }}
            >
              <CheckOutlined />
            </span>
          </>
        ) : (
          <span className='flex'>
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

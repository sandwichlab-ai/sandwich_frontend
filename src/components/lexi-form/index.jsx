import React, { useEffect } from 'react';
import _ from 'lodash';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Radio,
  Row,
  Col,
} from 'antd';

import './index.scss';
import Examples from '../examples';
import LexiButton from '../lexi-button';

const LexiForm = ({ config = [], buttonConfig = [], onSubmit, data }) => {
  const [form] = Form.useForm();
  // 初始化默认值
  useEffect(() => {
    data.id && form.setFieldsValue(data);
  }, [data]);
  // 渲染字段方法
  const renderField = (field) => {
    switch (field.type) {
      case 'group':
        return (
          <Row gutter={16}>
            {field.children.map((item, index) => (
              <Col span={item.col || 24 / field.children.length} key={index}>
                {renderFieldItem(item)}
              </Col>
            ))}
          </Row>
        );
      case 'textarea':
        if (field.withExamples) {
          return (
            <Row>
              <Col span={14}>{renderFieldItem(field)}</Col>
              <Col span={10}>
                <Examples examples={field.examples} />
              </Col>
            </Row>
          );
        } else {
          return renderFieldItem(field);
        }
      default:
        return renderFieldItem(field);
    }
  };

  const renderFieldItem = (field) => {
    return (
      <Form.Item
        label={field.label}
        name={field.name}
        rules={field.rules}
        extra={field.extra}
        hidden={field.hidden}
      >
        {renderFormItemByType(field)}
      </Form.Item>
    );
  };

  const renderFormItemByType = (field) => {
    switch (field.type) {
      case 'input':
        return <Input placeholder={field.placeholder} />;
      case 'number':
        return (
          <InputNumber
            addonBefore={field.addonBefore}
            placeholder={field.placeholder}
            style={{ width: '100%' }}
            min={field.min}
            initialvalues={field.defaultValue}
          />
        );
      case 'datePicker':
        return (
          <DatePicker
            style={{ width: '100%' }}
            format={field.format || 'YYYY-MM-DD'}
          />
        );
      case 'select':
        return (
          <Select
            mode={field.mode || undefined}
            placeholder={field.placeholder}
            options={field.options}
            allowClear
          />
        );
      case 'textarea':
        return (
          <Input.TextArea
            rows={field.rows || 4}
            placeholder={field.placeholder}
          />
        );
      case 'radio':
        return (
          <Radio.Group>
            {field.options.map((option) => (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        onFinish={onSubmit}
        initialvalues={config.reduce((acc, field) => {
          acc[field.name] = field.defaultValue || null;
          return acc;
        }, {})}
      >
        {config.map((field, index) => {
          if (field.hidden) {
            return null;
          } else if (field.type === 'custom') {
            return field.children;
          } else {
            return (
              <div className='lexi-form-item' key={index}>
                {renderField(field)}
              </div>
            );
          }
        })}
        {!!buttonConfig.length && (
          <div className='lexi-form__buttons'>
            {buttonConfig.map((button) =>
              button.type !== 'submit' && button.onClick ? (
                <LexiButton
                  text={button.label}
                  type={button.type}
                  handleClick={(e) => {
                    if (e) e.preventDefault(); // 阻止默认行为，eg project中使用动态表单时，点击按钮切换steps会渲染出另一个表单，同时会触发该位置上的另一个表单的按钮
                    button.onClick();
                  }}
                ></LexiButton>
              ) : (
                <LexiButton text={button.label} type={button.type}></LexiButton>
              )
            )}
          </div>
        )}
      </Form>
    </div>
  );
};

export default LexiForm;

import React, { useState } from 'react';
import { Button, Dropdown, Modal } from 'antd';
import './index.scss';
import LexiButton from '../lexi-button';

function LexiModal({
  open,
  confirmLoading,
  handleConfirm,
  handleCancel,
  title,
  content,
}) {
  return (
    <Modal
      className='lexi-modal'
      title='title'
      open={open}
      onOk={handleConfirm}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <LexiButton handleClick={handleConfirm} text='Cancel'></LexiButton>,
        <LexiButton handleClick={handleConfirm} text='Confirm'></LexiButton>,
      ]}
    >
      <div className='lexi-modal__title'>{title}</div>
      <div className='lexi-modal__content'>{content}</div>
    </Modal>
  );
}

export default LexiModal;

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
  showTitle,
  isPublished,
  isFromDashboard
}) {
  return (
    <Modal
      className='lexi-modal'
      title={showTitle ? 'title' : null}
      open={open}
      onOk={handleConfirm}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={(isFromDashboard && !isPublished) ?
        [
          <LexiButton handleClick={handleConfirm} text='Ok'></LexiButton>,
        ] :
        [
          <LexiButton handleClick={handleConfirm} text='Cancel'></LexiButton>,
          <LexiButton handleClick={handleConfirm} text='Confirm'></LexiButton>,
        ]
      }
      width={1500}
    >
      <div className='lexi-modal__title'>{title}</div>
      <div className='lexi-modal__content'>{content}</div>
    </Modal>
  );
}

export default LexiModal;

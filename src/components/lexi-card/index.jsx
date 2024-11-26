/**
 * lexi 卡片列表
 */

import React, { useState, useMemo } from 'react';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import LexiModal from '../lexi-modal';

import './index.scss';

function CardList({ list, handleAddItem, addUrl, from, operationOptions, editUrl }) {
  return (
    <div className='lexi-cards'>
      {/* {`${list[0]?.name}`} */}
      {list.map((item) => (
        <Link
          to={`${editUrl}/${item.id}`}
          state={item.name}
        >
          <CardItem key={item.id} data={item} operationOptions={operationOptions}></CardItem>
        </Link>
      ))}
      <AddCard handleAddItem={handleAddItem} addUrl={addUrl} from={from} />
    </div>
  );
}

function AddCard({ handleAddItem, addUrl, from }) {
  return (
    <div className='lexi-cards__item'>
      <div className='lexi-cards__item__content lexi-cards__item__add'>
        <Link to={addUrl}>
          <Button
            className='lexi-cards__item__add__button'
            type='default'
            icon={<PlusOutlined style={{ fontSize: '30px' }} />}
            size='large'
            onClick={handleAddItem}
          ></Button>
        </Link>
        <div className='lexi-cards__item__content__name'>
          Create a new {from}
        </div>
      </div>
    </div>
  );
}

function CardItem({ data, operationOptions }) {
  const [showModal, setShowModal] = useState(false);
  const [currentOpertion, setCurrentOpertion] = useState({});

  const handleOk = () => {
    setShowModal(false);
    currentOpertion.handleConfirm?.(data);
  };
  const handleCancel = () => {
    setShowModal(false);
    currentOpertion.handleCancel?.(data);
  };

  const operationItems = operationOptions.map(item => ({
    key: item.key,
    title: item.buttonName,
    label: (
      <Button color='default' variant='link' onClick={() => {
        setShowModal(true);
        setCurrentOpertion(item);
      }} icon={item.icon}>{item.buttonName}</Button>
    )
  }))

  return (
    <div className='lexi-cards__item' key={data.id}>
      <div className='lexi-cards__item__header'>
        {data.status != null && (
          <div className='lexi-cards__item__header__tag'>
            {data.status === 'isRunning' ? 'Lexi is running' : ''}
          </div>
        )}
        <Dropdown menu={{ items: operationItems }} placement='bottomRight'>
          <div className='lexi-cards__item__header__operation'>···</div>
        </Dropdown>
      </div>
      <div className='lexi-cards__item__content'>
        <div className='lexi-cards__item__content__name'>{data.name}</div>
      </div>
      <div className='lexi-cards__item__footer'>
        <div className='lexi-cards__item__footer__date'>
          Edit in {data.formatUpdateTime()}
        </div>
      </div>
      <LexiModal
        open={showModal}
        handleConfirm={handleOk}
        handleCancel={handleCancel}
        title={currentOpertion.modalTitle}
        content={currentOpertion.modalContent}
      ></LexiModal>
    </div>
  );
}

export default CardList;

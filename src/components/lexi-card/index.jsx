/**
 * lexi 卡片列表
 */

import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import LexiModal from '../lexi-modal';
import _ from 'lodash';

import './index.scss';

function CardList({
  list,
  handleAddItem,
  addUrl,
  from,
  operationOptions,
  editUrl,
  onEdit,
  map,
}) {
  const navigate = useNavigate();
  const handleEdit = (e, item) => {
    onEdit
      ? onEdit(item)
      : navigate(`${editUrl}/${_.get(item, map?.id || 'id')}`);
  };
  return (
    <div className='lexi-cards'>
      {list.map((item) => (
        <CardItem
          key={item.id}
          data={item}
          operationOptions={operationOptions}
          map={map}
          handleEdit={handleEdit}
        ></CardItem>
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

function CardItem({ data, operationOptions, map, handleEdit }) {
  const [showModal, setShowModal] = useState(false);
  const [currentOpertion, setCurrentOpertion] = useState({});

  useEffect(() => {}, [showModal]);

  const handleOk = () => {
    console.log('ok clicked', data);
    setShowModal(false);
    currentOpertion.handleConfirm?.(data);
  };
  const handleCancel = () => {
    setShowModal(false);
    currentOpertion.handleCancel?.(data);
  };

  const operationItems = operationOptions.map((item) => ({
    key: item.key,
    title: item.buttonName,
    label: (
      <Button
        color='default'
        variant='link'
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
          setCurrentOpertion(item);
        }}
        icon={item.icon}
      >
        {item.buttonName}
      </Button>
    ),
  }));
  return [
    <div
      className='lexi-cards__item cursor-pointer'
      key={data.id}
      onClick={(e) => {
        handleEdit(e, data);
      }}
    >
      <div className='lexi-cards__item__header'>
        <div className='lexi-cards__item__header__tag'>
          {data.status === 'SUBMITTED' ? 'Lexi is running' : ''}
        </div>
        <Dropdown menu={{ items: operationItems }} placement='bottomRight'>
          <div
            className='lexi-cards__item__header__operation'
            onClick={(e) => e.stopPropagation()}
          >
            ···
          </div>
        </Dropdown>
      </div>
      <div className='lexi-cards__item__content'>
        <div className='lexi-cards__item__content__name'>
          {_.get(data, map?.name || 'name')}
        </div>
      </div>
      <div className='lexi-cards__item__footer'>
        <div className='lexi-cards__item__footer__date'>
          Edit in {data.formatUpdateTime()}
        </div>
      </div>
    </div>,
    <LexiModal
      key='modal'
      open={showModal}
      handleConfirm={handleOk}
      handleCancel={handleCancel}
      title={currentOpertion.modalTitle}
      content={currentOpertion.modalContent}
    ></LexiModal>,
  ];
}

export default CardList;

/**
 * lexi 卡片列表
 */

import React, { useState, useMemo } from 'react';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LexiModal from '../lexi-modal';

import './index.scss';

function CardList({ list, handleAddItem, addUrl }) {
  return (
    <div className='lexi-cards'>
      {list.map((item) => (
        <CardItem key={item.id} data={item}></CardItem>
      ))}
      <AddCard handleAddItem={handleAddItem} addUrl={addUrl} />
    </div>
  );
}

function AddCard({ handleAddItem, addUrl }) {
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
          Create a new project
        </div>
      </div>
    </div>
  );
}

function CardItem({ data }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const showModal = (index) => {
    setOpenEdit(true);
    setOpenDelete(true);
  };
  const handleOk = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const handleCancel = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };

  const operationItems = useMemo(() => {
    return [
      {
        key: 'rename',
        title: 'Rename',
        label: (
          <Button
            color='default'
            onClick={() => showModal(0)}
            variant='link'
            icon={<EditOutlined />}
          >
            Rename
          </Button>
        ),
      },
      {
        key: 'delete',
        title: 'Delete',
        label: (
          <Button
            color='default'
            onClick={() => showModal(1)}
            variant='link'
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        ),
      },
    ];
  }, []);
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
        open={openEdit}
        handleConfirm={handleOk}
        handleCancel={handleCancel}
        title='Do you want to delete this project?'
        content="if you delete this project, you won't be able to recover it later"
      ></LexiModal>
      <LexiModal
        open={openDelete}
        handleConfirm={handleOk}
        handleCancel={handleCancel}
        title='Do you want to delete this project?'
        content="if you delete this project, you won't be able to recover it later"
      ></LexiModal>
    </div>
  );
}

export default CardList;

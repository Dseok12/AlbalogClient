import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { APIURL } from 'config.js';
import './Modal.scss';
import { useSelector } from 'react-redux';

const InviteModal = ({ handleModal }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const { name, email } = form;

  const locationId = useSelector(({ shop }) => shop._id);
  const token = useSelector(({ user }) => user.token);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const postForm = async () => {
      try {
        const response = await axios.post(
          `${APIURL}/location/${locationId}/invite`,
          {
            name,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert('메일 전송 성공 !');
        console.log(response.data);
      } catch (e) {
        console.log(e);
        alert('메일 전송을 실패하였습니다.');
      }
    };

    postForm();

    setForm({
      name: '',
      email: '',
    });
  };

  return (
    <div className="modal-container">
      <div className="modal-wrap">
        <h1 className="invite-title">직원초대</h1>
        <form onSubmit={onSubmit}>
          <label>이름</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="ex) 홍길동"
          />
          <label>이메일 주소</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="example@gmail.com"
          />
          <button className="btn-invite">초대하기</button>
          <button className="btn-close" onClick={handleModal}>
            닫기
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;

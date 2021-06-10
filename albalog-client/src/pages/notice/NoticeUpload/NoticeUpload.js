import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './NoticeUpload.scss';
import axios from 'axios';
import { APIURL } from 'config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const NoticeUpload = ({ shop, user, history }) => {
  const [noticeContent, setNoticeContent] = useState({
    title: '',
    content: '',
  });

  const { title, content } = noticeContent;

  const titleOnChange = (e) => {
    const nextForm = {
      ...noticeContent,
      title: e.target.value,
    };
    setNoticeContent(nextForm);
  };

  const noticeOnSubmit = (e) => {
    e.preventDefault();

    let body = {
      title,
      content,
    };
    console.log(`body: ${body}`);
    console.log(`id : ${shop._id}`);
    console.log(`token: ${user.token}`);

    axios
      .post(`${APIURL}/location/${shop._id}/notice/create`, body, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          window.location.replace(`/${shop._id}/notice`); // 페이지 이동 후 새로고침
        }
      });
  };

  return (
    <div id="NoticeUpload">
      <div className="upload-form">
        <form action="" onSubmit={noticeOnSubmit}>
          <input
            type="text"
            value={title}
            onChange={titleOnChange}
            placeholder="제목을 입력하세요"
          />
          <div className="write-cont">
            <CKEditor
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor);
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement(),
                  );

                editor = editor;
              }}
              onError={({ willEditorRestart }) => {
                if (willEditorRestart) {
                  this.editor.ui.view.toolbar.element.remove();
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                const nextForm = {
                  ...noticeContent,
                  content: data,
                };
                setNoticeContent(nextForm);
              }}
              editor={DecoupledEditor}
              data=""
            />
          </div>

          <button type="submit">등록하기</button>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { shop: state.shop, user: state.user };
}

export default withRouter(connect(mapStateToProps)(NoticeUpload));

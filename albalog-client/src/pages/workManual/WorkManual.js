import Header from 'components/Header/Header';
import MenualCategory from 'components/workManual/ManualCategory/ManualCategory';
import MenualList from 'components/workManual/ManualList/ManualList';
import MenualUpload from 'components/workManual/ManualUpload/ManualUpload';
import React, { useState } from 'react';
import './WorkManual.scss';
import AdminAside from '../../components/Aside/Aside';
import { withRouter } from 'react-router';

const WorkManual = ({ match }) => {
  // 카테고리가 선택되지 않았으면 기본값 all 사용

  const category = match.params.category || 'all';
  const [uploadState, setUploadState] = useState(false);

  const ToggleButton = () => {
    setUploadState(!uploadState);
  };

  return (
    <>
      <Header />
      <AdminAside />
      <div id="WorkManual" className="page-layout">
        <div className="tit">
          <h4 className="tit-corp">업무매뉴얼</h4>
          <div className="upload">
            <button onClick={ToggleButton}>추가</button>
          </div>
        </div>
        <div className="cont">
          <MenualCategory />
          <MenualList category={category} />
        </div>
      </div>
      {uploadState && (
        <MenualUpload uploadState={uploadState} ToggleButton={ToggleButton} />
      )}
    </>
  );
};

export default withRouter(WorkManual);

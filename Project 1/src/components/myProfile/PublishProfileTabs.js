import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Tabs,  Divider } from 'antd';
import CertificateList from './Certificate/certificateList';

const { TabPane } = Tabs;




const onChange = (key) => {
    console.log(key);
  };

  
const PublishProfileTabs = () => (
  <Tabs defaultActiveKey="1" onChange={onChange} >
    <TabPane tab="Basic Information" key="1" >
        Basic Information
    </TabPane>
    <TabPane tab="Education" key="2">
        Education Details
    </TabPane>
    <TabPane tab="Project" key="3">
        Project Details
    </TabPane>
    <TabPane tab="Certificate" key="4">        
        <CertificateList/>
    </TabPane>
    <TabPane tab="ExtraCurricular" key="5">
        Extra Curricular
    </TabPane>
  </Tabs>
);

export default PublishProfileTabs;
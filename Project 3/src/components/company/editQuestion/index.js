import React, { useState } from "react";
import { Tabs } from "antd";
import AutoScreening from "./AutoScreening/index";
import Questionnaire from "./Questionnaire/index";
import { Region } from "../../common/layout/region";
import "./index.css";
import "../../../index.css"

const { TabPane } = Tabs;

const Index = () => {
    const [activeTab, setActiveTab] = useState("autoScreening");

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div>
            <Region style={{background: 'var(--system-gray-050, #FAFAFA)'}}>
                <h1 style={{ color: 'var(--gray-800, #424242)', fontSize: '36px', fontFamily: 'RobotoCustom', fontWeight: '700', wordWrap: 'break-word', marginTop: '20px', paddingLeft: '32px' }}>Edit question</h1>
                <Tabs  activeKey={activeTab} onChange={handleTabChange} >
                    <TabPane tab="Auto Screening" key="autoScreening">
                        <AutoScreening />
                    </TabPane>
                    <TabPane tab="Questionnaire" key="questionnaire">
                        <Questionnaire />
                    </TabPane>
                </Tabs>
            </Region>
        </div>
    );
};

export default Index;
import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";

const WhatWeDo = () => {
	return (
		<Card type="inner" title="What we do" extra={<Button>Edit</Button>}></Card>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(WhatWeDo);

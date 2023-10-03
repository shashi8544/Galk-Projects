import React, { useState, useEffect } from "react";
import { Region } from "../common/layout/region";
import { connect } from "react-redux";
import {
	getAllCompanyList,
	resetComapnyList,
} from "../../actions/companyActions";
import { withRouter, Link } from "react-router-dom";
import Loading from "../common/loading";
import { List, Card, Avatar, Input } from "antd";
import "./style.css";

const { Meta } = Card;

const CompanyList = ({
	companyList,
	isLoading,
	getAllCompanyList,
	match,
	resetComapnyList,
}) => {
	const [list, setList] = useState(companyList);

	useEffect(() => {
		setList(companyList);
	}, [companyList]);

	useEffect(() => {
		getAllCompanyList();
	}, []);

	useEffect(() => {
		return () => {
			resetComapnyList();
		};
	}, []);

	const onNameSearch = (e) => {
		let val = e.target.value.toLowerCase();
		let allCompanies = companyList;

		setList(allCompanies.filter((x) => x.name.toLowerCase().includes(val)));
	};

	return (
		<Region>
			{isLoading && <Loading size="large" />}
			{list && (
				<>
					<Input
						placeholder="Type company name to search..."
						allowClear
						onChange={onNameSearch}
						style={{ marginBottom: 20, marginLeft: 20, width: "30%" }}
					/>
					<div
						style={{
							height: "85vh",
							overflowY: "scroll",
							padding: 20,
							paddingTop: 0,
						}}
					>
						<List
							grid={{
								gutter: 16,
								column: 3,
							}}
							dataSource={list}
							renderItem={(item) => (
								<Link to={`${match.path}/${item.id}`}>
									<List.Item key={item.id} className="companyList_listItem">
										<Card>
											<Meta
												avatar={<Avatar size={60} src={item.logo} />}
												title={item.name}
												description={`${item.industry}, ${item.address}`.slice(
													0,
													15
												)}
											/>
										</Card>
									</List.Item>
								</Link>
							)}
						/>
					</div>
				</>
			)}
		</Region>
	);
};

const mapStateToProps = (state) => ({
	isLoading: state.company.isCompanyListLoading,
	companyList: state.company.companyList,
});

export default connect(mapStateToProps, {
	getAllCompanyList,
	resetComapnyList,
})(withRouter(CompanyList));

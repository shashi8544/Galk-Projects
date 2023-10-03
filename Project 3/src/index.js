import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { firebase } from "./utils/configs/firebaseConfig";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import reportWebVitals from "./reportWebVitals";

// ReactReduxFirebaseProvider configs
const rrfConfig = {
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
	userProfile: "CompanyUserProfile",
	attachAuthIsReady: true,
};
const rrfProps = {
	firebase: firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance, // Create firestore instead of craete it in fbConfig.js
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

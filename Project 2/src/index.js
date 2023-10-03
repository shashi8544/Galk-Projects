import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { firebase } from "./utils/configs/firebaseConfig";

// react-redux-firebase config
// Create config for rrfProps object. We need this to pass it in the ReactReduxFirebaseProvider component
const rrfConfig = {
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
	userProfile: "StudentProfile",
	attachAuthIsReady: true, // allow access to prop which will say if the firebase auth is ready
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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React, { useState } from "react";
import { googleTranslate } from "./googleTranslateConfig";
import { Button } from "antd";

// const { Paragraph } = Typography;

function GoogleTranslateComponent(props) {
	// console.log("Original text:", props.originalText);
	const [translatedComponent, setTranslate] = useState("");

	const translate = () => {
		const japanese = "en";
		googleTranslate.translate(
			props.originalText,
			japanese,
			function (err, translation) {
				// console.log("Translated text:", translation);
				setTranslate(translation.translatedText);
			}
		);
	};

	const showOriginal = () => {
		setTranslate("");
	};

	return (
		<React.Fragment>
			<div className="row">
				{!translatedComponent ? (
					<Button type="primary" size="small" onClick={translate}>
						Translate to English
					</Button>
				) : (
					<Button type="primary" size="small" onClick={showOriginal}>
						Show Original
					</Button>
				)}
				{!translatedComponent ? (
					<p className="col translate-header">
						Click on, if you wish to translate to English
					</p>
				) : (
					<p className="col translate-header">
						Translated from Japanese to English
					</p>
				)}
			</div>
			{translatedComponent && (
				<p style={{ whiteSpace: "pre-wrap" }}>{translatedComponent}</p>
			)}
			<p style={{ whiteSpace: "pre-wrap" }}>{props.originalText}</p>

			{/* <p>
        {props.originalText
          ? props.originalText.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })
          : null}
      </p> */}
		</React.Fragment>
	);
}

// class GoogleTranslateComponent extends React.Component {
//   state = {
//     translatedComponent: "",
//   };

//   translate = () => {
//     const japanese = "en";
//     googleTranslate.translate(this.props.originalText, japanese, function (
//       err,
//       translation
//     ) {
//       this.setState({ translatedComponent: translation.translatedText });
//     });
//   };

//   showOriginal = () => {
//     this.setState({ translatedComponent: "" });
//   };
//   render() {
//     return (
//       <React.Fragment>
//         <div className="row">
//           {!this.state.translatedComponent ? (
//             <Button
//               size="small"
//               className="translate-button"
//               onClick={this.translate}
//             >
//               Translate to English
//             </Button>
//           ) : (
//             <Button
//               size="small"
//               className="translate-button"
//               onClick={this.showOriginal}
//             >
//               Show Original
//             </Button>
//           )}
//           {!this.state.translatedComponent ? (
//             <p className="col translate-header">
//               Click on, if you wish to translate to English
//             </p>
//           ) : (
//             <p className="col translate-header">
//               Translated from Japanese to English
//             </p>
//           )}
//         </div>
//         {this.state.translatedComponent ? (
//           <p style={{ whiteSpace: "pre-wrap" }}>
//             {this.state.translatedComponent}
//           </p>
//         ) : null}
//         <p style={{ whiteSpace: "pre-wrap" }}>
//           {this.props.originalText
//             ? this.props.originalText.split("\n").map((item, key) => (
//                 <span key={key}>
//                   {item}
//                   <br />
//                 </span>
//               ))
//             : null}
//         </p>
//       </React.Fragment>
//     );
//   }
// }

export default GoogleTranslateComponent;

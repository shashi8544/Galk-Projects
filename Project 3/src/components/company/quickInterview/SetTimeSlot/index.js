import React from 'react';
import Calendar from "./Calendar"
import { Region } from '../../../common/layout/region';
import "../index.css"
import { connect } from 'react-redux';
// import { Region } from "../common/layout/region";
const TextComponent = () => {
  return (

    // <Region>
    <div
    style={{
      height: "75vh",
      overflowY: "scroll",
      padding: 20,
      paddingTop: 0,
    }}
  >
      {/* <h1>Hello, React!</h1> */}
      {/* <p>This is a sample text component.</p> */}
   <Calendar />
      {/* <Calendar /> */}
     </div>// </Region>

  );
}

  
  
const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {

})(TextComponent);
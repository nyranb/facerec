import React from "react" ;
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='input_image' alt="" src={imageUrl} width='500px' height='auto'/>    
                <div className="bounding-box" style={{right: boxes.rightCol, top: boxes.topRow, left: boxes.leftCol, bottom: boxes.bottomRow}}></div>
            </div>
        </div>
    );
    
};

export default FaceRecognition;
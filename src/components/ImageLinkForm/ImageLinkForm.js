import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onBtnSubmit}) => {
    return (
        <div>
            <p className="f3">{"My brain will help detect faces!"}</p>
            <div className="center">
                <div className="form center pa4 br2 shadow-5">
                    <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}></input>
                    <button 
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue" 
                        onClick={onBtnSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;
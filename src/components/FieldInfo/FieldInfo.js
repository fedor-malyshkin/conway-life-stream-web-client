import React from "react";
import './FieldInfo.css';


const FieldInfo = (props) => {
    return <div class="infoTableData">
        <div>Field width: <span className="v"> {props.fieldState.width}</span></div>
        <div>Field height: <span className="v"> {props.fieldState.height}</span></div>
        <div>Generation number: <span className="v">{props.fieldState.turnNo}</span></div>
        <div>Generations left: <span className="v">{props.fieldState.stepLeft}</span></div>
        <div>Bytes received: <span className="v">{props.statistics.amountBytes}</span></div>
        <div>Messages count: <span className="v">{props.statistics.amountMessages}</span></div>
    </div>;

}

export default FieldInfo;
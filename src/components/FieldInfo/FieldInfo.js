import React from "react";
import './FieldInfo.css';


const FieldInfo = (props) => {

    const kbSize = new Intl.NumberFormat('en-IN', {maximumFractionDigits: 2}).format(props.statistics.amountBytes / 1000)

    return <table class="infoTableData">
        <tr>
            <td className="tableLabel">Field width:</td>
            <td className="tableValue">{new Intl.NumberFormat().format(props.fieldState.width)}</td>
            <td className="tableLabel">Generation number:</td>
            <td className="tableValue">{new Intl.NumberFormat().format(props.fieldState.turnNo)}</td>
        </tr>

        <tr>
            <td className="tableLabel">Field height:</td>
            <td className="tableValue">{new Intl.NumberFormat().format(props.fieldState.height)}</td>
            <td className="tableLabel">Generations left:</td>
            <td className="tableValue">{new Intl.NumberFormat().format(props.fieldState.stepLeft)}</td>
        </tr>

        <tr>
            <td className="tableLabel">Bytes received:</td>
            <td className="tableValue">{kbSize} Kb</td>
            <td className="tableLabel">Messages count:</td>
            <td className="tableValue">{new Intl.NumberFormat().format(props.statistics.amountMessages)}</td>
        </tr>
    </table>;

}

export default FieldInfo;
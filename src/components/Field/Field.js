import React from "react";
import './Field.css';


const Field = (props) => {
    function composeField() {
        const field = []
        if (props.fieldState.cells.length > 0) {
            for (let y = 0; y < props.fieldState.height; y++) {
                const row = []
                for (let x = 0; x < props.fieldState.width; x++) {
                    const index = x + y * props.fieldState.width
                    if (props.fieldState.cells[index] === "A")
                        row.push(<span id="active"/>)
                    else {
                        const period = "how-long-" + props.fieldState.cells[index]
                        row.push(<span id="dead" className={period}/>)
                    }
                }
                field.push(<div className="row">{row}</div>)
            }
        }
        return field;
    }

    const field = composeField();


    return <React.Fragment>
        {field}
    </React.Fragment>;

}

export default Field;
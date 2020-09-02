import React, {useState} from 'react';
import './Dashboard.css';
import Field from "../../components/Field/Field";
import {baseUrl} from "../../App";
import FieldInfo from "../../components/FieldInfo/FieldInfo";
import html2canvas from "html2canvas";


const Dashboard = (props) => {
    const initialFieldState = {
        width: 0,
        height: 0,
        turnNo: 0,
        stepLeft: 0,
        cells: []
    }
    const initialStatistics = {
        amountMessages: 0,
        amountBytes: 0
    }

    const [fieldState, updateFieldState] = useState(initialFieldState);
    const [wsStatistics, updateWsStatistics] = useState(initialStatistics);
    const [wsState, updateWsState] = useState(null);
    let fieldStateNotSync = initialFieldState
    let statisticsNotSync = initialStatistics

    function composeFieldStateFromSnapshot(msg) {
        const cells = Array(msg.width * msg.height)
        for (let i = 0; i < msg.width * msg.height; i++) {
            cells[i] = "D"
        }
        if (msg.data.length > 0) {
            for (let c = 0; c < msg.data.length; c++) {
                const cell = msg.data[c]
                const index = cell.x + cell.y * msg.width
                if (cell.state === "active")
                    cells[index] = "A"
                else
                    cells[index] = cell["how-long"]
            }
        }

        return {
            width: msg.width,
            height: msg.height,
            turnNo: 0,
            stepLeft: 0,
            cells: cells
        };
    }

    function composeFieldStateFromUpdate(msg, fieldState) {
        // const cells = fieldState.cells
        const width = fieldState.width
        const height = fieldState.height
        const cells = fieldState.cells

        if (msg.data.length > 0) {
            for (let c = 0; c < msg.data.length; c++) {
                const cell = msg.data[c]
                const index = cell.x + cell.y * width
                if (cell.state === "active") {
                    cells[index] = "A"
                } else
                    cells[index] = cell["how-long"]
            }
        }

        return {
            width: width,
            height: height,
            turnNo: msg["turn-number"],
            stepLeft: msg["steps-left"],
            cells: cells
        };
    }


    function recalculateStatistics(msg, statisticsNotSync) {
        return {
            amountBytes: statisticsNotSync.amountBytes + msg.length,
            amountMessages: statisticsNotSync.amountMessages + 1
        };
    }

    function startWs() {
        if (wsState != null) return;
        const ws = new WebSocket(baseUrl);

        // websocket onopen event listener
        ws.onopen = () => {
            // console.log("connected websocket");
        };
        ws.onmessage = (rawMessage) => {
            const msg = JSON.parse(rawMessage.data);
            // console.log("msg.type: " + msg.type)
            if (msg.type === 'snapshot') {
                fieldStateNotSync = composeFieldStateFromSnapshot(msg)
                updateFieldState(fieldStateNotSync)
            }
            if (msg.type === 'field-event') {
                fieldStateNotSync = composeFieldStateFromUpdate(msg, fieldStateNotSync)
                updateFieldState(fieldStateNotSync)
            }
            if (msg.type === 'game-turn-ended') {
                // html2canvas(document.getElementById('field')).then(function (canvas) {
                //     document.body.appendChild(canvas);
                // });
            }
            statisticsNotSync = recalculateStatistics(rawMessage.data, statisticsNotSync)
            updateWsStatistics(statisticsNotSync)
        }
        ws.onclose = (event) => {
            // console.log(" websocket closed: " + event);
            updateWsState(null)
        }
        ws.onerror = (event) => {
            // console.log(" websocket error: " + event);
            updateWsState(null)
        }
        updateWsState(ws)
    }

    function stopWs() {
        if (wsState == null) return;
        wsState.close()
        updateWsState(null)
    }

    const startButton = <button onClick={() => startWs()}>Start</button>
    const stopButton = <button onClick={() => stopWs()}>Stop</button>
    const field = <Field fieldState={fieldState}/>
    const information = <FieldInfo fieldState={fieldState} statistics={wsStatistics}/>

    return (
        <div className="dashboard">
            <div className="header">
                <div className="infoTable">
                    {information}
                </div>
                <div className="controls">
                    {startButton}
                    {stopButton}
                </div>
            </div>
            <div id="field" className="field">
                {field}
            </div>
        </div>
    );
}
export default Dashboard;

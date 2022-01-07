import { useState } from "react";
import "./assets/css/timerinput.css";

export default function TimerInput({ display, setTimerValue }) {

    const reg = /^([0-9]+h{1}){0,1}([0-9]+m{1}){0,1}([0-9]+s{1}){0,1}$/gi;
    const hour = /[0-9]+h/g;
    const minute = /[0-9]+m/g;
    const second = /[0-9]+s/g;

    const [warning, setWarning] = useState("");
    const [inputValue, setInputValue] = useState({ h: 0, m: 0, s: 0 });
    const [editExpanded, setEditExpanded] = useState(false);

    return (
        <div className="timerinput-container" style={{ display: `${display === true ? "flex" : "none"}` }}>

            <div className="timerinput-edit" style={{ height : `${editExpanded ?  "0px" : "auto"}` }} onClick={() => setEditExpanded(!editExpanded)}>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24" /></g><g><g><polygon points="18,6.41 16.59,5 12,9.58 7.41,5 6,6.41 12,12.41" /><polygon points="18,13 16.59,11.59 12,16.17 7.41,11.59 6,13 12,19" /></g></g>
                </svg><span>edit timer</span>
            </div>

            <form className="timerinput-form" onSubmit={submit} style={{ height : `${!editExpanded ?  "0px" : "auto"}` }}>
                <span className="timerinput-help">Format: 10s, 1h20m10s</span>
                <div className="timerinput-row">
                    <div onClick={() => setEditExpanded(!editExpanded)}><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24" /></g><g><g><polygon points="6,17.59 7.41,19 12,14.42 16.59,19 18,17.59 12,11.59" /><polygon points="6,11 7.41,12.41 12,7.83 16.59,12.41 18,11 12,5" /></g></g></svg></div>
                    <input type="text" className={"timerinput-input " + warning} onChange={testPattern}></input>
                    <button>OK</button>
                </div>
            </form>

        </div>
    )

    function submit(e) {
        e.preventDefault();

        if (warning === "timerinput-warning") {
            // console.log("incorrect input");
        }
        else if (warning === "timerinput-ok") {
            setTimerValue(inputValue.h + inputValue.m + inputValue.s);
            e.target.reset();
        }
    }

    function testPattern(e) {
        const v = e.target.value;
        const r = v.match(reg);
        const h = v.match(hour);
        const m = v.match(minute);
        const s = v.match(second);

        if (e.target.value.length === 0) {
            setWarning("");
        } else if (r === null) {
            setWarning("timerinput-warning");
        }
        else {
            if (h) {
                // console.log(h);
                setInputValue(i => { return { ...i, h: Number(60 * 60 * h[0].slice(0, -1)) } })
            }
            else {
                setInputValue(i => { return { ...i, h: Number(0) } })
            }
            if (m) {
                // console.log(m);
                setInputValue(i => { return { ...i, m: Number(60 * m[0].slice(0, -1)) } })
            }
            else {
                setInputValue(i => { return { ...i, m: Number(0) } })
            }
            if (s) {
                // console.log(s);
                setInputValue(i => { return { ...i, s: Number(s[0].slice(0, -1)) } })
            }
            else {
                setInputValue(i => { return { ...i, s: Number(0) } })
            }

            setWarning("timerinput-ok");
        }
    }
}

const StopWatchRing = ({ progress, text, ms, pauseCallback, display, resetCallback, isRunning }) => {

    return (
        <div className="stopwatchring-container" style={{ display: `${display === true ? "flex" : "none"}` }}>
            <div className={"stopwatch-circle stopwatch-ring"} style={{ background: `conic-gradient( dodgerblue ${progress}%, rgb(60,60,60) 0 )` }}>
                <div className="stopwatch-circle stopwatch-innercircle">
                    <span className="stopwatch-text" onClick={pauseCallback}>{text}</span>
                    <span>{ms}</span>
                </div>
            </div>
            {buttons()}
        </div>
    )

    function buttons() {
        return <div className="stopwatch-buttons">
            <div className="stopwatch-pause" onClick={pauseCallback}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: `${isRunning === true ? "block" : "none"}` }}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: `${isRunning === true ? "none" : "block"}` }}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" /></svg>
            </div>
            <div onClick={resetCallback}>
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><path d="M13,3c-4.97,0-9,4.03-9,9c0,0.06,0.01,0.12,0.01,0.19l-1.84-1.84l-1.41,1.41L5,16l4.24-4.24l-1.41-1.41l-1.82,1.82 C6.01,12.11,6,12.06,6,12c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7c-1.9,0-3.62-0.76-4.88-1.99L6.7,18.42 C8.32,20.01,10.55,21,13,21c4.97,0,9-4.03,9-9S17.97,3,13,3z M15" /></svg>
            </div>
        </div>;
    }
}



export default StopWatchRing;
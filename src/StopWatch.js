import { useRef, useState, useEffect } from "react";
import "./assets/css/stopwatch.css";
import StopWatchRing from "./StopWatchRing";
import TimerInput from "./TimerInput";

export default function StopWatch() {

    const [stopWatchValue, setStopWatchValue] = useState(0);
    const [inputTimerValue, setInputTimerValue] = useState(0);
    const [timerValue, setTimerValue] = useState(5);
    const [maxTimerValue, setMaxTimerValue] = useState(5);
    const [stopwatchProgressBar, setProgressBar] = useState(0);
    const [timerProgressBar, setTimerProgressBar] = useState(100);
    const [toggleWatch, setToggleWatch] = useState(false);
    const [toggleTimer, setToggleTimer] = useState(false);
    const [toggleSWReset, setSWReset] = useState(false);
    const [toggleTimerReset, setTimerReset] = useState(false);
    const [page, setPage] = useState(0);
    const [isSWRunning, setIsSWRunning] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const refStopWatch = useRef(0);
    const refTimer = useRef(0);

    // For reset animation on a useEffect
    const refSWReset = useRef(0);
    const refTimerReset = useRef(0);

    /*
        Stop Watch 
        step set on 5ms for very smooth progress
    */
    useEffect(() => {
        if (toggleWatch === true) {
            refStopWatch.current = setInterval(() => {
                setStopWatchValue((stopWatchValue) => {
                    setProgressBar((stopWatchValue + 0.005) % 60 * 100 / 60);
                    return stopWatchValue + 0.005;
                })
            }, 5)
        }
    }, [toggleWatch])

    /**
     * Timer
     */
    useEffect(() => {
        if (toggleTimer === true) {

            refTimer.current = setInterval(() => {
                setTimerValue((timerValue) => {
                    if (timerValue <= 0) {
                        setToggleTimer(!toggleTimer);
                        setIsTimerRunning(false);

                        return 0;
                    }

                    setTimerProgressBar(timerValue * 100 / maxTimerValue);
                    return timerValue - 0.005;
                })
            }, 5)
        }
    }, [toggleTimer])

    /*
        Watcher on Timer change to set the max value for progress bar
    */
    useEffect(() => {
        resetTimer();
        setMaxTimerValue(v => inputTimerValue);
        setTimerValue(v => inputTimerValue);
    }, [inputTimerValue])

    /*
        StopWatch Reset with smooth animation 
        duration 200ms
        step 5ms
    */
    useEffect(() => {
        if (toggleSWReset === true) {
            const steps = 40;  // 200ms
            const increment = stopwatchProgressBar / steps;
            refSWReset.current = setInterval(() => {
                if (stopwatchProgressBar > 0)
                    setProgressBar((progressBar) => progressBar - increment);
                // setProgressBar( (progressBar) => progressBar / 2);
            }, 5);
        }
    }, [toggleSWReset])

    /*
        Timer Reset with smooth animation 
        duration 200ms
        step 5ms
    */
    useEffect(() => {
        if (toggleTimerReset === true) {
            const steps = 40;  // 200ms
            const increment = (100 - timerProgressBar) / steps;
            refTimerReset.current = setInterval(() => {
                if (timerProgressBar < 100)
                    setTimerProgressBar((p) => p + increment);
            }, 5);
        }
    }, [toggleTimerReset])

    function convertTime(data) {
        if (data < 60) {
            if (page === 0) {
                return addZeroDigit(Math.floor(data)) + "s";
            } else {
                return addZeroDigit(Math.ceil(data)) + "s";
            }
        } else {
            let _time = new Date(null);
            _time.setSeconds(data);

            if (data < 3600) {
                return addZeroDigit(_time.getMinutes()) + "m " + addZeroDigit(_time.getSeconds()) + "s";
            } else {
                return addZeroDigit(Math.floor(data / 3600)) + "h " + addZeroDigit(_time.getMinutes()) + "m " + addZeroDigit(_time.getSeconds()) + "s";
            }
        }
    }

    function addZeroDigit(s) {
        return ("0" + s).slice(-2);
    }

    function resetSW() {
        clearInterval(refStopWatch.current);
        setToggleWatch(false);
        setSWReset(true);
        setStopWatchValue(0);
        setIsSWRunning(false);
        setTimeout(() => {
            clearInterval(refSWReset.current);
            setSWReset(false);
            setProgressBar(0);
        }, 300);
    }

    function pauseSW() {
        clearInterval(refStopWatch.current);
        setToggleWatch(!toggleWatch);
        setIsSWRunning(!isSWRunning);
    }

    function pauseTimer() {
        clearInterval(refTimer.current);
        setToggleTimer(!toggleTimer);
        setIsTimerRunning(!isTimerRunning);
    }

    function resetTimer() {
        clearInterval(refTimer.current);
        setToggleTimer(false);
        setTimerReset(true);
        setTimerValue(c => maxTimerValue);
        setIsTimerRunning(false);
        setTimeout(() => {
            clearInterval(refTimerReset.current);
            setTimerReset(false);
            setTimerProgressBar(100);
        }, 300);
    }

    function extractMS(t) {
        var floating = t.toFixed(3).toString().split(".")[1];
        // if (floating === undefined) { return "000"; }
        return floating;
    }


    return (
        <div className="stopwatch-pagecontainer">
            {debug()}
            <div className="stopwatch-maincontainer">
                <TimerInput display={page === 1} setTimerValue={setInputTimerValue} />
                <StopWatchRing progress={stopwatchProgressBar} text={convertTime(stopWatchValue)} ms={extractMS(stopWatchValue)} pauseCallback={pauseSW} resetCallback={resetSW} isRunning={isSWRunning} display={page === 0} />
                <StopWatchRing progress={timerProgressBar} text={convertTime(timerValue)} ms={extractMS(timerValue)} pauseCallback={pauseTimer} resetCallback={resetTimer} isRunning={isTimerRunning} display={page === 1} />
            </div>
            {links()}
        </div>
    )

    function debug() {
        return <div class="stopwatch-debug">
            <span>debugger</span>
            <div>SW: {isSWRunning ? "ON" : "OFF"}</div>
            <div>Timer: {isTimerRunning ? "ON" : "OFF"}</div>
            <div>SW: {stopWatchValue.toFixed(3)}</div>
            <div>Timer: {timerValue.toFixed(3)}</div>
        </div>;
    }

    function links() {
        return <div className="stopwatch-links-contenair">
            <span className={page === 0 ? "stopwatch-links stopwatch-links-selected" : "stopwatch-links"} onClick={() => setPage((page) => 0)}>Stopwatch</span>
            <span className={page === 1 ? "stopwatch-links stopwatch-links-selected" : "stopwatch-links"} onClick={() => setPage((page) => 1)}>Timer</span>
        </div>;
    }
}
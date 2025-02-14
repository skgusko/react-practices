import React, {useState, useEffect} from 'react';
import './assets/scss/App.scss'
import Clock from './Clock';

export default function App() {
    const getCurrentTime = () => {
        const now = new Date();
        
        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()
        }
    }

    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const [ticks, setTicks] = useState(0);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //                         setCurrentTime(getCurrentTime());
    //                         setTicks(ticks+1);
    //                     }, 1000);

    //     return () => clearInterval(intervalId);
    // })

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentTime());

            //상태값을 넣는 게 아닌, 기존 상태값을 로직을 줘 간접적으로 세팅
            setTicks(x => x+1); //로직을 전달 
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); //처음 마운트될 때

    return (
        ticks % 5 === 0 ?
            null:
            <Clock
                title={`ex04: Clock Component II: ${ticks}`}
                hours={currentTime.hours}
                minutes={currentTime.minutes}
                seconds={currentTime.seconds} />
    );
}
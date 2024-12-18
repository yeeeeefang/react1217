
import { useRef, useState } from 'react';
import './App.css'
//點擊跳頁
export default function App() {
const greenRef = useRef(null);
const yellowRef = useRef(null);

const goGreen =()=>{
  window.scrollTo({
    //
    top:greenRef.current.offsetTop,
    //可以控制捲動滑動的方法(內建)
    behavior:'smooth'
  })
}

const goYellow =()=>{
  window.scrollTo({
    top:yellowRef.current.offsetTop,
    //可以控制捲動滑動的方法(內建)
    behavior:'smooth'
  })
}

  return (
    <>
    {/* offseTop */}
      <div ref={yellowRef} style={{height: '1200px',backgroundColor: 'yellow',}}>
        <button onClick={goGreen}> green</button>
      </div>
      <div ref={greenRef} style={{height: '1200px',backgroundColor: 'green',}}>
        <button onClick={goYellow}>yellow</button>
      </div>
    </>
  )
}

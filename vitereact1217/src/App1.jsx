import React from "react";
import './assets/scss/App1.scss';
import { useState } from "react";

export default function App() {

  //題目
  const fixedQuestions = [
    { id: 1, iconName: "./src/assets/images/learnAreaI.png", brandName: "./src/assets/images/learnAreaQ1.png" },
    { id: 2, iconName: "./src/assets/images/learnAreaS.png", brandName: "./src/assets/images/learnAreaQ2.png" },
    { id: 3, iconName: "./src/assets/images/learnAreaU.png", brandName: "./src/assets/images/learnAreaQ3.png" }
  ];
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 表情圖片陣列
  const emotions = [
    { id: 1, name: "Happy", image: "./src/assets/images/icon_greenA.svg" },
    { id: 2, name: "Angry", image: "./src/assets/images/icon_red.svg" },
    { id: 3, name: "Surprised", image: "./src/assets/images/icon_pink.svg" },
    { id: 4, name: "Confused", image: "./src/assets/images/icon_blue.svg" }
  ];

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id); // 傳遞唯一的 id
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData("id"), 10); // 獲取拖動的 id

    setTotal((prevTotal) => prevTotal + 1);

    if (draggedId === targetId) {
      setCorrect((prevCorrect) => prevCorrect + 1);
      const draggedItem = fixedQuestions.find((item) => item.id === draggedId);
      e.target.innerHTML = `<img src="${draggedItem.iconName}" alt="icon" />`;
      e.target.classList.add("dropped");
    }

    if (correct + 1 === fixedQuestions.length) {
      setIsGameOver(true);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const resetGame = () => {
    setCorrect(0);
    setTotal(0);
    setIsGameOver(false);
    document.querySelectorAll(".droppable").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("dropped");
    });
  };
  const handleEmotionClick = () => {
    // alert(`您選擇了「${Image.name}」的表情！`);
    window.location.href = "/App.scrollTo"; // 直接跳轉到指定的頁面
  };

  return (
    <>
      <div className="game-container">
        <div className="score">
          <p>正確數: {correct}</p>
          <p>花費次數: {total}</p>
        </div>
        <div className="draggable-items">
          {fixedQuestions.map((item) => (
            <img
              key={item.id}
              src={item.iconName}
              alt="icon"
              className="draggable"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item.id)} // 傳遞 id
            />
          ))}
        </div>
        <div className="matching-pairs">
          {fixedQuestions.map((item) => (
            <div key={item.id} className="matching-pair">
              {/* 名稱框圖片 */}
              <img className="label" src={item.brandName} alt="label" />
              <span
                className="droppable"
                data-id={item.id} // 設定 id 作為目標標識
                onDrop={(e) => handleDrop(e, item.id)} // 傳遞目標 id
                onDragOver={allowDrop}
              ></span>
            </div>
          ))}
        </div>
        {isGameOver && (
          <div className="game-over-buttons">
            <button className="play-again-btn" onClick={resetGame}>
              再玩一次
            </button>
            <button className="feedback-btn" onClick={() => setIsModalVisible(true)}>
              離開
            </button>
          </div>
        )}
        {/* 模態視窗 */}
        {isModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Congratulations!</h2>
              <p>已完成此課程！(•̀ᴗ•́)و</p>
              <p>我覺得 ...</p>
              <div className="emotions-container">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    className="emotion-button"
                    // onClick={() => handleEmotionClick}原先打這個無法換頁
                    onClick={ handleEmotionClick}
                  >
                     <img
                    src={emotion.image}
                    alt={emotion.name}
                    className="emoji-img"
                  />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )

}
import React from "react";
import './assets/scss/App.scss';
import { useState } from "react";
import $ from 'jquery';

function App() {
  const [draggableItems, setDraggableItems] = useState([
    { id: 1, iconName: "./src/assets/images/learnAreaI.png", brandName: "./src/assets/images/learnAreaQ1.png", isDropped: false },
    { id: 2, iconName: "./src/assets/images/learnAreaS.png", brandName: "./src/assets/images/learnAreaQ2.png", isDropped: false },
    { id: 3, iconName: "./src/assets/images/learnAreaU.png", brandName: "./src/assets/images/learnAreaQ3.png", isDropped: false }
  ]);

  const [droppedItems, setDroppedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData("id"), 10);

    // 只在放置正確時更新狀態
    if (draggedId === targetId) {
      const draggedItem = draggableItems.find((item) => item.id === draggedId);
      setDroppedItems((prevDroppedItems) => [...prevDroppedItems, draggedItem]); // 更新已放置的項目
      setDraggableItems((prevDraggableItems) =>
        prevDraggableItems.map((item) =>
          item.id === draggedId ? { ...item, isDropped: true } : item
        )
      ); // 保持原順序，標記已放置

      const targetElement = e.target;
      targetElement.innerHTML = `<img src="${draggedItem.iconName}" alt="icon" />`;
      targetElement.classList.add("dropped");
    }
    // 如果放置錯誤，不執行任何更新
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const resetGame = () => {
    setDraggableItems([
      { id: 1, iconName: "./src/assets/images/learnAreaI.png", brandName: "./src/assets/images/learnAreaQ1.png", isDropped: false },
      { id: 2, iconName: "./src/assets/images/learnAreaS.png", brandName: "./src/assets/images/learnAreaQ2.png", isDropped: false },
      { id: 3, iconName: "./src/assets/images/learnAreaU.png", brandName: "./src/assets/images/learnAreaQ3.png", isDropped: false }
    ]);
    setDroppedItems([]);
    setIsModalVisible(false);
    document.querySelectorAll(".droppable").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("dropped");
    });
  };

  const handleEmotionClick = () => {
    window.location.href = "/somepage"; // 跳轉到指定的頁面
  };

  return (
    <div className="App">
      <div className="draggable-items">
        {draggableItems.map(
          (item) =>
            !item.isDropped && (
              <img
                key={item.id}
                src={item.iconName}
                alt="icon"
                className="draggable"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, item.id)}
              />
            )
        )}
      </div>

      <div className="matching-pairs">
        {draggableItems.map((item) => (
          <div key={item.id} className="matching-pair">
            <img className="label" src={item.brandName} alt="label" />
            <span
              className="droppable"
              data-id={item.id}
              onDrop={(e) => handleDrop(e, item.id)}
              onDragOver={allowDrop}
            ></span>
          </div>
        ))}
      </div>

      {/* 按鈕僅在答完所有題目後出現 */}
      {droppedItems.length === draggableItems.length && (
        <div className="game-over-buttons">
          <button className="play-again-btn" onClick={resetGame}>
            Play Again
          </button>
          <button className="feedback-btn" onClick={() => setIsModalVisible(true)}>
            分享心得
          </button>
        </div>
      )}

      {/* 分享心得模態視窗 */}
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>已完成此課程！(•̀ᴗ•́)و</p>
            <p>我覺得 ...</p>
            <div className="emotions-container">
              {[
                { id: 1, name: "Happy", image: "./src/assets/images/icon_greenA.svg" },
                { id: 2, name: "Angry", image: "./src/assets/images/icon_red.svg" },
                { id: 3, name: "Surprised", image: "./src/assets/images/icon_pink.svg" },
                { id: 4, name: "Confused", image: "./src/assets/images/icon_blue.svg" }
              ].map((emotion) => (
                <button
                  key={emotion.id}
                  className="emotion-button"
                  onClick={handleEmotionClick}
                >
                  <img src={emotion.image} alt={emotion.name} className="emoji-img" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

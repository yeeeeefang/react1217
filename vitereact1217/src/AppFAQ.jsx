import { useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import "./assets/scss/App.scss";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";


export default function App() {
  const [activQuestionId, setActivQuestionId] = useState(null)
  //摺疊資料
  const question = [
    { id: 1, question: '題目1', answer: '答案1' },
    { id: 2, question: '題目2', answer: '答案2' },
    { id: 3, question: '題目3', answer: '答案3' },
  ];
  return (
    <>
      {/* 最外層 */}
      <div className="wrapper" style={{
        backgroundColor: '#6ccd9f',
        maxWidth: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#edeb09',
      }}>
        {/* FAQ區 */}
        <div className="faq" style={{
          backgroundColor: '#1d9f8f',
          width: '60%',
          padding: '8px',
          borderRadius: '5px',
        }}>
          {/* 主標題 */}
          <h2 style={{
            textAlign: 'center',
            marginBottom: '10px',
          }}>FAQ列表</h2>
          {
            
            //帶出陣列資料
            //每得到一個小變數 給他一個q
            question.map((q) => {
              return (
                <div key={q.id} style={{ marginBottom: '5px' }}>
                  {/* QA按鈕 */}
                  <button
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      borderRadius: '5px',
                      border: 'none',
                      outline: 'none',
                      padding: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '20px',
                      color: '#011101'
                    }}
                    onClick={() => setActivQuestionId(activQuestionId === q.id ? null : q.id)}
                  >
                    {/* 帶出題目 */}
                    {q.question}
                    {/* icon加減號 */}
                    {
                      activQuestionId === q.id ? <FaMinusCircle /> : <FaPlusCircle />
                    }
                  </button>
                  {/* 摺疊鈕動畫 motion => https://motion.dev/docs/react-quick-start*/}
                  <AnimatePresence>
                    {
                      //&&去判對是否成立
                      //作用中的id跟被展開的id相同時 =>
                      activQuestionId === q.id && (
                        <motion.div
                          //初始化
                          initial={{ opacity: 0, height: 0 }}
                          //展開動畫
                          animate={{ opacity: 1, height: "auto" }}
                          //摺疊動畫
                          exit={{ opacity: 0, height: 0 }}
                          //外觀樣式
                          style={{
                            marginTop: '5px',
                            color: '#edeb09',
                            fontSize: '18px',
                          }}
                        >
                          {/* 答案 */}
                          {q.answer}
                        </motion.div>
                      )
                    }
                  </AnimatePresence>                  
                </div>
                
              )
            })
          }
        </div></div>
    </>
  )
}


/* 
scss
body,h2,h1,h3,h4,h5,h6,p,button{
  margin: 0;
  padding: 0;
} */
import img1 from '/images/01.jpg';
import img2 from '/images/02.jpg';
import img3 from '/images/03.jpg';
import img4 from '/images/04.jpg';
 import "./assets/scss/App.scss";
import { useState } from 'react';

export default function App(){
//建立縮圖變數
const [currentImg,setCurrentImg]= useState(0);
  //建立圖片陣列
  const arrPhotos = [img1,img2,img3,img4];

  return(
    <>
    <div className="wrapper">
      <div className=' phoall'>
        {/* 縮圖區 */}
        <div className='pho'>
        {/*  <img src={arrPhotos[0]} alt="photos" width={100} height={80}/>
         <img src={arrPhotos[1]} alt="photos" width={100} height={80}/>
         <img src={arrPhotos[2]} alt="photos" width={100} height={80}/>
         <img src={arrPhotos[3]} alt="photos" width={100} height={80}/> */}

         {
          arrPhotos.map((photo,index)=>{
            return(
              <img key={index} src={photo} alt="photos" width={100} height={80}
              onMouseOver={(e)=>setCurrentImg(index)}/>
            )
          })
         }
        </div>
        {/* 大圖區 */}
        <div>
        <img src={arrPhotos[currentImg]} alt="photos" width={520} height={320}/>
        </div>
      </div>
    </div>
    </>
  )
}



/* sass
.phoall{
  display: flex;
  flex-direction: column-reverse;
  width: 700px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px auto;
  background-color: rgb(140, 159, 159);
  .pho{
    display: flex;
    justify-content: space-between;
    width: 520px;
   
  }
}

*/
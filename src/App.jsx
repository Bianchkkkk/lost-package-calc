import { useState, useEffect } from 'react'
import './App.css'

import ReactGA from 'react-ga'


function App() {
  const [cash, setCash] = useState(0)
  const [gold, setGold] = useState(0)
  const [shardOfHonor, setShardOfHonor] = useState(0)
  const [topQualityOreha, setTopQualityOreha] = useState(0)
  const [StoneOfHonor, setStoneOfHonor] = useState(0)
  const [grace, setGrace] = useState(0)
  const [blessing, setBlessing] = useState(0)
  const [protection, setProtection] = useState(0)
  const pathName = window.location.pathname
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID, { debug: true })
    ReactGA.set({ page: pathName }); //현재 사용자 페이지 
    ReactGA.pageview(pathName); //페이지뷰 기록
 


  }, [])
  return (
    <>
    <div>
      <h1>LOA 패키지 계산기</h1>
      <p>골드 시세는 필수로 입력해야합니다</p>

      <div className='cash_box'>

        <div>
          <img src="/lost-package-calc/coupon.png" alt="coupon" />
          <p className='title'>상품권 할인율 (%)</p>
          <div>
            <input type="number" onChange={
              (e) => {
                if (e.target.value >= 0) {
                  if (e.target.value.length > 2) {
                    if (e.target.value > 100) {
                      alert("최대 99까지 입력가능합니다");
                    }
                    e.target.value = e.target.value.slice(0, 2);
                  }
                } else {
                  e.target.value = 0;
                  alert("음수값을 입력할 수 없습니다.");
                }
                setCash(e.target.value)
              }
            }/>
          </div>
        </div>
        <div>
          <img src="/lost-package-calc/gold.png" alt="gold" />
          <p className='title'>골드 시세</p>

          <div className='gold_box'>
            <p>100 : </p>
            <input type="number" onChange={
              (e) => {
                if (e.target.value >= 0) {
                  if (e.target.value.length > 2) {
                    if (e.target.value > 100) {
                      alert("최대 99까지 입력가능합니다");
                    }
                    e.target.value = e.target.value.slice(0, 2);
                  }
                } else {
                  e.target.value = 0;
                  alert("음수값을 입력할 수 없습니다.");
                }
                setGold(e.target.value)
              }
            } />
          </div>
        </div>   
      </div>

        <div className='item_box'>
          <div>
            <img src="/lost-package-calc/shardOfHonor.png" alt="shardOfHonor" />
            <p className='title'>명파(대)(골드)</p>
            <div>
              <input type="number" onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setShardOfHonor(e.target.value)
                }
              } />
            </div>
          </div>   
          <div>
            <img src="/lost-package-calc/topQualityOreha.png" alt="topQualityOreha" />
            <p className='title'>최상레하(골드)</p>
            <div>
              <input type="number" onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setTopQualityOreha(e.target.value)
                }
              } />
            </div>
          </div>
          <div>
            <img src="/lost-package-calc/StoneOfHonor.png" alt="StoneOfHonor" />
            <p className='title'>찬명돌(골드)</p>
            <div>
              <input type="number" onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setStoneOfHonor(e.target.value)
                }
              } />
            </div>
          </div>
          <div>
            <img src="/lost-package-calc/grace.png" alt="grace" />
            <p className='title'>은총(골드)</p>
            <div>
              <input type="number" onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setGrace(e.target.value)
                }
              
              } />
            </div>
          </div>
          <div>
            <img src="/lost-package-calc/blessing.png" alt="blessing" />
            <p className='title'>축복(골드)</p>
            <div>
              <input type="number" onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setBlessing(e.target.value)
                }
              } />
              
            </div>
          </div>

          <div>
            <img src="/lost-package-calc/protection.png" alt="protection" />
            <p className='title'>가호(골드)</p>
            <div>
              <input type="number" onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setProtection(e.target.value)
                }
              } />
            </div>
          </div>
        </div> 
        <div className='result_box'>
          <div className='result_item'>
            <img src="/lost-package-calc/week.png" alt="week" />
            <p className='title'>주간성장패키지</p>
            <p className='title'>현금가</p>
            <p className='text'>{22000*((100-cash)/100)}</p>
            <div>
              <p>재료 골드 가치</p>
              <p>{shardOfHonor*60+topQualityOreha*500+StoneOfHonor*300}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && shardOfHonor && topQualityOreha && StoneOfHonor)?
              ((((shardOfHonor*60+topQualityOreha*500+StoneOfHonor*300)*(gold/100))/(22000*((100-cash)/100))*100)-100).toFixed(2)+'%'
            :0}</p>
            </div>
          </div>
          <div className='result_item'>
            <img src="/lost-package-calc/sub.png" alt="sub" />
            <p className='title'>주간보조패키지</p>
            <p className='title'>현금가</p>
            <p className='text'>{33000*((100-cash)/100)}</p>
            <div>
              <p>재료 골드 가치</p>
              <p>{protection*100+blessing*300+grace*500}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && protection&blessing&grace)?
              ((((protection*100+blessing*300+grace*500)*(gold/100))/(33000*((100-cash)/100))*100)-100).toFixed(2)+'%':0}</p>
            </div>
          </div>
          <div className='result_item'>
            <img src="/lost-package-calc/pcRoom.png" alt="pcRoom" />
            <p className='title'>PC방 패키지</p>
            <p className='title'>현금가</p>
            <p className='text'>{33000*((100-cash)/100)}</p>
            <div>
              <p>재료 골드 가치</p>
              <p>{shardOfHonor*200+topQualityOreha*250+StoneOfHonor*600}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && shardOfHonor && topQualityOreha && StoneOfHonor)?
              ((((shardOfHonor*200+topQualityOreha*250+StoneOfHonor*600)*(gold/100))/(33000*((100-cash)/100))*100)-100).toFixed(2)+'%'
              :0}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


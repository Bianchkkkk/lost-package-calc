import { useState, useEffect } from 'react'
import './App.css'

import ReactGA from 'react-ga'


function App() {
  const [cash, setCash] = useState(0)
  const [gold, setGold] = useState(0)
  const [shardOfHonor, setShardOfHonor] = useState({
    id : 66130133,
    value : 0
  })
  const [topQualityOreha, setTopQualityOreha] = useState({
    id : 6861011,
    value : 0
  })
  const [StoneOfHonor, setStoneOfHonor] = useState({
    id : 66110224,
    value : 0
  })
  const [grace, setGrace] = useState({
    id : 66111121,
    value : 0
  })
  const [blessing, setBlessing] = useState({
    id : 66111122,
    value : 0
  })
  const [protection, setProtection] = useState({
    id : 66111123,
    value : 0
  })
  const [api_key, setApi_key] = useState(localStorage.getItem('api_key'))
  const pathName = window.location.pathname


  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID, { debug: true })
    ReactGA.set({ page: pathName }); //현재 사용자 페이지 
    ReactGA.pageview(pathName); //페이지뷰 기록

  }, [])


  function getItemsValue() {
    getItemValue('shardOfHonor', shardOfHonor.id)
    getItemValue('topQualityOreha', topQualityOreha.id)
    getItemValue('StoneOfHonor', StoneOfHonor.id)
    getItemValue('grace', grace.id)
    getItemValue('blessing', blessing.id)
    getItemValue('protection', protection.id)
  }

  function getItemValue(item_name, item_id) {
    fetch("https://developer-lostark.game.onstove.com/markets/items/"+item_id, {
      headers: {
        Accept: "application/json",
        Authorization: "bearer "+api_key,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        switch (item_name) {
          case 'shardOfHonor':
            setShardOfHonor(
              {
                id : item_id,
                value : parseInt(data[0].Stats[0].AvgPrice)
              }
            )
            break;
          case 'topQualityOreha':
            setTopQualityOreha(
              {
                id : item_id,
                value : parseInt(data[0].Stats[0].AvgPrice)
              }
            )
            break;
          case 'StoneOfHonor':
            setStoneOfHonor(
              {
                id : item_id,
                value : parseInt(data[0].Stats[0].AvgPrice)
              }
            )
            break;
          case 'grace':
            setGrace(
              {
                id : item_id,
                value : parseInt(data[0].Stats[0].AvgPrice)
              }
            )
            break;
          case 'blessing':
            setBlessing(
              {
                id : item_id,
                value : parseInt(data[0].Stats[0].AvgPrice)
              }
            )
            break;
          case 'protection':
            setProtection(
              {
                id : item_id,
                value : parseInt(data[0].Stats[0].AvgPrice)
              }
            )
            break;
        }
      }
    )
  }
  return (
    <>
    <div>
      <h1>로아 패키지 계산기</h1>
      <p>골드 시세는 필수로 입력해야합니다</p>
      <div className='api_input_box'>
          <input type='text' 
          placeholder= 'api 키'
          defaultValue={(localStorage.getItem('api_key'))}
          onChange={
            (e) => {
              setApi_key(e.target.value)
            }
          }/>
          <button onClick={
            () => {
              if (document.querySelector('input').value === '') {
                alert('api 키를 입력해주세요')
                return
              } else {
                localStorage.setItem('api_key', document.querySelector('input').value)
                setApi_key(document.querySelector('input').value)
                getItemsValue()
              }
            }
          }>가격 한번에 불러오기</button>

      </div>
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
              <input type="number" 
              value={shardOfHonor.value}
              onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setShardOfHonor(
                    {
                      id : 66130133,
                      value : e.target.value
                    }
                  )
                }
              } />
            </div>
          </div>   
          <div>
            <img src="/lost-package-calc/topQualityOreha.png" alt="topQualityOreha" />
            <p className='title'>최상레하(골드)</p>
            <div>
              <input type="number" 
              value={topQualityOreha.value}
              onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setTopQualityOreha(
                    {
                      id : 6861011,
                      value : e.target.value
                    }
                  )
                }
              } />
            </div>
          </div>
          <div>
            <img src="/lost-package-calc/StoneOfHonor.png" alt="StoneOfHonor" />
            <p className='title'>찬명돌(골드)</p>
            <div>
              <input type="number" 
              value={StoneOfHonor.value}
              onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setStoneOfHonor(
                    {
                      id : 66110224,
                      value : e.target.value
                    }
                  )
                }
              } />
            </div>
          </div>
          <div>
            <img src="/lost-package-calc/grace.png" alt="grace" />
            <p className='title'>은총(골드)</p>
            <div>
              <input type="number"
              value={grace.value}
              onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setGrace(
                    {
                      id : 66111121,
                      value : e.target.value
                    }
                  )
                }
              
              } />
            </div>
          </div>
          <div>
            <img src="/lost-package-calc/blessing.png" alt="blessing" />
            <p className='title'>축복(골드)</p>
            <div>
              <input type="number" 
              value={blessing.value}
              onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setBlessing(
                    {
                      id : 66111122,
                      value : e.target.value
                    }
                  )
                }
              } />
              
            </div>
          </div>

          <div>
            <img src="/lost-package-calc/protection.png" alt="protection" />
            <p className='title'>가호(골드)</p>
            <div>
              <input type="number" 
              value={protection.value}
              onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setProtection(
                    {
                      id : 66111123,
                      value : e.target.value
                    }
                  )
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
              <p>{shardOfHonor.value*60+topQualityOreha.value*500+StoneOfHonor.value*300}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && shardOfHonor.value && topQualityOreha.value && StoneOfHonor.value)?
              ((((shardOfHonor.value*60+topQualityOreha.value*500+StoneOfHonor.value*300)*(gold/100))/(22000*((100-cash)/100))*100)-100).toFixed(2)+'%'
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
              <p>{protection.value*100+blessing.value*300+grace.value*500}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && protection.value&blessing.value&grace.value)?
              ((((protection.value*100+blessing.value*300+grace.value*500)*(gold/100))/(33000*((100-cash)/100))*100)-100).toFixed(2)+'%':0}</p>
            </div>
          </div>
          <div className='result_item'>
            <img src="/lost-package-calc/pcRoom.png" alt="pcRoom" />
            <p className='title'>PC방 패키지</p>
            <p className='title'>현금가</p>
            <p className='text'>{33000*((100-cash)/100)}</p>
            <div>
              <p>재료 골드 가치</p>
              <p>{shardOfHonor.value*200+topQualityOreha.value*250+StoneOfHonor.value*600}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && shardOfHonor.value && topQualityOreha.value && StoneOfHonor.value)?
              ((((shardOfHonor.value*200+topQualityOreha.value*250+StoneOfHonor.value*600)*(gold/100))/(33000*((100-cash)/100))*100)-100).toFixed(2)+'%'
              :0}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App





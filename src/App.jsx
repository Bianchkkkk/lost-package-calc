import { useState, useEffect } from 'react';
import './App.css';
import ReactGA from 'react-ga';

function App() {
  const [cash, setCash] = useState(0);
  const [selectedGold, setSelectedGold] = useState(0);
  const [gold, setGold] = useState(0);
  const [poGold, setPoGold] = useState(0);
  const [deGold, setDeGold] = useState(0);
  const [items, setItems] = useState([
    { id: 66130133, name: 'shardOfHonor', korName: '명파', value: 0 },
    { id: 6861011, name: 'topQualityOreha', korName: '최상레', value: 0 },
    { id: 66110224, name: 'StoneOfHonor',korName: '찬명돌', value: 0 },
    { id: 66111121, name: 'grace', korName: '은총', value: 0 },
    { id: 66111122, name: 'blessing', korName: '축복', value: 0 },
    { id: 66111123, name: 'protection', korName: '가호', value: 0 },
  ]);
  const [api_key, setApi_key] = useState(localStorage.getItem('api_key'));
  const pathName = window.location.pathname;

  useEffect(() => {
    if (selectedGold === 0) {
      setGold((2750*(100-cash)/100)/poGold);
    } else {
      setGold(deGold/100);
    }
  }
  ,[selectedGold, deGold, poGold]);

  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID, { debug: true });
    ReactGA.set({ page: pathName });
    ReactGA.pageview(pathName);
  }, []);

  function updateItemValue(item, value) {
    setItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem.name === item.name ? { ...prevItem, value: value } : prevItem
      )
    );
  }

  function handleChange(e, item) {
    let value = parseInt(e.target.value);
    if (value < 0) {
      value = 0;
      alert('음수값을 입력할 수 없습니다.');
    }
    updateItemValue(item, value);
  }


  function fetchItemValue(item) {
    fetch(`https://developer-lostark.game.onstove.com/markets/items/${item.id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `bearer ${api_key}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        updateItemValue(item, parseInt(data[0].Stats[0].AvgPrice));
      });
  }

  function loadItemsValue() {
    items.forEach(item => fetchItemValue(item));
  }

  function handleApiKeyUpdate() {
    const apiKeyInput = document.querySelector('input');
    if (!apiKeyInput.value) {
      alert('api 키를 입력해주세요');
      return;
    }
    localStorage.setItem('api_key', apiKeyInput.value);
    setApi_key(apiKeyInput.value);
    loadItemsValue();
  }

  return (
    <>
      <div>
        <h1>로아 패키지 계산기</h1>
        <p>골드 시세는 필수로 입력해야합니다</p>
        <div className='api_input_box'>
          <input
            type='text'
            placeholder='api 키'
            defaultValue={api_key}
            onChange={e => setApi_key(e.target.value)}
          />
          <button onClick={handleApiKeyUpdate}>가격 한번에 불러오기</button>
        </div>
        <div className='cash_box'>
          <div className='cash_item'>
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
          <div className='cash_item selectable' onClick={
            () => {
              setSelectedGold(0);
            }
          }            
          style={selectedGold === 0 ? {boxShadow: '0 0 0 3px #1f65b4', transition: '0.5s ease' } : {}}
          >
            <img src="/lost-package-calc/gold.png" alt="gold" />
            <p className='title'>양지 골드 시세</p>
            <div className='gold_box'>
              <p>2750 : </p>
              <input type="number" onChange={
                (e) => {
                  if (e.target.value < 0) {
                    e.target.value = 0;
                    alert("음수값을 입력할 수 없습니다.");
                  }
                  setPoGold(e.target.value)
                }
              } />
            </div>
          </div> 
          <div className='cash_item selectable' onClick={
            () => {
              setSelectedGold(1);
            }
          }                      
          style={selectedGold === 1 ? {boxShadow: '0 0 0 3px #1f65b4', transition: '0.5s ease' } : {}}
          >            <img src="/lost-package-calc/gold.png" alt="gold" />
            <p className='title'>음지 골드 시세</p>
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
                  setDeGold(e.target.value)
                }
              } />
            </div>
          </div> 
        </div>
        <div className='item_box'>
          {items.map(item => (
            <div className='item_item' key={item.id}>
              <img src={`/lost-package-calc/${item.name}.png`} alt={item.name} />
              <p className='title'>{item.korName}</p>
              <div>
                <input type='number' value={item.value} onChange={e => handleChange(e, item)} />
              </div>
            </div>
          ))}
        </div>
        <div className='result_box'>
          <div className='result_item'>
            <img src="/lost-package-calc/week.png" alt="week" />
            <p className='title'>주간성장패키지</p>
            <p className='title'>현금가</p>
            <p className='text'>{22000*((100-cash)/100)}</p>
            <div>
              <p>재료 골드 가치</p>
              <p>{items[0].value*60+items[1].value*500+items[2].value*300}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && items[0].value && items[1].value && items[2].value)?
              ((((items[0].value*60+items[1].value*500+items[2].value*300)*(gold))/(22000*((100-cash)/100))*100)-100).toFixed(2)+'%'
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
              <p>{items[5].value*100+items[4].value*300+items[3].value*500}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && items[5].value&items[4].value&items[3].value)?
              ((((items[5].value*100+items[4].value*300+items[3].value*500)*(gold))/(33000*((100-cash)/100))*100)-100).toFixed(2)+'%':0}</p>
            </div>
          </div>
          <div className='result_item'>
            <img src="/lost-package-calc/pcRoom.png" alt="pcRoom" />
            <p className='title'>PC방 패키지</p>
            <p className='title'>현금가</p>
            <p className='text'>{33000*((100-cash)/100)}</p>
            <div>
              <p>재료 골드 가치</p>
              <p>{items[0].value*200+items[1].value*250+items[2].value*600}</p>
            </div>
            <div>
              <p>이득률</p>
              <p>{(gold && items[0].value && items[1].value && items[2].value)?
              ((((items[0].value*200+items[1].value*250+items[2].value*600)*(gold))/(33000*((100-cash)/100))*100)-100).toFixed(2)+'%'
              :0}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

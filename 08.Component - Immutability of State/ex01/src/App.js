import React, {useState, useEffect} from 'react';
import data from './assets/json/data.js';

function App() {
    const [order, setOrder] = useState(data);
    const [payment, setPayment] = useState(order.payment);
    const [goods, setGoods] = useState(order.goods);

    useEffect(() => {
        console.log('Order Updated');
    }, [order]);

    useEffect(() => {
        console.log('Payment Updated');
    }, [payment]);

    useEffect(() => {
        console.log('Goods Updated');
    }, [goods]);

    return (
        <div id='App'>
            <button onClick={() => {
                // [violation]
                // order.receive = '서울시 서초구 논현동...';
                // setOrder(order);

                // [sol]
                const orderUpdated = Object.assign({}, order, {receive: '서울시 서초구 논현동...'});
                setOrder(orderUpdated);
            }}>
                {"배송지 수정"}
            </button>
            <br/><br/>

            <button onClick={() => {
                // [ violation ]
                // const orderUpdated = Object.assign({}, order);
                // orderUpdated.payment.method = 'Mobile';
                // setPayment(orderUpdated.payment);

                // [ sol ]
                const orderUpdated = Object.assign({}, order);
                orderUpdated.payment = Object.assign({}, order.payment, {method: 'Mobile'});
                setPayment(orderUpdated.payment);
            }}>
                {"결제수단 변경"}
            </button>
            <br/><br/>

            <button
                onClick={() => {
                    // violation
                    // goods.push({
                    //     "no": "p002-003", 
                    //     "name": "블루양말", 
                    //     "price": 2000, 
                    //     "amount": 1});
                    // setGoods(goods);

                    // sol1 concat - 뒤에만 추가 가능
                    // const goodsUpdated = goods.concat({
                    //     "no": "p002-003", 
                    //     "name": "블루양말", 
                    //     "price": 2000, 
                    //     "amount": 1});
                    // setGoods(goodsUpdated);

                    // sol1 스프레드 - 앞에 추가 가능
                    const goodsUpdated = [{
                        "no": "p002-003", 
                        "name": "블루양말", 
                        "price": 2000, 
                        "amount": 1}, ...goods];
                    setGoods(goodsUpdated);
                }}>
                {"상품 추가"}
            </button>
            <br/><br/>

            <button
                onClick={() => {
                    // violation
                    // goods[2].name = '블루면티';
                    // setGoods(goods);

                    const goodsUpdate = [...goods.slice(0, 2), 
                        Object.assign({}, goods[2], {name: '블루면티'}), 
                        ...goods.slice(3)]
                    setGoods(goodsUpdate);
                }}>
                {"3rd 상품이름 변경"}
            </button>
            <br/><br/>

            <hr/>

            <p>{`배송지:${order.receive}`}</p>
            <p>{`결제수단:${payment.method}`}</p>
            <p>{'상품'}</p>
            <ul>
                {
                    goods.map((g, i) => <li key={g.no}>{`${g.name}:${g.price}:${g.amount}`}</li>)
                }
            </ul>
        </div>
    );
}

export {App};
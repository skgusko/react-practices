import React, {useEffect, useState, useRef} from 'react';

import Modal from "react-modal";
import ReactModal from "react-modal";
import styled from 'styled-components';
import './assets/scss/App.scss';
import * as stylesModal from './assets/scss/Modal.scss';
import serialize from 'form-serialize';
import axios from 'axios';
import update from 'react-addons-update';

const CreateForm = styled.form``;
const UpdateForm = styled.form``;
const ItemList = styled.ul``;
const Item = styled.li``;


ReactModal.setAppElement("body");

function App() {
    const refCreateForm = useRef(null);
    const [items, setItems] = useState(null);

    const [modalData, setModalData] = useState({
        open: false,
        itemId: 0,
        itemType: '',
        itemName: ''
    })

    const addItem = async(item) => {
        try {
            const response = await fetch('/item', {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });

            const jsonResult = await response.json();

            if(!response.ok || jsonResult.result !== 'success') { //ok 아니거나 200인데 fail로 온 경우
                throw new Error(`${response.status} ${response.statusText}`) 
            }

            // console.log(items);
            setItems([jsonResult.data, ...items]);
            
            refCreateForm.current.reset();
        } catch (err) {
            console.error(err);
        }
    }

    const addItemWithImage = async (item) => {
        try {
            // const formData = new FormData();
            // formData.append("name", item.name);
            // formData.append("type", item.type);
            // formData.append("file", item.file);
            
            // 여러 개 있을 경우 아래 코드로 사용 
            const formData = Object.keys(item).reduce((formData, key) => {
                formData.append(key, item[key]);
                return formData;
            }, new FormData());

            const response = await axios.post('/item', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });

            const jsonResult = response.data;
            setItems([jsonResult.data, ...items])

        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }
    
    const fetchItems = async () => {
        try {
            const response = await fetch('/item', {
                method: "get",
                headers: {
                    'Accept': 'application/json'
                },
                body: null
            });

            const jsonResult = await response.json();

            if(!response.ok || jsonResult.result !== 'success') { //ok 아니거나 200인데 fail로 온 경우
                throw new Error(`${response.status} ${response.statusText}`) 
            }

            setItems(jsonResult.data);

        } catch (err) {
            console.error(err);
        }
    }

    const clickItemName = async (id) => {
        try {
            const response = await axios.get(`/item/${id}`) 
            const jsonResult = response.data;

            console.log(jsonResult.data);
            
            setModalData(update(modalData, {
                open: {$set: true},
                itemId: {$set: jsonResult.data.id},
                itemType: {$set: jsonResult.data.type},
                itemName: {$set: jsonResult.data.name}
            }))
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    const updateItem = async (id, item) => {
        try {
            console.log(id, item);
            const response = await axios.put(`/item/${id}`, new URLSearchParams(item).toString(), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const jsonResult = response.data;
            const index = items.findIndex((item) => item.id === jsonResult.data.id);

            setItems([...items.slice(0, index), jsonResult.data, ...items.slice(index+1)]);
            setModalData(update(modalData, {
                open: {$set: false}, //얘만 해도 됨. 나머지는 clickItemName에서 설정하므로.
                itemId: {$set: 0},
                itemType: {$set: ''},
                itemName: {$set: ''}
            }))

        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`/item/${id}`) 
            const jsonResult = response.data;

            console.log(jsonResult.data);
            setItems(items.filter((e) => e.id != jsonResult.data));
        } catch(err) {
            console.error(err.response ? `${err.response.status} ${err.response.data.message}` : err);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div id='App'>

            <h1>AJAX: Restful API</h1>

            <div>
                <form
                    ref={refCreateForm}
                    onSubmit={(e) => {
                        e.preventDefault();

                        try {
                            /*
                            const item = Array.from(e.target, (el) => {
                                if (el.name != '' && el.value === '') {
                                    throw new Error(`validation ${el.name} is empty`)
                                }

                                return {name: el.name, value: el.value};
                            })
                            .filter(({name}) => name != '')
                            .reduce((res, {name, value}) => {
                                //배열.reduce((누적값, 현재값) => 처리 , 초기값)
                                res[name] = value;
                                return res;
                            }, {})
                            */

                            Array.from(e.target, (el) => {
                                if (el.name != '' && el.value === '') {
                                    throw new Error(`validation ${el.name} is empty`)
                                }
                                return null;
                            })

                            // const queryString = serialize(e.target);
                            const item = serialize(e.target, {hash: true}); 
                            addItem(item);
                        } catch(err) {
                            console.error(err);
                        }
                    }}>
                    <select name={'type'} >
                        <option>BOOK</option>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    {' '}
                    <input type={'text'} name={'name'} placeholder={'name'}/>
                    <input type={'submit'} value={'[C]reate (post)'}/>
                </form>
                <form
                    onSubmit={(e) => {
                        try {
                            e.preventDefault();

                            Array.from(e.target, (el) => {
                                if (el.name != '' && el.value === '') {
                                    throw new Error(`validation ${el.name} is empty`)
                                }
                                return null;

                            });
                            const item = serialize(e.target, {hash:true}); //hash:true -> 객체로 만들게
                            // file은 serialize가 못 해줘서 수동으로 설정함
                            item['file'] = e.target['file'].files[0];
                            
                            addItemWithImage(item);

                        } catch(err) {
                            console.error(err);
                        }
                    }}>
                    <select name={'type'}>
                        <option>BOOK</option>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    {' '}
                    <input type={'text'} name={'name'} placeholder={'name'}/>
                    <input type={'file'} name={'file'} />
                    <input type={'submit'} value={'[C]reate (post)'}/>
                </form>
            </div>


            <h2 
                title={'[R]ead (get)'}
                onClick={() => fetchItems()}
                >Items</h2>


            <ItemList>
                {
                    items?.map((item, index) => <Item key={item.id}>
                        <h4>
                            <b 
                                title={'[R]ead (get)'}
                                onClick={() => clickItemName(item.id)}>{item.name}</b>
                            <button onClick={() => {
                                deleteItem(item.id);
                            }}
                            >{'[D]elete (delete)'}</button>
                        </h4>
                        <div>
                            <span>
                                <b>{index+1}</b>
                                <i>{item.type}</i>
                            </span>
                            <ins style={{
                                backgroundImage: `url(${item.image || '/assets/images/no-image.png'})`
                            }}/>
                        </div>
                    </Item>)
                }
            </ItemList>



            <Modal
                isOpen={modalData.open}
                onRequestClose={() => { 
                    setModalData(update(modalData, { //modalData에서 open 만 false로 바꾸기 위해
                        open: {
                            $set: false
                        }
                    }));
                }}
                className={stylesModal.Modal}
                overlayClassName={stylesModal.Overlay}
                style={{content: {width: 280}}}>
                <h3>Update Item</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    const item = serialize(e.target, {hash: true}); //form에서 name, type을 객체로 만듦
                    updateItem(modalData.itemId, item);
                }}>

                    <label>TYPE</label>
                    {' '}
                    <select 
                        name={'type'} 
                        value={modalData.itemType}
                        onChange={(e) => {
                            setModalData(update(modalData), {
                                itemType: {
                                    $set: e.target.value
                                }
                            })
                        }}>
                        <option>BOOK</option>
                        <option>CLOTHE</option>
                        <option>MUSIC</option>
                        <option>CAR</option>
                        <option>BEAUTY</option>
                        <option>MOVIE</option>
                        <option>FOOD</option>
                    </select>
                    <br/><br/>
                    <label>NAME</label>
                    {' '}
                    <input 
                        type={'text'} 
                        name={'name'} 
                        value={modalData.itemName}
                        onChange={(e) => {
                            setModalData(update(modalData, {
                                itemName: {
                                    $set: e.target.value
                                }
                            }));
                        }}/>   
                    <hr />
                    <input type={"submit"} value={'[U]pdate (update)'} />
                </form>
            </Modal>

        </div>
    );
}

export {App};
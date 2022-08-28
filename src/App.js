import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [post, setPost] = useState("");
  const [d , c] = useState();
  const space = []

// <<<<<<<<<<<<<<< Click function >>>>>>>>>>>>>>>>>>
  const Click = () => {
    if (!post){
      console.log("hoosob")
      alert("hooson baina")
    }
    else{
      console.log("zov")
      const value = {
        value:post
      }
      setItems(old => [...old ,value])
      setPost("")
    }
  }
  console.log(items)
  async function getUser() {  
    console.log(post)
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=NptZhhwltiR6lI9tdXlwA40mvrAPW064&q=${items.map(item => item.value)}`);
      setItem(response.data.data);    
      c(response)
    } catch (error) {
      console.error(error);
    }
  }
  // <<<<<<<<<<<<<<<< UseEffect >>>>>>>>>>>>>>>>>
  useEffect(() => {
    getUser();
    // setItems(space)
  }, [d]);

  return (
    <div style={
      {width:"100%" , height:"100vh", background:"black" ,display:"flex" , flexDirection: "column" , alignItems:"center" , justifyContent:"center"}
      }>
        <div>
          <input style={
            { width: "200px", height: "50px" , marginBottom:"10px" }
            } value={post} onChange={e => setPost(e.target.value)} type="search" placeholder='search' />
          <button style={{ width: "100px", height: "50px" }} onClick={() => Click()} >search</button>
        </div>
      <div style={{}}>
        {item.length !== 0 && item.map((e) => {
          return (
            <img style={{ width: "100px", height: " 100px" , boxShadow: "0 0 10px white" , margin: "10px" }} src={e.images.downsized.url} />
          )
        })}
      </div>
    </div>
  )

}

const Todo = () => {
  const [newItem , setNewItem] = useState("");

  const [items , setItems] = useState([])

  const addItem = ()=>{
      // console.log(newItem)
      if(!newItem){
          alert("hooson baina");
          return;
      }
       const item = {
          id: Math.floor(Math.random()* 1000),
          value: newItem
       };
       setItems(oldList => [...oldList ,item]);
       console.log(item)
       setNewItem("");
       
  }
  const remove = (id)=>{
      // console.log(id)
      const newArry = items.filter(item => item.id !==id);
      setItems(newArry)
      console.log(newArry)
  }
  return (
      <div className="counter">
          <div className='border'>
              <h1>Todo</h1>
              <div className='d'>
                  <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}
                  />
                  <button onClick={()=> addItem()} className='add'></button>
              </div>
                  {items.map(item => {
                      return(
                          <div className='word' key={item.id}>{item.value}
                              <button onClick={()=> remove(item.id)} className='remove'></button>
                          </div>
                      )
                  })}
          </div>
      </div>
  )
}

export default App;
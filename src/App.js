import { useState}  from "react";
const Block = ({ number,click,id,loge }) => {
  return <div className={"block"} style={{backgroundColor: loge ?"#59e391":"#FFFFFF"}} onClick={() => click(id)}>{number}</div>;
};
const blockS = [];
const randomize = (e) => {
  return 1+Math.floor(Math.random() * e);
};
for (let i = 0; i < 10; i++) {
  blockS.push({ id: i, value: randomize(5), loge: false });
}
function App() {
  const [blocks, setBlocks] = useState(blockS);
  const [win, setWin] = useState(false);
  const clickHandler=(id)=>{
    setBlocks(oldArr=>{
      return oldArr.map(arr=>{
        return arr.id === id ? {...arr,loge:!arr.loge}:arr  
      })
    })
    let test=blocks[id].value;
    console.log(blocks)
    setWin(blocks.every((a)=>{
      console.log(a.id)
      return ( (a.loge!==blocks[id].loge) && a.value===test )}));  
    console.log(win)
    }
  const blokSetter = () => {
    setBlocks((oldBlocks) => {
      return oldBlocks.map((oldBlock) => {
        return oldBlock.loge ?oldBlock :{ ...oldBlock, value: randomize(5) };
      });
    });
  };
  const Roller = () => {
    let init = setInterval(() => blokSetter(), 12);
    setTimeout(() => clearTimeout(init), 1200);
  };
  const Restart=()=>{
    setBlocks(blocks.map((block) => ({...block,loge:false})));
    setWin(false);
    Roller()
  }
  const blockMap = blocks.map((elem) => {
    return <Block key={elem.id} id={elem.id} number={elem.value} loge={elem.loge} 
    click={clickHandler}/>;
  });
  return (
    <div className="App">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">
        {blockMap}
      </div>
      <button onClick={win ?Restart:Roller}>{win ? "restart ?" : "Roll"}</button>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';

function App() {
  const [partial, setPartial] = useState("");
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const groups = display.split(/[×÷+-]/).filter(i => (i !== ""));
    if (groups.length > 1) {
      setPartial(eval(parser(display)).toString());
    }
  }, [display])

  function parser(data){
    let parsed = data.replaceAll("×", "*").replaceAll("÷", "/");
    while (isOperator(parsed[parsed.length - 1])) {
      parsed = parsed.substring(0, parsed.length - 1);
    }
    return parsed;
  }

  function isOperator(data) {
    const operators = ["×", "÷", "/", "-", "+", "*"];
    if (operators.includes(data)) {
      return true;
    }

    return false;
  }

  function processClick(e) {
    const target = e.target;
    const targetTypeValue = e.target.attributes?.data_type?.value;
    const groups = display.split(/[×÷+-]/).filter(i => (i !== ""));
    
    switch (targetTypeValue) {
      case "clearAll":
        setDisplay("");
        setPartial("");
        break;
      case "clear":
        setDisplay(display.substring(0, display.length - 1));
        break;
      case "number":
        setDisplay(display + target.innerText);
        break;
      case "point":
        if (!groups[groups.length - 1].includes(".")) {
          setDisplay(display + target.innerText);
        }
        break;
      case "operator":
        if (target.innerText === "-" && display.length < 1) {
          setDisplay(target.innerText);
        }
        if (display.length > 0) {
          if (isOperator(display[display.length - 1])) {
            setDisplay(display.substring(0, display.length - 1) + target.innerText);
          } else {
            setDisplay(display + target.innerText);
          }
        }
        break;
      case "equal":
        if (groups.length > 1) {
          setDisplay(eval(parser(display)).toString());
          setPartial("");
        }
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="h-screen w-sreen flex justify-center items-center">
      <div className="max-w-md w-full h-[80%] relative">
        <div className="absolute h-[300px] w-[300px] -top-[10%] -left-[50%] rounded-full" style={{ backgroundImage: "linear-gradient(to top, #fa709a 0%, #fee140 100%)" }}></div>
        <div className="absolute h-[250px] w-[250px] -bottom-[8%] -right-[25%] rounded-full" style={{ backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)" }}></div>
        <div className="w-full h-full rounded-md backdrop-blur-[2px]" style={{ background: "rgba(255, 255, 255, 0.2)", }}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-[25%] flex-col">
            <h1 className="text-slate-200 text-5xl w-[85%] text-end overflow-hidden">{display == "" ? "0":display}</h1>
            <h2 className="text-slate-200 text-lg w-[85%] text-end overflow-hidden h-8">{partial}</h2>
          </div>
          <div className="grid grid-cols-4 grid-rows-5 w-full h-[75%] p-4">
            <div onClick={(e) => processClick(e)} data_type="clearAll" className="text-center text-slate-200 justify-center text-2xl col-span-2 p-8 hover:bg-white/20 select-none">AC</div>
            <div onClick={(e) => processClick(e)} data_type="clear" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">C</div>
            <div onClick={(e) => processClick(e)} data_type="operator" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">÷</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">7</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">8</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">9</div>
            <div onClick={(e) => processClick(e)} data_type="operator" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">×</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">4</div> 
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">5</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">6</div>
            <div onClick={(e) => processClick(e)} data_type="operator" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">-</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">1</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">2</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">3</div>
            <div onClick={(e) => processClick(e)} data_type="operator" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">+</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">0</div>
            <div onClick={(e) => processClick(e)} data_type="number" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">00</div>
            <div onClick={(e) => processClick(e)} data_type="point" className="text-center text-slate-200 justify-center text-2xl p-8 hover:bg-white/20 select-none">.</div>
            <div onClick={(e) => processClick(e)} data_type="equal" className="text-center text-slate-200 justify-center text-2xl p-8 duration-300 hover:bg-white/20 select-none">=</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App

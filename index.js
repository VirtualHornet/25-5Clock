function App(){

    const [breakTime, setBreakTime]= React.useState(5*60);
    const [sessionTime, setSessionTime] = React.useState(25*60);
    const [startTime, setStartTime] = React.useState(false);
    const [sessionTimer, setSessionTimer] = React.useState(true);
    const [breakTimer, setBreakTimer] = React.useState(false);
    const [displayTime, setDisplayTime] = React.useState(sessionTime);
    
    React.useEffect(()=>{
        handelTime();   
        return () => clearInterval(id.current);
    }), [];

    let id = React.useRef();

    function handelTime(){
        if(startTime){
            id.current = setInterval(()=>{
                setDisplayTime((prev)=>prev-1);
                if(displayTime ==0 && sessionTimer){
                    setSessionTimer(false);
                    setDisplayTime(breakTime);
                    setBreakTimer(true);
                }else if(displayTime == 0 && breakTime){
                    setBreakTimer(false);
                    setDisplayTime(sessionTime);
                    setBreakTimer(true);
                }
            },1000);
        }
       
    }

    const formatTime = (time) =>{
        let minutes = Math.floor(time/60);
        let seconds = time %60;
        return (minutes<10? "0"+minutes: minutes)+ ":" + (seconds<10? "0"+seconds: seconds);
    }

    const refresh = () =>{
        setStartTime(false);
        setDisplayTime(25*60);
    }

    const Title = () =>{
        if(sessionTimer){
            return <h1>SESSION TIME</h1>
        }else{
            return <h1>BREAK TIME</h1>
        }
    }




    return(<div id="container">
        <div className="content">
        <div className="row p-5" >
            <BreakLength />
            <SessionLength />
        </div>
        <div className="row" style={{textAlign: 'center'}}>
             <Title />
            <h1>{formatTime(displayTime)}</h1>  
        </div>
        <div id="col">
            <button className="btn btn-primary p-4 m-5"><i className="fa-solid fa-play" onClick={()=>setStartTime(true)}></i></button>
            <button className="btn btn-primary p-4 m-5"><i className="fa-solid fa-pause" onClick={()=>setStartTime(false)}></i></button>
            <button className="btn btn-primary p-4 m-5"><i className="fa-solid fa-arrows-rotate" onClick={refresh}></i></button>
        </div>
           
       </div>
       
        
        </div>
    ); 

function BreakLength (){
    return (
        <div className="col-6" style={{paddingLeft: '25%'}}>
            <h3>BREAK LENGTH</h3>
            <div className="time-sets">
                <button className="btn btn-danger" onClick={()=>{
                    if(breakTime>(1*60)){
                        setBreakTime(breakTime-(1*60));
                        if(breakTimer){
                            setDisplayTime(breakTime-60);
                        }
                    }else{
                        setBreakTime(1*60);
                    }
                }}>
                    <i className="fa-solid fa-arrow-down"></i>
                </button>
                <h3 className="m-3">{formatTime(breakTime)}</h3>
                <button className="btn btn-danger" onClick={()=>{
                    setBreakTime(breakTime+(1*60));
                    if(breakTimer){
                        setDisplayTime(breakTime+60);
                    }
                }}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            </div>
        </div>
    );
}
function SessionLength (){
    return (
        <div className="col-6" style={{paddingLeft: '15%'}}>
            <h3>SESSION LENGTH</h3>
            <div className="time-sets">
                <button className="btn btn-danger" onClick={()=>{
                    if(sessionTime>(1*60)){
                        setSessionTime(sessionTime-(1*60));
                        if(sessionTimer){
                            setDisplayTime(sessionTime-60);
                        }
                    }else{
                        setSessionTime(1*60);
                    }
                }}>
                    <i className="fa-solid fa-arrow-down"></i>
                </button>
                <h3 className="m-3">{formatTime(sessionTime)}</h3>
                <button className="btn btn-danger" onClick={()=>{
                    setSessionTime(sessionTime+(1*60));
                    if(sessionTimer){
                        setDisplayTime(sessionTime+60);
                    }
                }}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            </div>
        </div>
    );
}
}



const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

root.render(<App/>)
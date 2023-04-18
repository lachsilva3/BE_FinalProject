import React, { useState ,useEffect} from 'react';
import { Link, useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "./timetable.css"
import Subjects from './data.json'

function Timetables  ({setSubjectsForCurrentDay}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const nevigate= useNavigate()
  const handleRowClick=()=>{
    nevigate('/face')
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
   // console.log(Subjects)
   const currentDay = selectedDate.toLocaleString("en-us", { weekday: "long" });
  //fetch data from api
  useEffect(()=>{
    async function fetchData(){
      const response= await fetch('http://localhost:3001/subjects')
      const data = await response.json();
      setSubjectsForCurrentDay(data); 
    }
    fetchData()
  },[])
 
  const subjectsForCurrentDay = Subjects[0][currentDay];
   console.log(currentDay)

  //  Toggle Content
  const [show,setShow]=useState(false)



  return (
   <>   

    <div className="container5">

       <div class="box5">
        <br></br>  
        
        <div class="t_users">
        <div class="t_card">
          
          <h4>Semester VII</h4>
          
          <button>TimeTable</button>
        </div>


        <div class="t_card">
          
          <h4>Semester VIII</h4>
          
              <button onClick={()=>setShow(!show)}> TimeTable</button>  
      </div>


      <div class="t__card">
          
          <h4>Select a date</h4>
          
          <button>         <input style={{color: "black"}}
          type="date"
          value={selectedDate.toISOString().substr(0, 10)}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        /></button>
        </div>
     
          
      </div>
      <br></br>  
                       
      <center><h1>Timetable</h1></center>



{/* calender */}
{/* 
<div>
        <p style={{color: "white"}}>Select a date</p>
        <input style={{color: "white"}}
          type="date"
          value={selectedDate.toISOString().substr(0, 10)}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </div> */}




      {/*Toggle content  */}
      {
  show? <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(subjectsForCurrentDay).map((timeslot) => (
            <tr key={timeslot} onClick={handleRowClick}>
              <td>{timeslot}</td>
              <td>{subjectsForCurrentDay[timeslot]}</td>
            </tr>
          ))}
        </tbody>
      </table>:null
} 

        <br></br>


        </div>
    </div>
    </> 
  );
}


export default Timetables;
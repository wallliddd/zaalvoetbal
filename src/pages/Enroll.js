import React, { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {doc, onSnapshot, updateDoc, setDoc, deleteDoc, collection, serverTimestamp, getDocs, query, where, orderBy, limit} from 'firebase/firestore';
import db from '../firebase.config'
import { async } from "@firebase/util";


export default function Enroll({currentuser}) {
  const [seeMoreModal, setSeeMoreModal] = useState('none')
  const [userNow, setUserNow] = useState(null)
  const [events, setEvents] = useState(null)
  const [refresh, setFresh] = useState(false)
  const userObj =JSON.parse(localStorage.getItem('loginZaalvoetbal'))




  useEffect(() => {
    (async()=> {
      const collectionRef = collection(db, 'userinfo')
      const snapshots = await getDocs(collectionRef)
      const docs = snapshots.docs.map((doc)=> {
          const data  = doc.data()
          data.id = doc.id
          if(data.id ===userObj.uid) return data

      })
      const arr = docs.filter(item=> item? item : null) 
      const userTemp = arr[0]

      setUserNow(userTemp)
    })();
    (async()=> {
      const collectionRef = collection(db, 'events')
      const snapshots = await getDocs(collectionRef)
      const docs = snapshots.docs.map((doc)=> {
          const data  = doc.data()
          data.id = doc.id
           return data

      })
      setEvents(docs)


    })();


  }, [], [])


  console.log('user', userNow)
  console.log('events', events)



  const players = ["walid", "Faycal", "Ramin", "Ashkan", "Nawied", 
  'Shahin', 'Wais',"walid", "Faycal", "Ramin", "Ashkan", "Nawied", 'Shahin', 'Wais', "Qais"  ]

  const leftSectionPlayers = players.filter((player, i)=> i <10 ? player : null)

  const rightSectionPlayers = players.filter((player, i)=> i >=10 ? player : null)


  const seeMoreBtnHandler = () =>{
    seeMoreModal === 'none' ? setSeeMoreModal('flex') : setSeeMoreModal('none')
  }
  


  // R50Ro95SDwdsPVHjyUkPL5Bv3vN2



  async function addPlayerToEvent(eventId){
      const name = userNow.FullName

    const targetedEvent = events.filter(event => event.id === eventId);
    if(targetedEvent) {
      const playersArr = targetedEvent[0].players
      
      if(playersArr.includes(name)) {alert('Je staat er al op')}
      else{
        playersArr.push(name)
        const updatedEvent = {players : playersArr};
  
        try {
          const collectionRef = collection(db, 'events');
          const eventRef = doc(collectionRef, eventId);
          updateDoc(eventRef, updatedEvent);
        } catch(error) {
          console.error(error)
        }

      }

    }
  }

  async function deletePlayerToEvent(eventId){
    const name = userNow.FullName

  const targetedEvent = events.filter(event => event.id === eventId);
  if(targetedEvent) {
    const playersArr = targetedEvent[0].players
    
    if(playersArr.includes(name)) {
      const deletedPlayerArr = playersArr.filter((player)=> player !== name)
      console.log('deletedPlayerArr', deletedPlayerArr)
      const updatedEvent = {players : deletedPlayerArr};

      try {
        const collectionRef = collection(db, 'events');
        const eventRef = doc(collectionRef, eventId);
        updateDoc(eventRef, updatedEvent);
      } catch(error) {
        console.error(error)
      }

    }

  }
}




  function joinBtnHandler(eventId){
    addPlayerToEvent(eventId)
    setFresh(true)
  }

  function unJoinBtnHandler(eventId){
    deletePlayerToEvent(eventId)
    setFresh(true)
    setTimeout(window.location.reload(false), 3000)
    

  }

const arrLeftSidePlayer = [1,2,3,4,5,6,7,8,9,10]
const arrRightSidePlayer = [11,12,13,14,15]
const arrRightSideReservePlayers = [1,2,3,4,5]



  return (
    <div className="app-container">
          <div className="topbar">
    {/* <MenuIcon className="menu-icon"></MenuIcon> */}
      ZAALVOETBAL UTRECHT</div>
       <div style={{height: '94%', background:'#274D76'}}>
      <div className="events-page-container">
        <div className="title">EVENEMENTEN</div>
       
          {
            events ?
              events.map(eventItem =>{
                return (
                  <>
                     <div className="event-card-container">
                      <div className="event-card">
                        <div className="card-title">{eventItem.name}</div>
                        <div className="details-container">
                          <div className="details-row">
                            <div className="details-data">SPELERS</div>
                            <div className="details-info">{eventItem.players.length}</div>
                          </div>
                          <div className="details-row">
                            <div className="details-data">TIJD</div>
                            <div className="details-info">{eventItem.startTime}</div>
                          </div>
                          <div className="details-row">
                          <div className="details-data">LOCATIE</div>
                            <div className="details-info">{eventItem.location}</div>
                          </div>
                        </div>
                        <button className="join-button" onClick={()=>joinBtnHandler(eventItem.id)}>DEELNEMEN</button>
                        {
                          
                          eventItem.players.includes(userNow.FullName)? 
                          <button className="join-button" style={{background:'red'}} onClick={()=>unJoinBtnHandler(eventItem.id)}>Afmelden</button>
                          :null
                          // als user fullname incuse list 
                        }
                        <button className="see-more-btn" onClick={seeMoreBtnHandler}>ZIE MEER</button>
                      </div>
                    </div>
                    <div className="modal-event" style={{display: seeMoreModal}}>
                      <button className="back-btn" onClick={()=> setSeeMoreModal('none')}>
                        <ArrowBackIcon />
                      </button>
                      
                      <div className="players-title">SPELERS</div>
                      <div className="players-container"> 
                        <div className="players-section">
                        {
                            arrLeftSidePlayer.map((n,i) =>
                              <div className="players-card">
                                <div className="players-number">{n}</div>
                                <div className="players-name"> {eventItem.players[n-1]? eventItem.players[n-1] : null}</div>
                            </div>
                            )
                            
                        }
                        </div>
                        <div className="players-section">
                        {
                            arrRightSidePlayer.map((n, i) =>
                              <div className="players-card">
                                <div className="players-number">{n}</div>
                                <div className="players-name"> {eventItem.players[n-1]? eventItem.players[n-1] : null}</div>
                            </div>
                            )
                        }
                        {
                            arrRightSideReservePlayers.map((n) =>
                              <div className="players-card">
                                <div className="players-number-reserves">{n}</div>
                                <div className="players-name"> {eventItem.players[n+14]? eventItem.players[n+14] : null}</div>
                            </div>
                            )
                        }
                        </div>

                    </div>
                    <div className="players-title">Details</div>
                    <div className="details-info2">
                      <CalendarMonthIcon style={{marginRight:'10px'}}/>
                      <div>{eventItem.name}</div>
                    </div>
                    <div className="details-info2">
                      <AccessTimeIcon style={{marginRight:'10px'}}/>
                      <div>{eventItem.startTime}</div>
                    </div>
                    <div className="details-info2"><PlaceIcon style={{marginRight:'10px'}}/>{eventItem.location}</div>


                  </div>
                
            </>
                    
                )
              })
              : null

          }


      </div>
    </div>


    </div>
   
    )
}

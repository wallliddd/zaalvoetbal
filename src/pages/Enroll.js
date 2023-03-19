import React, { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';

import {doc, onSnapshot, updateDoc, setDoc, deleteDoc, collection, serverTimestamp, getDocs, query, where, orderBy, limit} from 'firebase/firestore';
import db from '../firebase.config'
import { async } from "@firebase/util";


export default function Enroll({currentuser}) {
  const [seeMoreModal, setSeeMoreModal] = useState('none')
  const [userNow, setUserNow] = useState(null)
  const [events, setEvents] = useState(null)
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

  const leftSectionPlayers = players.filter((player, i)=> i <8 ? player : null)

  const rightSectionPlayers = players.filter((player, i)=> i >=8 ? player : null)


  const seeMoreBtnHandler = () =>{
    seeMoreModal === 'none' ? setSeeMoreModal('flex') : setSeeMoreModal('none')
  }


  // R50Ro95SDwdsPVHjyUkPL5Bv3vN2



  async function editEvent(eventId){
    const playersArr = ['walid', 'shahin']
    const updatedEvent = {players : playersArr};

    try {
      const collectionRef = collection(db, 'events');
      const eventRef = doc(collectionRef, eventId);
      updateDoc(eventRef, updatedEvent);
    } catch(error) {
      console.error(error)
    }
  }

  editEvent()
  function joinBtnHandler(eventId){
    editEvent(eventId)
  }

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
                  <div className="event-card-container">
                  <div className="event-card">
                    <div className="card-title">{eventItem.name}</div>
                    <div className="details-container">
                      <div className="details-row">
                        <div className="details-data">SPELERS</div>
                        <div className="details-info">{eventItem.players.length}</div>
                      </div>
                      <div className="details-row">
                        <div className="details-data">DATUM</div>
                        <div className="details-info">{eventItem.startTime}</div>
                      </div>
                      <div className="details-row">
                      <div className="details-data">LOCATIE</div>
                        <div className="details-info">{eventItem.location}</div>
                      </div>
                    </div>
                    <button className="join-button" onClick={()=>joinBtnHandler(eventItem.id)}>DEELNEMEN</button>
                    <button className="see-more-btn" onClick={seeMoreBtnHandler}>ZIE MEER</button>
                  </div>
                </div>
                )
              })
              : null

          }

        <div className="modal-event" style={{display: seeMoreModal}}>
          <div className="players-title">SPELERS</div>
          <div className="players-container"> 
            <div className="players-section">
            {
              leftSectionPlayers.map((player, i)=>
              <div className="players-card">
                <div className="players-number">{i+1}</div>
                <div className="players-name">{player}</div>
              </div>
              )
            }
            </div>
            <div className="players-section">
            {
              rightSectionPlayers.map((player, i)=>
              <div className="players-card">
                <div className="players-number">{i+9}</div>
                <div className="players-name">{player}</div>
              </div>
              )
            }
            </div>
          </div>
        </div>
      
      </div>
    </div>


    </div>
   
    )
}

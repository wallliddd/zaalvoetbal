import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { red, green } from '@mui/material/colors';

import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import db from "../firebase.config";
import { async } from "@firebase/util";

export default function Enroll({ currentuser }) {
  const [seeMoreModal, setSeeMoreModal] = useState("none");
  const [ShowMenuModal, setShowMenuModal] = useState("none");
  const [userNow, setUserNow] = useState(null);
  const [events, setEvents] = useState(null);
  const [refresh, setFresh] = useState(false);
  const userObj = JSON.parse(localStorage.getItem("loginZaalvoetbal"));
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(
    () => {
      (async () => {
        const collectionRef = collection(db, "userinfo");
        const snapshots = await getDocs(collectionRef);
        const docs = snapshots.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          if (data.id === userObj.uid) return data;
        });
        const arr = docs.filter((item) => (item ? item : null));
        const userTemp = arr[0];

        setUserNow(userTemp);
      })();
      (async () => {
        const collectionRef = collection(db, "events");
        const snapshots = await getDocs(collectionRef);
        const docs = snapshots.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        setEvents(docs);
      })();
    },
    [],
    []
  );

  const handleCopy = (tikkieLink) => {
    navigator.clipboard
      .writeText(tikkieLink)
      .then(() => {
        setCopySuccess("Gekopieerd");
      })
      .catch((error) => {
        setCopySuccess("Copy failed: " + error);
      });
  };

  const seeMoreBtnHandler = () => {
    seeMoreModal === "none" ? setSeeMoreModal("flex") : setSeeMoreModal("none");
  };

  // R50Ro95SDwdsPVHjyUkPL5Bv3vN2

  async function addPlayerToEvent(eventId) {
    const name = userNow.FullName;

    const targetedEvent = events.filter((event) => event.id === eventId);
    if (targetedEvent) {
      const playersArr = targetedEvent[0].players;

      if (playersArr.includes(name)) {
        alert("Je staat er al op");
      } else {
        playersArr.push(name);
        const updatedEvent = { players: playersArr };

        try {
          const collectionRef = collection(db, "events");
          const eventRef = doc(collectionRef, eventId);
          updateDoc(eventRef, updatedEvent);
          setFresh(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  async function deletePlayerToEvent(eventId) {
    const name = userNow.FullName;

    const targetedEvent = events.filter((event) => event.id === eventId);
    if (targetedEvent) {
      const playersArr = targetedEvent[0].players;

      if (playersArr.includes(name)) {
        const deletedPlayerArr = playersArr.filter((player) => player !== name);
        console.log("deletedPlayerArr", deletedPlayerArr);
        const updatedEvent = { players: deletedPlayerArr };

        try {
          const collectionRef = collection(db, "events");
          const eventRef = doc(collectionRef, eventId);
          updateDoc(eventRef, updatedEvent);
          setFresh(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  async function addPlayerToPaid(eventId) {
    const name = userNow.FullName;

    const targetedEvent = events.filter((event) => event.id === eventId);
    if (targetedEvent) {
      const playersPaidArr = targetedEvent[0].paid;
          console.log('paidArr', playersPaidArr)
      if (playersPaidArr.includes(name)) {
        alert("Je staat er al op");
      } else {
        playersPaidArr.push(name);
        const updatedEvent = { paid: playersPaidArr };

        try {
          const collectionRef = collection(db, "events");
          const eventRef = doc(collectionRef, eventId);
          updateDoc(eventRef, updatedEvent);
          setFresh(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  async function deletePlayerToPaid(eventId) {
    const name = userNow.FullName;

    const targetedEvent = events.filter((event) => event.id === eventId);
    if (targetedEvent) {
      const playersArr = targetedEvent[0].paid;

      if (playersArr.includes(name)) {
        const deletedPlayerArr = playersArr.filter((player) => player !== name);
        console.log("deletedPlayerArr paid", deletedPlayerArr);
        const updatedEvent = { paid: deletedPlayerArr };

        try {
          const collectionRef = collection(db, "events");
          const eventRef = doc(collectionRef, eventId);
          updateDoc(eventRef, updatedEvent);
          setFresh(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }


  function paidBtnHandler(eventId) {
    addPlayerToPaid(eventId);
    setFresh(true);
    
  }

  function unpaidBtnHandler(eventId) {
    deletePlayerToPaid(eventId);
    setFresh(true);
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  }


  function joinBtnHandler(eventId) {
    addPlayerToEvent(eventId);
    setFresh(true);
  }

  function unJoinBtnHandler(eventId) {
    deletePlayerToEvent(eventId);
    setFresh(true);
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  }

  const arrLeftSidePlayer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arrRightSidePlayer = [11, 12, 13, 14, 15];
  const arrRightSideReservePlayers = [1, 2, 3, 4, 5];

  return (
    <div className="app-container">
      <div className="topbar">
        {seeMoreModal !== "none" ? (
          <button className="back-btn" onClick={() => setSeeMoreModal("none")}>
            <ArrowBackIcon />
          </button>
        ) : (
          <MenuIcon
            onClick={() => setShowMenuModal("flex")}
            className="menu-icon"
          />
        )}
        ZAALVOETBAL UTRECHT
      </div>

      {
        // setShowMenuModal === "flex" ?
        <div className="menu-modal" style={{ display: ShowMenuModal }}>
          <div className="menu-item-container">
            <div className="menu-item">
              <EventAvailableOutlinedIcon style={{ marginRight: "20px" }} />
              Evenementen
            </div>
            <div className="menu-item">
              <GavelOutlinedIcon style={{ marginRight: "20px" }} />
              Regels
            </div>
            <div className="menu-item">
              <AccountCircleOutlinedIcon style={{ marginRight: "20px" }} />
              Profiel
            </div>
            <div className="menu-item">
              <CampaignOutlinedIcon style={{ marginRight: "20px" }} />{" "}
              Aankondigingen
            </div>
            <div className="menu-item">
              <LogoutOutlinedIcon style={{ marginRight: "20px" }} />
              Uitloggen
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => setShowMenuModal("none")}
          >
            X
          </button>
        </div>
        // :null
      }

      <div style={{ height: "94%", background: "#274D76" }}>
        <div className="events-page-container">
          <div className="title">EVENEMENTEN</div>

          {events
            ? events.map((eventItem) => {
                return (
                  <>
                    <div className="event-card-container">
                      <div className="event-card">
                        <div className="card-title">{eventItem.name}</div>
                        <div className="details-container">
                          <div className="payment-status">Betaalstatus: {
                              eventItem.paid.includes(userNow.FullName) ? <PaidIcon sx={{ color: green[300]}}/>: <PaidIcon  sx={{ color: red[500]}}/>
                            }</div>
                          <div className="details-row">
                            <div className="details-data">SPELERS</div>
                            <div className="details-info">
                              {eventItem.players.length}
                            </div>
                          </div>
                          <div className="details-row">
                            <div className="details-data">TIJD</div>
                            <div className="details-info">
                              {eventItem.time}
                            </div>
                          </div>
                          <div className="details-row">
                            <div className="details-data">LOCATIE</div>
                            <div className="details-info">
                              {eventItem.location}
                            </div>
                          </div>
                        </div>

                        {
                          eventItem.players.includes(userNow.FullName) ? (
                            <button
                              className="join-button"
                              style={{ background: "red" }}
                              onClick={() => unJoinBtnHandler(eventItem.id)}
                            >
                              Afmelden
                            </button>
                          ) : (
                            <button
                              className="join-button"
                              onClick={() => joinBtnHandler(eventItem.id)}
                            >
                              DEELNEMEN
                            </button>
                          )

                        }
                        <button
                          className="see-more-btn"
                          onClick={seeMoreBtnHandler}
                        >
                          ZIE MEER
                        </button>
                      </div>
                    </div>
                    <div
                      className="modal-event"
                      style={{ display: seeMoreModal }}
                    >
                      <div className="details-info2">
                        <CalendarMonthIcon style={{ marginRight: "10px" }} />
                        <div>{eventItem.name}</div>
                      </div>
                      <div className="details-info2">
                        <AccessTimeIcon style={{ marginRight: "10px" }} />
                        <div>{eventItem.time}</div>
                      </div>
                      <div className="details-info2">
                        <PlaceIcon style={{ marginRight: "10px" }} />
                        {eventItem.location}
                      </div>

                      <div className="players-title">SPELERS</div>
                      <div className="players-container">
                        <div className="players-section">
                          {arrLeftSidePlayer.map((n, i) => (
                            <div className="players-card">
                              <div className="players-number">{n}</div>
                              <div className="players-name">
                                {" "}
                                {eventItem.players[n - 1]
                                  ? 
                                    <>
                                          <div>
                                              {eventItem.players[n - 1] }
                                          </div>
                                          <div>
                                             {eventItem.paid.includes(eventItem.players[n - 1]) ? <PaidOutlinedIcon sx={{ color: green[100]}}/>: <PaidOutlinedIcon  sx={{ color: red[100]}} />}
                                          </div>
                                    </>

                                  : null}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="players-section">
                          {arrRightSidePlayer.map((n, i) => (
                            <div className="players-card">
                              <div className="players-number">{n}</div>
                              <div className="players-name">
                                {" "}
                                {eventItem.players[n - 1]
                                  ? 
                                    <>
                                          <div>
                                              {eventItem.players[n - 1] }
                                          </div>
                                          <div>
                                             {eventItem.paid.includes(eventItem.players[n - 1]) ? <PaidOutlinedIcon sx={{ color: green[100]}}/>: <PaidOutlinedIcon  sx={{ color: red[100]}} />}
                                          </div>
                                    </>

                                  : null}
                              </div>
                            </div>
                          ))}
                          {arrRightSideReservePlayers.map((n) => (
                            <div className="players-card">
                              <div className="players-number-reserves">{n}</div>
                              <div className="players-name">
                                {" "}
                                {eventItem.players[n + 14]
                                  ? 
                                    <>
                                          <div>
                                              {eventItem.players[n +14] }
                                          </div>
                                          <div>
                                             {eventItem.paid.includes(eventItem.players[n +14]) ? <PaidOutlinedIcon sx={{ color: green[100]}}/>: <PaidOutlinedIcon  sx={{ color: red[100]}} />}
                                          </div>
                                    </>

                                  : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="players-title">Tikkie</div>

                      <div
                        style={{ marginLeft: "10px" }}
                        value={eventItem.tikkie}
                      >
                        {eventItem.tikkie}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >
                        <button
                          className="copy-tikkie-btn"
                          onClick={() => handleCopy(eventItem.tikkie)}
                        >
                          Kopieer Tikkie-link
                        </button>
                      </div>
                      <div className="players-title">Betaald?</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      >


                        {
                          eventItem.paid.includes(userNow.FullName) ? (
                              <div style={{display:'flex', flexDirection:'column', width:'100%', padding:'10px', justifyContent:'center', marginBottom:'10px'}}>
                                                         <div>Jij hebt aangegeven dat je betaald hebt. Was het een vergissing? Klik dan op de knop hieronder</div>
                            <button
                            className="copy-tikkie-btn"
                            onClick={()=> unpaidBtnHandler(eventItem.id)}
                            style= {{background:'red', color:'white', border:'none', marginTop:'10px'}}
                          >
                            Ik heb toch niet betaald 
                          </button>
                              </div>
                          ) : (

                          
                        <button
                          className="copy-tikkie-btn"
                          onClick={()=> paidBtnHandler(eventItem.id)}
                        >
                          Ik heb betaald!
                        </button>
                          )

                        }       

                      </div>
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import PaidIcon from "@mui/icons-material/Paid";
import { red, green } from "@mui/material/colors";
import EventModal from "./EventModal";
import { Link, Navigate } from "react-router-dom";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { useNavigate } from "react-router-dom";
import { Margin } from "@mui/icons-material";
import { height, style } from "@mui/system";
import tikkie from "../assets/tikkie.svg";

function EventCard({
  eventItem,
  userNow,
  handleAddPlayer,
  handleDeletePlayer,
  openModalHandler,
  handlePay,
}) {
  const [seeMoreModal, setSeeMoreModal] = useState("none");

  const arrLeftSidePlayer = [1, 2, 3, 4, 5];
  const [paid, setPaid] = useState(false);
  const [showPlayers, setShowplayers] = useState("none");
  const [guest, setGuest] = useState("");
  const navigate = useNavigate();


   useEffect(() => {
      if(eventItem.paid.includes(userNow.FullName)){
        setPaid(true)
      }
  }, []);

  function hanleEnrollment(eventId) {
    handleAddPlayer(eventId, guest);
    setShowplayers("flex");
  }

  const payBtnHandler = () => {
    if (!paid) {
      setPaid(true);
    } else {
      setPaid(false);
    }
    handlePay(eventItem.id, paid);
  };

  function tikkieHandler(){
    if(eventItem.tikkie==="") alert('Tikke is nog niet online gezet door Shahin. Wacht aub tot die aap dat gedaan heeft')
    else window.open(eventItem.tikkie, '_blank');
  }
  function tikkieLateHandler(){
    if(eventItem.tikkieLate==="") alert('Tikke is nog niet online gezet door Shahin. Wacht aub tot die aap dat gedaan heeft')
    else window.open(eventItem.Late, '_blank');
  }

  return (
    <div className="event-card-container" key={eventItem.id}>
      <div
        className="event-card"
        style={showPlayers === "none" ? { height: "11em" } : null}
      >
        <div className="card-title">{eventItem.name}</div>
        <div className="details-container">
          <div className="payment-status">
            Betaalstatus:{" "}
            {eventItem.paid.includes(userNow.FullName) ? (
              <PaidIcon sx={{ color: '#02f24a' }} />
            ) : (
              <PaidIcon sx={{ color: red[500] }} />
            )}
          </div>
          <div className="details-row">
            <div className="details-data">SPELERS</div>
            <div className="details-info">{eventItem.players.length}</div>
          </div>
          <div className="details-row">
            <div className="details-data">TIJD</div>
            <div className="details-info">{eventItem.time}</div>
          </div>
          <div className="details-row">
            <div className="details-data">LOCATIE</div>
            <div className="details-info">{eventItem.location}</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "2rem",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {eventItem.players.includes(userNow.FullName) ? (
              <button
                className="pay-btn"
                style={{ background: "red" }}
                onClick={() => handleDeletePlayer(eventItem.id)}
              >
                UITSCHRIJVEN
              </button>
            ) : (
              <button
                className="pay-btn"
                onClick={() => hanleEnrollment(eventItem.id)}
              >
                INSCHRIJVEN
              </button>
            )}

            {showPlayers === "none" ? (
              <button
                className="pay-btn-light"
                onClick={() => setShowplayers("flex")}
              >
                MEER INFO
              </button>
            ) : (
              <button
                className="pay-btn-light"
                onClick={() => setShowplayers("none")}
              >
                MINDER INFO
              </button>
            )}
          </div>
          
        </div>


        {showPlayers === "flex" ? (
          <>
                  <div className="guest-container">
              <input className="add-guest-input" onChange={(e)=> setGuest(e.target.value)} type={'text'} placeholder={'NAAM GAST'}></input>
              <button className="add-guest-btn" onClick={()=>hanleEnrollment(eventItem.id)}>TOEVOEGEN</button>
            </div>
            <div
              style={{ display: "flex", marginTop: "15px" }}
              className="card-show-players"
            >
              <div className="area">
                <div className="row">
                  {arrLeftSidePlayer.map((n, i) => (
                    <div className="player-row">
                      <div className="numbered-circle">{n}</div>

                      {eventItem.players[n - 1] ? (
                        <>
                          <div>{eventItem.players[n - 1]}</div>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="row">
                  {arrLeftSidePlayer.map((n, i) => (
                    <div className="player-row">
                      <div className="numbered-circle">{n + 5}</div>

                      {eventItem.players[n - 1] ? (
                        <>
                          <div>{eventItem.players[n + 4]}</div>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="row">
                  {arrLeftSidePlayer.map((n, i) => (
                    <div className="player-row">
                      <div className="numbered-circle">{n + 10}</div>

                      {eventItem.players[n - 1] ? (
                        <>
                          <div>{eventItem.players[n + 9]}</div>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="row">
                  {arrLeftSidePlayer.map((n, i) => (
                    <div className="player-row">
                      <div className="numbered-circle">{n + 15}</div>

                      {eventItem.players[n - 1] ? (
                        <>
                          <div>{eventItem.players[n + 14]}</div>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  className="pay-btn"
                  onClick={tikkieHandler}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      alt={"tikkie button"}
                      
                      src={tikkie}
                      height={"30px"}
                      style={{ marginLeft: "-40px" }}
                    />
                  </div>
                  Tikkie
                </button>
                <button
                  className="pay-btn"
                  onClick={tikkieLateHandler}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      alt={"tikkie button"}
                      src={tikkie}
                      height={"30px"}
                      style={{ marginLeft: "-10px" }}
                    />
                  </div>
                  Latertjes
                </button>
              </div>
            </div>

            <div className="switch-area">
              <div>Heb je betaald?</div>

              <div className="switch-content">
                <input
                  checked={paid}
                  onChange={() => payBtnHandler(eventItem.id)}
                  className="react-switch-checkbox"
                  id={`react-switch-new${eventItem.id}`}
                  style={paid ? { left: "34px" } : null}
                  type="checkbox"
                />
                <label
                  style={{ background: paid && "#02f24a" }}
                  className="react-switch-label"
                  htmlFor={`react-switch-new${eventItem.id}`}
                >
                  <span
                    className={`react-switch-button`}
                    style={paid ? { left: "34px" } : null}
                  />
                </label>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default EventCard;

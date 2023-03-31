import React, { useEffect, useState } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { red, green } from "@mui/material/colors";

function EventModal({ seeMoreModal, eventItem, userNow , payHandler, unpayHandler}) {
  const arrLeftSidePlayer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arrRightSidePlayer = [11, 12, 13, 14, 15];
  const arrRightSideReservePlayers = [1, 2, 3, 4, 5];
  const [paid, setPaid] = useState(false);


  console.log(eventItem.id + ' ' + paid)
  useEffect(() => {
    if(eventItem.paid.includes(userNow.FullName)) setPaid(true)
    else setPaid(false)

  }, [])
  



  const handlePayBtn = () =>{
    window.open(eventItem.tikkie, '_blank');
  }

  const payBtnHandler = (eventId) => {

    if(!paid){
        setPaid(true)
        payHandler(eventId)
    } else{
        setPaid(false)
        unpayHandler(eventId)
    }
  }




alert('event: ' +  eventItem.id)

  return (
    <div className="modal-event" style={{ display: seeMoreModal }}>
      <div className="details-info2">
        <CalendarMonthIcon style={{ marginRight: "10px" }} />
        <div>{eventItem.name}</div>
        <div style={{ marginLeft: 20 }}>{eventItem.time}</div>
      </div>
      <div className="details-info2">
        <PlaceIcon style={{ marginRight: "10px" }} />
        {eventItem.location}
      </div>

      <div className="players-title">SPELERS</div>
      <div className="players-container">
        <div className="players-section">
          {arrLeftSidePlayer.map((n, i) => (
            <div className="players-card" key={i}>
              <div className="players-number">{n}</div>
              <div className="players-name">
                {" "}
                {eventItem.players[n - 1] ? (
                  <>
                    <div>{eventItem.players[n - 1]}</div>
                    <div>
                      {eventItem.paid.includes(eventItem.players[n - 1]) ? (
                        <PaidOutlinedIcon sx={{ color: green[100] }} />
                      ) : (
                        <PaidOutlinedIcon sx={{ color: red[100] }} />
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="players-section">
          {arrRightSidePlayer.map((n, i) => (
            <div className="players-card" key={i}>
              <div className="players-number">{n}</div>
              <div className="players-name">
                {" "}
                {eventItem.players[n - 1] ? (
                  <>
                    <div>{eventItem.players[n - 1]}</div>
                    <div>
                      {eventItem.paid.includes(eventItem.players[n - 1]) ? (
                        <PaidOutlinedIcon sx={{ color: green[100] }} />
                      ) : (
                        <PaidOutlinedIcon sx={{ color: red[100] }} />
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
          {arrRightSideReservePlayers.map((n, i) => (
            <div className="players-card" key={i}>
              <div className="players-number-reserves">{n}</div>
              <div className="players-name">
                {" "}
                {eventItem.players[n + 14] ? (
                  <>
                    <div>{eventItem.players[n + 14]}</div>
                    <div>
                      {eventItem.paid.includes(eventItem.players[n + 14]) ? (
                        <PaidOutlinedIcon sx={{ color: green[100] }} />
                      ) : (
                        <PaidOutlinedIcon sx={{ color: red[100] }} />
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="players-title">BETALING</div>
      <div className="switch-area" >
        <input
          checked={paid}
          onChange={()=>payBtnHandler(eventItem.id)}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          style={{ background: paid && "#02f24a" }}
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
            <div className="switch-text">

                
                {paid? 'Ik heb betaald' : 'Ik heb niet betaald'}</div> 
          <span className={`react-switch-button`} />
        </label>
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
          onClick={handlePayBtn}
        >
            
          Betaal nu
        </button>
      </div>
    </div>
  );
}

export default EventModal;

import React, { useEffect, useState, useReducer } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { red, green } from "@mui/material/colors";
import { doc, updateDoc, collection } from "firebase/firestore";
import db from "../firebase.config";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ACTIONS = {
  ADD_EVENT: "add-event",
  ADD_PlAYER: "add-player",
  DELETE_PLAYER: "delete-player",
  PAY: "pay",
  UNPAY: "unpay",
};
function reducer(events, action) {
  switch (action.type) {
    case ACTIONS.ADD_EVENT:
      return [
        ...events,
        newEvent(
          action.payload.name,
          action.payload.location,
          action.payload.time,
          action.payload.players,
          action.payload.paid,
          action.payload.tikkie,
          action.payload.id
        ),
      ];
    case ACTIONS.ADD_PLAYER:
      return addPlayer(events, action.payload.userName, action.payload.eventId);
    case ACTIONS.DELETE_PLAYER:
      return deletePlayer(
        events,
        action.payload.userName,
        action.payload.eventId
      );
    case ACTIONS.PAY:
      return pay(events, action.payload.userName, action.payload.eventId);
    case ACTIONS.UNPAY:
      return unpay(events, action.payload.userName, action.payload.eventId);
    default:
      return events;
  }
}

function newEvent(name, location, time, players, paid, tikkie, id) {
  return {
    name,
    name,
    id: id,
    location: location,
    time: time,
    players: players,
    paid: paid,
    tikkie: tikkie,
  };
}

function pay(events, userName, eventId) {
  const result = events.map((event) => {
    if (event.id === eventId && !event.paid.includes(userName)) {
      event.paid.push(userName);
      try {
        const collectionRef = collection(db, "events");
        const eventRef = doc(collectionRef, eventId);
        updateDoc(eventRef, { paid: event.paid });
      } catch (error) {
        console.error(error);
      }
    }
    return event;
  });

  return result;
}

function unpay(events, userName, eventId) {
  const result = events.map((event) => {
    if (event.id === eventId) {
      event.paid = event.paid.filter((player) => player !== userName);
      try {
        const collectionRef = collection(db, "events");
        const eventRef = doc(collectionRef, eventId);
        updateDoc(eventRef, { paid: event.paid });
      } catch (error) {
        console.error(error);
      }
    }
    return event;
  });
  return result;
}

function addPlayer(events, userName, eventId) {
  console.log("in addplayer events", events);
  console.log("in addplayer userName", userName);
  console.log("in addplayer eventId", eventId);

  const result = events.map((event) => {
    if (event.id === eventId && !event.players.includes(userName)) {
      event.players.push(userName);
      try {
        const collectionRef = collection(db, "events");
        const eventRef = doc(collectionRef, eventId);
        updateDoc(eventRef, { players: event.players });
      } catch (error) {
        console.error(error);
      }
    }
    return event;
  });

  return result;
}

function deletePlayer(events, userName, eventId) {
  const result = events.map((event) => {
    if (event.id === eventId) {
      event.players = event.players.filter((player) => player !== userName);
      try {
        const collectionRef = collection(db, "events");
        const eventRef = doc(collectionRef, eventId);
        updateDoc(eventRef, { players: event.players });
      } catch (error) {
        console.error(error);
      }
    }
    return event;
  });
  return result;
}

function EventModal({ payHandler, unpayHandler }) {
  const { state } = useLocation();
  const { userNow, eventItem } = state; // Read values passed on state
  const [events, dispatch] = useReducer(reducer, [eventItem]);
  const arrLeftSidePlayer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arrRightSidePlayer = [11, 12, 13, 14, 15];
  const arrRightSideReservePlayers = [1, 2, 3, 4, 5];
  const [paid, setPaid] = useState(false);
  const navigate = useNavigate();

  console.log("id", eventItem);

  useEffect(() => {
    if (eventItem.paid.includes(userNow.FullName)) setPaid(true);
    else setPaid(false);
  }, []);

  const handlePayBtn = () => {
    window.open(eventItem.tikkie, "_blank");
  };

  const payBtnHandler = () => {
    if (!paid) {
      setPaid(true);
      dispatch({
        type: ACTIONS.PAY,
        payload: { eventId: eventItem.id, userName: userNow.FullName },
      });
    } else {
      setPaid(false);
      dispatch({
        type: ACTIONS.UNPAY,
        payload: { eventId: eventItem.id, userName: userNow.FullName },
      });
    }
  };

  function handleJoin() {
    dispatch({
      type: ACTIONS.ADD_PLAYER,
      payload: { eventId: eventItem.id, userName: userNow.FullName },
    });
  }

  function handleUnjoin() {
    dispatch({
      type: ACTIONS.DELETE_PLAYER,
      payload: { eventId: eventItem.id, userName: userNow.FullName },
    });
  }

  return (
    <div className="modal-event">
      <div className="topbar">
        <div className="back-icon-area" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>

        <div>ZAALVOETBAL UTRECHT</div>
      </div>
      <div style={{position:'relative'}}>
        <div className="details-info2">
          <CalendarMonthIcon style={{ marginRight: "10px" }} />
          <div>{eventItem.name}</div>
          <div style={{ marginLeft: 20 }}>{eventItem.time}</div>
        </div>
        <div className="details-info2">
          <PlaceIcon style={{ marginRight: "10px" }} />
          {eventItem.location}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {events[0].players.includes(userNow.FullName) ? (
            <button className="unjoin-btn" onClick={handleUnjoin}>
              UITSCHRIJVEN
            </button>
          ) : (
            <button className="copy-tikkie-btn" onClick={handleJoin}>
              INSCHRIJVEN
            </button>
          )}
        </div>
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
      <div style={{textAlign: 'center'}}>Laat ons weten wanneer je betaald hebt</div>
      <div className="switch-area">
        <input
          checked={paid}
          onChange={() => payBtnHandler(eventItem.id)}
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
            {paid ? "Ik heb betaald" : "Ik heb niet betaald"}
          </div>
          <span className={`react-switch-button`} />
        </label>
      </div>
      <div style={{textAlign: 'center'}}>Tikkie komt 2 dagen van tevoren online</div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <button className="copy-tikkie-btn-large" onClick={handlePayBtn}>
          Betaal nu
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <button className="copy-tikkie-btn-large" onClick={handlePayBtn}>
          Betaal nu (laatkomer)
        </button>
      </div>
    </div>
  );
}

export default EventModal;

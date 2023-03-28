import React, { useReducer, useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { red, green } from "@mui/material/colors";
import EventCard from "../components/EventCard";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/UserAuthContext";
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
import EventModal from "../components/EventModal";

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

function Test() {
  const [events, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [userName, setUserName] = useState("");
  const [seeMoreModal, setSeeMoreModal] = useState("none");
  const [ShowMenuModal, setShowMenuModal] = useState("none");
  const [userNow, setUserNow] = useState("Waldo");
  const userObj = JSON.parse(localStorage.getItem("loginZaalvoetbal"));
  const arrLeftSidePlayer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const currentUser = useAuth();

  useEffect(() => {
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
        dispatch({
          type: ACTIONS.ADD_EVENT,
          payload: data,
        });
        return data;
      });
    })();
  }, []);

  function handelSubmit(e) {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_EVENT,
      payload: {
        location: location,
        time: time,
        players: ["kahlid", "kali"],
        paid: [],
        tikkie: "tikkie.nl",
      },
    });
    setTime("");
    setLocation("");
  }

  function handleAddPlayer(eventId) {
    dispatch({
      type: ACTIONS.ADD_PLAYER,
      payload: { eventId: eventId, userName: userNow.FullName },
    });
  }

  function handleDeletePlayer(eventId) {
    dispatch({
      type: ACTIONS.DELETE_PLAYER,
      payload: { eventId: eventId, userName: userNow.FullName },
    });
  }

  function closeModalHandler() {
    setSeeMoreModal("none");
  }
  function openModalHandler() {
    setSeeMoreModal("flex");
  }

  function payHandler(eventId) {
    dispatch({
      type: ACTIONS.PAY,
      payload: { eventId: eventId, userName: userNow.FullName },
    });
  }

  function unpayHandler(eventId) {
    dispatch({
      type: ACTIONS.UNPAY,
      payload: { eventId: eventId, userName: userNow.FullName },
    });
  }

  return (
    <div className="app-container">
      <Topbar
        seeMoreModal={seeMoreModal}
        closeModalHandler={closeModalHandler}
      />

      <div
        style={{ height: "100%", background: "#274D76", overflow: "hidden" }}
      >
        <div className="events-page-container">
          <div className="title">EVENEMENTEN</div>

          {events
            ? events.map((eventItem) => {
                return (
                  <>
                    <EventCard
                      key={eventItem.id}
                      handleAddPlayer={handleAddPlayer}
                      eventItem={eventItem}
                      userNow={userNow}
                      handleDeletePlayer={handleDeletePlayer}
                      seeMoreModal={seeMoreModal}
                      openModalHandler={openModalHandler}
                    />
                    {seeMoreModal === "flex" ? (
                      <EventModal
                        unpayHandler={unpayHandler}
                        payHandler={payHandler}
                        seeMoreModal={seeMoreModal}
                        eventItem={eventItem}
                        userNow={userNow}
                      />
                    ) : null}
                  </>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Test;

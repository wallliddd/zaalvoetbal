import React from "react";
import PaidIcon from "@mui/icons-material/Paid";
import { red, green } from "@mui/material/colors";

function EventCard({ eventItem, userNow , handleAddPlayer, handleDeletePlayer,  openModalHandler} ) {
  return (
    <div className="event-card-container" key={eventItem.id}>
      <div className="event-card">
        <div className="card-title">{eventItem.name}</div>
        <div className="details-container">
          <div className="payment-status">
            Betaalstatus:{" "}
            {eventItem.paid.includes(userNow.FullName) ? (
              <PaidIcon sx={{ color: green[300] }} />
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

        {eventItem.players.includes(userNow.FullName) ? (
          <button className="join-button" style={{ background: "red" }}
            onClick={() => handleDeletePlayer(eventItem.id)}
          >
            Afmelden
          </button>
        ) : (
          <button
            className="join-button"
            onClick={() => handleAddPlayer(eventItem.id)}
          >
            DEELNEMEN
          </button>
        )}
        <button className="see-more-btn" onClick={ openModalHandler}>ZIE MEER</button>
      </div>
    </div>
  );
}

export default EventCard;

import React from "react";

export default function Enroll() {
  const players = ["walid", "Faycal", "Ramin", "Ashkan", "Nawied", 
  'Shahin', 'Wais',"walid", "Faycal", "Ramin", "Ashkan", "Nawied", 'Shahin', 'Wais', "Qais"  ]

  const leftSectionPlayers = players.filter((player, i)=> i <8 ? player : null)
  console.log('left',leftSectionPlayers)
  const rightSectionPlayers = players.filter((player, i)=> i >=8 ? player : null)
  console.log('right',rightSectionPlayers)



  return (
    <div className="events-page-container">
      <div className="title">EVENEMENTEN</div>
      <div className="event-card-container">
        <div className="event-card">
          <div className="card-title">Zaterdag zaalvoetbal</div>
          <div className="details-container">
            <div className="details-row">
              <div className="details-data">SPELERS</div>
              <div className="details-info">7</div>
            </div>
            <div className="details-row">
              <div className="details-data">DATUM</div>
              <div className="details-info">1 feb</div>
            </div>
            <div className="details-row">
            <div className="details-data">LOCATIE</div>
              <div className="details-info">Utrecht</div>
            </div>
          </div>
          <button className="join-button">DEELNEMEN</button>
          <button className="see-more-btn">ZIE MEER</button>
        </div>
      </div>
      <div className="modal-event">
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
    )
}

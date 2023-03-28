import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";



function MenuModal({ShowMenuModal}) {
  return (
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
       // onClick={() => setShowMenuModal("none")}
      >
        X
      </button>
    </div>
  );
}

export default MenuModal;

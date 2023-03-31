import React from "react"
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
;

function Topbar({seeMoreModal, closeModalHandler}) {
  return (
    <div className="topbar">

      {
        seeMoreModal === 'none'? <MenuIcon className="menu-icon" /> :

        <div className="back-icon-area" >
            <ArrowBackIcon  />
        </div>
        
      
      }
      <div>ZAALVOETBAL UTRECHT</div>
      
    </div>
  );
}

export default Topbar;

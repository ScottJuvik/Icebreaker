import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import AddIcon from "@mui/icons-material/Add";

export interface PopupMenuItem {
  text: string;
  onClick: () => void;
}

export interface PopupMenuProps {
  menuItems: PopupMenuItem[];
}

function PopupMenu({ menuItems }: PopupMenuProps) {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <AddIcon className="add-queue-btn" {...bindTrigger(popupState)} />
          <Menu {...bindMenu(popupState)}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.text}
                onClick={() => {
                  item.onClick();
                  popupState.close();
                }}
              >
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
export default PopupMenu;

import * as React from "react";
import {
  MenuItem,
  Menu,
  Typography,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddBoxIcon from '@mui/icons-material/AddBox';

import { SelectFilter } from "./common";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;

export const MenuCustom = ({ optionsOrder }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = ({ path }: { path: string }) => {
    if (path) {
      navigate(path);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {optionsOrder.map(
          (option: { key: string; path: string; text: string }) => (
            <MenuItem
              key={option.key}
              selected={option.text === "Pyxis"}
              onClick={() => {
                handleClose({ path: option.path });
              }}
            >
              {option.text}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

export const MenuCustomHead = ({ options }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = ({ path }: { path: string }) => {
    if (path) {
      navigate(path);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddBoxIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map(
          (option: { key: string; path: string; text: string }) => (
            <MenuItem
              key={option.key}
              selected={option.text === "Pyxis"}
              onClick={() => {
                handleClose({ path: option.path });
              }}
            >
              {option.text}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

export const MenuAccount = ({ options }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option: any) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const SetupCustom = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 65 * 4.5,
            width: "10ch",
          },
        }}
      >
        <Typography
          sx={{ fontSize: 14, padding: "8px 12px" }}
          color="text.secondary"
          gutterBottom
          className=""
        >
          SHOW
        </Typography>
        {["10", "20", "30"].map((option) => (
          <MenuItem
            key={option}
            color="text.secondary"
            selected={option === "Pyxis"}
            onClick={handleClose}
            sx={{ fontSize: 12, padding: "8px 12px" }}
          >
            {option}
          </MenuItem>
        ))}
        <Typography
          sx={{ fontSize: 14, padding: "8px 12px" }}
          color="text.secondary"
          gutterBottom
          className="border-t-2 pt-2"
        >
          ORDER
        </Typography>
        {["DESC", "ASC"].map((option) => (
          <MenuItem
            key={option}
            color="text.secondary"
            selected={option === "Pyxis"}
            onClick={handleClose}
            sx={{ fontSize: 12, padding: "8px 12px" }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const FilterCustom = (props: {
  selectOptions: any[];
  selectOptions1: any[];
  selectOptions2?: any[];
  title: string;
  emailVerified?: boolean;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 65 * 4.5,
            width: "40ch",
          },
        }}
      >
        <div className="px-3 flex space-y-1 space-x-4 justify-between items-center border border-t-0 border-r-0 border-l-0">
          <div className="flex space-y-1 space-x-4">
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                margin: "8px 0 0 0",
              }}
              color="text.secondary"
              gutterBottom
            >
              {props.title}
            </Typography>
          </div>
          <MenuCustom optionsOrder={props.selectOptions} />
        </div>
        {props.emailVerified ? (
          <div className="px-3">
            <FormControlLabel control={<Checkbox />} label="Email Verified" />
          </div>
        ) : null}
        <div className="flex space-x-3 p-3">
          <SelectFilter
            values={props.selectOptions1}
            name="STATUS"
            initValue={""}
          />
          {props.selectOptions2?.length ? (
            <SelectFilter
              values={props.selectOptions2}
              name="ROOM TYPE"
              initValue={""}
            />
          ) : null}
        </div>
        <div className="p-3">
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#364a63", color: "white" }}
          >
            Filter
          </Button>
        </div>
        <div className="px-3 flex space-y-1 space-x-4 justify-between items-center border border-b-0 border-r-0 border-l-0">
          <Button variant="text">Reset Filter</Button>
          <Button variant="text">Save Filter</Button>
        </div>
      </Menu>
    </div>
  );
};

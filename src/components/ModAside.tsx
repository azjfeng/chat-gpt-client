import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuValue } from "tdesign-react";

const HEADER_TAB = {
  moduleConfig: "/module-config",
  imageToImage: "/image-to-image",
  myWork: "/my-work",
};

const { MenuItem } = Menu;

function ModAside() {
  const [active, setActive] = useState<MenuValue>("moduleConfig");
  const navigate = useNavigate();
  function handleTabItemSelect(val: MenuValue) {
    setActive(val);
    switch (val) {
      case HEADER_TAB.imageToImage:
        return navigate("/image-to-image");
      case HEADER_TAB.moduleConfig:
        return navigate("/module-config");
    }
  }
  return (
    <Fragment>
      <Menu
        theme="dark"
        style={{ height: "100%" }}
        onChange={handleTabItemSelect}
        value={active}
      >
        <MenuItem value={"moduleConfig"}>
          <span>chat</span>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default ModAside;

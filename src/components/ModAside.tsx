import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuValue } from "tdesign-react";

const HEADER_TAB = {
  chat: "chat",
  chatStream: "chatStream",
  myWork: "my-work",
};

const { MenuItem } = Menu;

function ModAside() {
  const [active, setActive] = useState<MenuValue>("chat");
  const navigate = useNavigate();
  function handleTabItemSelect(val: MenuValue) {
    setActive(val);
    switch (val) {
      case HEADER_TAB.chat:
        return navigate("/chat");
      case HEADER_TAB.chatStream:
        return navigate("/chatStream");
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
        <MenuItem value={"chat"}>
          <span>chat</span>
        </MenuItem>
        <MenuItem value={"chatStream"}>
          <span>chatStream</span>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default ModAside;

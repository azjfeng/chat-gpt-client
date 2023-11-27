import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ChatTextPages from "./pages/chatText";
import ChatTextStreamPages from "./pages/chatTextStream";
import "tdesign-react/es/style/index.css"; // 少量公共样式
import "./index.css";
import { Loading } from "tdesign-react";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Navigate to="/chat" />,
  },
  {
    path: "/chat",
    index: true,
    element: <ChatTextPages />,
  },
  {
    path: "/chatStream",
    index: true,
    element: <ChatTextStreamPages />,
  },
]);

function App() {
  // store
  useEffect(()=>{
  }, [])
  const [isInit] = useState(true);

  function renderContent() {
    if (isInit) {
      return (
        <>
          <RouterProvider router={router} />
        </>
      );
    }
    return (
      <Loading
        loading={true}
        fullscreen
        preventScrollThrough={true}
        text="加载中"
      ></Loading>
    );
  }
  return <>{renderContent()}</>;
}

export default App;

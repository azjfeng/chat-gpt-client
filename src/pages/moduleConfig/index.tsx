/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Input } from "tdesign-react";

import ModHeader from "../../components/ModHeader";
import ModAside from "../../components/ModAside";
import { useEffect, useState } from "react";
// import axios from "axios";
const { Content, Aside } = Layout;
let requestIng = false;
// const controller = new AbortController();

function ModuleConfigPages() {
  const [value, setValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [token, setToken] = useState<any>([]);
  async function main(prompt: string) {
    if (!prompt) return;
    requestIng = true;
    // fetch("http://127.0.0.1:5173/api/text/getGenerateStream", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ prompt: prompt }),
    // })
    //   .then((response: any) => {
    //     return response.json();
    //   })
    //   .then((res) => {
    //     console.log('res',)
    //   })
    //   .catch((error) => {
    //     console.error("请求发生错误:", error);
    //   });

    const eventSource = new EventSource("http://127.0.0.1:5173/api/text/getGenerateStream", {
    });

    eventSource.onopen = function () {
      console.log("连接已建立");
    };
    eventSource.onmessage = function (event) {
      console.log('event', event);
      const eventData = JSON.parse(event.data);
      // 处理推送的数据
      console.log(eventData);
    };

    eventSource.onerror = function (error) {
      eventSource.close();
      console.error("连接发生错误:", error);
    };

    eventSource.close = function () {
      console.log("连接已关闭");
    };
  }
  useEffect(() => {}, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEnter = async (value: string) => {
    if (requestIng || !value) {
      return;
    }
    await setToken([...token, { role: "input", value }]);
    // h5TextRequest(value);
    main(value);
    setValue("");
  };
  return (
    <div className="pg-text2img">
      <Layout className="is-console" style={{ height: "100%" }}>
        <ModHeader />
        <Layout>
          <Aside style={{ height: "100%" }}>
            <ModAside />
          </Aside>
          <Content
            className="is-flex"
            style={{
              background: "#141415",
              position: "relative",
              display: "flex",
            }}
          >
            <div style={{ flex: 1, paddingBottom: 100 }}>
              {token.map((item: any) => {
                if (item.role === "input") {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        justifyContent: "end",
                      }}
                    >
                      <p
                        style={{
                          border: "1px solid #E5EAF3",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        {item.value}
                      </p>
                      <div
                        style={{
                          display: "inline-flex",
                          margin: 15,
                          position: "relative",
                          float: "right",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: `
                    <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g >
                        <!--背景色配置处-->
                        <rect x="1" y="1" width="36" height="36" rx="18" fill="#27B3BC"/>
                        <!--文本配制处-->
                        <text fill="#ffffff" x="19"  y="20" dominant-baseline="middle" style="text-anchor: middle"  font-family="PingFang SC" font-size="18"  font-weight="500">Y</text>
                        <!--边框-->
                        <rect x="1" y="1" width="36" height="36" rx="18" stroke="#ffffff" stroke-width="2"/>
                      </g>
                    </svg>
                  `,
                        }}
                      />
                    </div>
                  );
                }
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        margin: 15,
                        position: "relative",
                        float: "right",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `
                  <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g >
                      <!--背景色配置处-->
                      <rect x="1" y="1" width="36" height="36" rx="18" fill="#27B3BC"/>
                      <!--文本配制处-->
                      <text fill="#ffffff" x="19"  y="20" dominant-baseline="middle" style="text-anchor: middle"  font-family="PingFang SC" font-size="18"  font-weight="500">O</text>
                      <!--边框-->
                      <rect x="1" y="1" width="36" height="36" rx="18" stroke="#ffffff" stroke-width="2"/>
                    </g>
                  </svg>
                `,
                      }}
                    />
                    <p
                      style={{
                        border: "1px solid #E5EAF3",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      {item.content}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 20,
                right: 20,
                height: 50,
              }}
            >
              <Input
                value={value}
                align="left"
                size="medium"
                status="default"
                type="text"
                style={{ height: "100%" }}
                onEnter={(value) => onEnter(value)}
                onChange={(value) => setValue(value)}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default ModuleConfigPages;

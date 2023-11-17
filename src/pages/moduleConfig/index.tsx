/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Input } from "tdesign-react";

import ModHeader from "../../components/ModHeader";
import ModAside from "../../components/ModAside";
import { useEffect, useState } from "react";
import axios from "axios";
const { Content, Aside } = Layout;
let requestIng = false;

function ModuleConfigPages() {
  const [value, setValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [token, setToken] = useState<any>([]);
  async function main(prompt: string) {
    if (!prompt) return;
    requestIng = true;
    axios
      .post("https://aistudio.cloud.tencent.com/api/users", { text: prompt })
      .then((response) => {
        requestIng = false;
        console.log(response.data); // 响应数据
        console.log([...token, { ...response.data.choices[0].message }]);
        setToken([
          ...token,
          { role: "input", value },
          { ...response.data.choices[0].message },
        ]);
      })
      .catch((error) => {
        requestIng = false;
        console.error(error); // 错误处理
      });
  }
  // const h5TextRequest = async (prompt: string) => {
  //   axios
  //     .post(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         messages: [{ role: "user", content: prompt }],
  //         temperature: 0.7,
  //         model: "gpt-3.5-turbo",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       requestIng = false;
  //       console.log(response.data); // 响应数据
  //       console.log([...token, { ...response.data.choices[0].message }]);
  //       setToken([
  //         ...token,
  //         { role: "input", value },
  //         { ...response.data.choices[0].message },
  //       ]);
  //       console.log(response.data.choices[0].mesages);
  //     })
  //     .catch((error) => {
  //       requestIng = false;
  //       console.error(error);
  //     });
  // };

  // const h5ImageRequest = async (prompt: string) => {
  //   axios
  //   .post(
  //     "https://api.openai.com/v1/images/generations",
  //     {
  //       "model": "dall-e-3",
  //       "prompt": prompt,
  //       "n": 1,
  //       "size": "1024x1024"
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer `,
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     requestIng = false;
  //     console.log(response.data); // 响应数据
  //     console.log([...token, { ...response.data.choices[0].message }]);
  //     setToken([
  //       ...token,
  //       { role: "input", value },
  //       { ...response.data.choices[0].message },
  //     ]);
  //     console.log(response.data.choices[0].mesages);
  //   })
  //   .catch((error) => {
  //     requestIng = false;
  //     console.error(error);
  //   });
  // };
  useEffect(() => {}, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEnter = async (value: string) => {
    if (requestIng || !value) {
      return;
    }
    await setToken([...token, { role: "input", value }]);
    // h5TextRequest(value);
    main(value)
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

import {
  Menu,
  Button,
  Dropdown,
  Layout,
  Avatar,
} from 'tdesign-react';
import { UserIcon } from 'tdesign-icons-react';
import { useUserStore } from '../stores/userStore';

const { Header } = Layout;
const { HeadMenu } = Menu;

const OPERATION_ITEM = {
  nickname: 1,
  buyRecord: 2,
  userProtocol: 3,
  privateProtocol: 4,
  logout: 5,
};

function ModHeader() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nickname = useUserStore((state: any) => state.nickname);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleOperationItemClick() {
  }

  function renderOperation() {
    // 未登录
    if (!nickname) {
      return <Button theme="default">登录</Button>;
    }

    return (
      <>
        <Dropdown
          onClick={handleOperationItemClick}
          options={[
            {
              content: nickname,
              value: OPERATION_ITEM.nickname,
            },
            {
              content: '退出登录',
              value: OPERATION_ITEM.logout,
            },
          ]}
          maxColumnWidth={200}
        >
          {
            nickname ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  margin: 15,
                  position: 'relative',
                  height: '100%',
                }}
                dangerouslySetInnerHTML={{
                  __html: `
                    <svg width="32" height="32" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g >
                        <!--背景色配置处-->
                        <rect x="1" y="1" width="36" height="36" rx="18" fill="#27B3BC"/>
                        <!--文本配制处-->
                        <text fill="#ffffff" x="19"  y="20" dominant-baseline="middle" style="text-anchor: middle"  font-family="PingFang SC" font-size="18"  font-weight="500">${nickname.charAt(0)}</text>
                        <!--边框-->
                        <rect x="1" y="1" width="36" height="36" rx="18" stroke="#ffffff" stroke-width="2"/>
                      </g>
                    </svg>
                  `,
                }}
              />
            ) : (
              <Avatar icon={<UserIcon />} />
            )
          }
        </Dropdown>
      </>
    );
  }

  return (
    <Header>
      <HeadMenu
        theme="dark"
        value={0}
        logo={
          <img
            src=""
            height="21"
            alt="logo"
            style={{marginLeft: '20px'}}
          />
        }
        operations={renderOperation()}
      >
      </HeadMenu>
    </Header>
  );
}

export default ModHeader;

import "./App.css";
import { useEffect } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import WebApp from "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();

  useEffect(() => {
    console.log(WebApp.initData)
    window.eruda.init()

    window.addEventListener('message', function (event) {
      console.log(event.data)
      if (event.data?.type === 'payLink') {
        WebApp.openTelegramLink(event.data?.data?.directPayLink)
      }
    });

    
  }, [])

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
            <button onClick={() => {
              // WebApp.openLink('https://payment.365bitball.com/plans?member_id=5699547696&member_mail=test000001%40gmail.com')
              fetch('https://payment.365bitball.com/api/refund', {
                method: 'POST'
              })
            }}>Wallet</button>
          </FlexBoxRow>
          {/* <Counter /> */}
          {/* <TransferTon /> */}
          {/* <Jetton /> */}
          <iframe
            src="https://payment.365bitball.com/plans?member_id=5699547696&member_mail=test000001%40gmail.com"
            width="100%"
            height={600}
          />


        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;

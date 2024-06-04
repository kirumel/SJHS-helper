"use client";

import useFunnel from "next-use-funnel";
import Register2 from "./약관";
import StartRegister from "./시작";
import Email from "./이메일";
import Pw from "./비번";
import Nickname from "./닉네임";
import Img from "./사진";
import Config from "./확인";
import "./style.css";

export type FunnelState = {
  name: string;
  email: string;
};

export default function ExampleFunnel() {
  const [Funnel, state, setState] = useFunnel(
    ["start", "약관", "이메일", "비번", "닉네임", "사진", "확인"] as const,
    { initialStep: "start" }
  ).withState<FunnelState>({});

  return (
    <Funnel>
      <Funnel.Step name="start">
        <StartRegister next={() => setState({ step: "약관" })} />
      </Funnel.Step>
      <Funnel.Step name="약관">
        <Register2 next={() => setState({ step: "이메일" })} />
      </Funnel.Step>
      <Funnel.Step name="이메일">
        <Email next={() => setState({ step: "비번" })} />
      </Funnel.Step>
      <Funnel.Step name="비번">
        <Pw next={() => setState({ step: "닉네임" })} />
      </Funnel.Step>
      <Funnel.Step name="닉네임">
        <Nickname next={() => setState({ step: "사진" })} />
      </Funnel.Step>
      <Funnel.Step name="사진">
        <Img next={() => setState({ step: "확인" })} />
      </Funnel.Step>
      <Funnel.Step name="확인">
        <Config next={() => setState({ step: "start" })} />
      </Funnel.Step>
    </Funnel>
  );
}

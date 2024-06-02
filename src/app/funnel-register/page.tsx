"use client";

import useFunnel from "next-use-funnel";
import Register2 from "./약관";
import StartRegister from "./시작";
import Email from "./이메일";
import Pw from "./비번";
import "./style.css";

export type FunnelState = {
  name: string;
  email: string;
};

export default function ExampleFunnel() {
  const [Funnel, state, setState] = useFunnel(
    ["start", "약관", "이메일", "비번"] as const,
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
        <Pw next={() => setState({ step: "비번" })} />
      </Funnel.Step>
    </Funnel>
  );
}

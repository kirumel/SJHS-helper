"use client";

import useFunnel from "next-use-funnel";
import Email from "./email";
import StartRegister from "./start-register";
import "./style.css";

export type FunnelState = {
  name: string;
  email: string;
};

export default function ExampleFunnel() {
  const [Funnel, state, setState] = useFunnel(
    ["start", "email", "pw"] as const,
    { initialStep: "start" }
  ).withState<FunnelState>({});

  return (
    <Funnel>
      <Funnel.Step name="start">
        <StartRegister next={() => setState({ step: "email" })} />
      </Funnel.Step>
      <Funnel.Step name="email">
        <Email next={() => setState({ step: "email" })} />
      </Funnel.Step>
    </Funnel>
  );
}

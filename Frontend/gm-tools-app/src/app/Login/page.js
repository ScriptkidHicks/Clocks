"use client";
import {
  CenterColumnFlexDiv,
  CenterColumnPage,
  DivTitleLabel,
  InputLabel,
  LimitedTextInput,
  RowContentDiv,
  TextFilledButton,
} from "@/Components/Basics/BasicComponents";

export default function Login() {
  return (
    <CenterColumnPage>
      <CenterColumnFlexDiv>
        <DivTitleLabel>Login</DivTitleLabel>
        <RowContentDiv>
          <InputLabel>Name / Email</InputLabel>
          <LimitedTextInput></LimitedTextInput>
        </RowContentDiv>
        <RowContentDiv>
          <InputLabel>Password</InputLabel>
          <LimitedTextInput></LimitedTextInput>
        </RowContentDiv>
        <TextFilledButton
          onClick={() => {
            console.log("captured");
          }}
        >
          Already A Member?
        </TextFilledButton>
      </CenterColumnFlexDiv>
    </CenterColumnPage>
  );
}

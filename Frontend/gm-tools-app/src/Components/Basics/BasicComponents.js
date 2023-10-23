"use client";
import styled from "styled-components";

/**
 * Page Bodies
 */

const CenterColumnPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

/**
 * Flexible Divs
 */

const CenterColumnFlexDiv = styled.div`
  background-color: #219c90;

  padding: 10px;

  border-radius: 5px;
`;

const RowContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

/**
 * Labels
 */

const DivTitleLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;

  color: White;
  font-weight: bold;
`;

/**
 * Inputs
 */

const LimitedTextInput = styled.input`
  min-width: 70px;
  max-width: 200px;

  font-size: 1.1em;

  border-radius: 6px;
  margin: 10px;

  transition: ease all 0.3s;

  &:focus {
    outline: none;
    box-shadow: inset 2px 2px 2px black;
  }
`;

/**
 * Buttons
 */

const TextFilledButton = styled.button``;

export {
  CenterColumnFlexDiv,
  CenterColumnPage,
  DivTitleLabel,
  InputLabel,
  RowContentDiv,
  LimitedTextInput,
  TextFilledButton,
};

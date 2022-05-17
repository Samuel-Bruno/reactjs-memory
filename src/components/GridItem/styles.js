import styled from "styled-components";

export const Container = styled.div`
  background-color:${props => props.showBackground ? '#1550FF' : '#E2E3E3'};
  height:100px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
  opacity:${props => props.opacity ?? 1}
`;
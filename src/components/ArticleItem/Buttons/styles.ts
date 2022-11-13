import styled from 'styled-components'

export const ButtonsContainer = styled.div`
  position: absolute;
  right: 9px;
  top: 85px;
`
export const Button = styled.button<{ bg: string }>`
  width: 78px;
  height: 31px;
  color: ${({ bg }) => bg};
  background: none;
  border: 1px solid ${({ bg }) => bg};
  border-radius: 5px;
  text-align: center;
  margin-right: 12px;
  font-size: 14px;
`

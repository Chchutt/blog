import styled from 'styled-components'

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0 20px 0 20px;
`
export const BtnContainer = styled.div<{jc: string}>`
  width: 340px;
  display: flex;
  align-items: center;
  justify-content: ${({ jc }) => jc};
`

export const Title = styled.p`
  margin: 0
`

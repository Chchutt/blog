import { SingUp } from '../components/SingUp'

interface Props {
  authed: { sing: boolean, editing: boolean }
}

export const SingUpPage = (props:Props) => {
  const { authed } = props
  return (
    <SingUp authed={authed} />
  )
}

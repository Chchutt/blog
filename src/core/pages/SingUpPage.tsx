import { SingUp } from '../../components/SingUp'

import { VerifyProps } from './interfaces'

export const SingUpPage = (props: VerifyProps) => {
  const { authed } = props
  return (
    <SingUp authed={authed} />
  )
}

import { To } from 'react-router-dom'

export interface Props{
    singIn?: boolean,
    singUp?: boolean,
    create?: boolean,
    logout?: boolean,
    link: To,
    onClick?: () => void
}

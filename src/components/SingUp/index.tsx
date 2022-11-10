import '../Body/index.scss'
import './index.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginProfile, profileEdited, registrationProfile } from '../../redux/actions/articleAction'
import { Profile } from '../../redux/actions/actionCreators'

type FormValues = {
  username: string,
  password: string,
  email: string,
  passwordReg: string,
  newUsername: string,
  newEmail: string,
  newPassword: string,
  imgUrl: string,
}

interface Props {
  authed: { sing: boolean, editing: boolean }
}

export function SingUp(props: Props) {
  const { authed } = props
  const regState = useSelector((state: Profile) => state.profile)
  const { registration } = regState
  const dispatch = useDispatch()
  const [usernameValue, setUsernameValue] = useState<any>(localStorage.getItem('username'))
  const [emailValue, setEmailValue] = useState<any>(localStorage.getItem('email'))
  const {
    register, formState: { errors }, handleSubmit, watch, reset
  } = useForm<FormValues>({ mode: 'all' })
  const registerSubmit = (data:{username: string, email: string, password: string}) => dispatch(registrationProfile(data.username, data.email, data.password))
  const loginSubmit = (data:{email: string, password: string}) => dispatch(loginProfile(data.email.toString(), data.password.toString()))
  const editingProfile = (data:{newUsername: string, imgUrl: string, newEmail: string, newPassword: string}) => dispatch(profileEdited(data.newUsername, data.imgUrl, data.newEmail, data.newPassword))
  const password = useRef({})
  password.current = watch('password', '')
  useEffect(() => {
    reset()
  }, [regState])
  const RegView = () => {
    return (
      <form onSubmit={handleSubmit(registerSubmit)}>
        <div className="content-container">
          {registration && <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            background: 'rgba 2, 4, 1, 232, 50%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '6px',
            fontSize: '30px',
            width: '384px',
            height: '100px'
          }}
          >Registration success</div>}
          <div className="container_in-up">
            <p className="title_in-up">Create new Account</p>
            <ul className="inputs-reg">
              <li className="username reg">
                <p className="li text">Username</p>
                <input
                  className="input reg"
                  type="text"
                  placeholder="Username"
                  style={errors.username ? { borderColor: 'red' } : {}}
                  {...register('username', {
                    required: 'username is required',
                    minLength: {
                      value: 3,
                      message: 'username must be at least 3 characters long'
                    },
                    maxLength: {
                      value: 20,
                      message: 'username must be at most 20 characters long'
                    },
                  })}
                />
                <p style={{ color: 'red' }}>{(errors.username?.message)}</p>
              </li>
              <li className="email reg">
                <p className="li text">Email address</p>
                <input
                  className="input reg"
                  type="text"
                  placeholder="Email address"
                  style={errors.email ? { borderColor: 'red' } : {}}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'email должен быть корректным почтовым адресом'
                    }
                  })}
                />
              </li>
              <p style={{ color: 'red' }}>{errors.email?.message}</p>
              <li className="password reg">
                <p className="li text">Password</p>
                <input
                  className="input reg"
                  type="password"
                  placeholder="Password"
                  style={errors.password ? { borderColor: 'red' } : {}}
                  {...register('password', {
                    required: 'password is required',
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,40}$/,
                      message: 'password должен быть от 6 до 40 символов'
                    }
                  })}
                />
              </li>
              <p style={{ color: 'red' }}>{errors.password?.message}</p>
              <li className="passwordRepeat reg">
                <p className="li text">Repeat Password</p>
                <input
                  className="input reg"
                  type="password"
                  placeholder="Repeat Password"
                  style={errors.passwordReg ? { borderColor: 'red' } : {}}
                  {...register('passwordReg', {
                    required: 'password is required',
                    validate: (value: string) => {
                      if (watch('password') !== value) {
                        return 'пороль не совпадает'
                      }
                    }
                  })}
                />
              </li>
              <p style={{ color: 'red' }}>{errors.passwordReg?.message}</p>
            </ul>
            <div
              className="reg-privacy"
              style={{
                width: '275px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
              }}
            >
              <input
                type="checkbox"
                checked
                style={{
                  fontSize: '14px',
                  lineHeight: '22px',
                  marginRight: '5px',
                }}
              />
              <p style={{ margin: '0' }}>
                            I agree to the processing of my personal information</p>
            </div>
            <div className="reg-btn-create">
              <input
                type="submit"
                style={{
                  width: '319px',
                  height: '40px',
                  background: '#1890FF',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px',
                }}
                value="Create"
              />
              <p style={{
                fontSize: '12px',
                textAlign: 'center'
              }}
              >Already have an account?<Link to="/sing-in">Sign In.</Link></p>
            </div>
          </div>
        </div>
      </form>
    )
  }
  const SingView = () => {
    return (
      <form onSubmit={handleSubmit(loginSubmit)}>
        <div className="content-container">
          <div className="container_in-up-in">
            <p className="title_in-up">Sing in</p>
            <ul className="inputs-reg">
              <li className="email reg">
                <p className="li text">Email address</p>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'email должен быть корректным почтовым адресом'
                    }
                  })}
                  className="input reg"
                  type="text"
                  placeholder="Email address"
                />
              </li>
              <p style={{ color: 'red' }}>{errors.email?.message}</p>
              <li className="password-login">
                <p className="li text">Password</p>
                <input
                  {...register('password', {
                    required: 'password is required',
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,40}$/,
                      message: 'password должен быть от 6 до 40 символов'
                    }
                  })}
                  className="input reg"
                  type="password"
                  placeholder="Password"
                />
              </li>
              <p style={{ color: 'red' }}>{errors.password?.message}</p>
            </ul>
            <div className="reg-privacy">
              <input
                type="checkbox"
                checked
                style={{
                  fontSize: '14px',
                  lineHeight: '22px',
                  marginRight: '5px',
                }}
              />
              <p style={{ margin: '0' }}>
                            I agree to the processing of my personal information</p>
            </div>
            <div className="reg-btn-login">
              <input
                type="submit"
                onSubmit={() => loginSubmit}
                style={{
                  width: '319px',
                  height: '40px',
                  background: '#1890FF',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px',
                }}
                value="Login"
              />
              <p style={{
                fontSize: '12px',
                textAlign: 'center'
              }}
              >Don`t have an account?<Link to="/sing-up">Sign Up.</Link></p>
            </div>
          </div>
        </div>
      </form>
    )
  }
  const EditingView = () => {
    return (
      <form onSubmit={handleSubmit(editingProfile)}>
        <div className="content-container">
          <div className="container_in-up-in">
            <p className="title_in-up">Edit Profile</p>
            <ul className="inputs-reg">
              <li className="username">
                <p className="li text">Username</p>
                <input
                  {...register('newUsername', {
                    required: 'username is required',
                  })}
                  className="input reg"
                  type="text"
                  onChange={(e) => setUsernameValue(e.target.value)}
                  value={usernameValue}
                />
              </li>
              <p style={{ color: 'red' }}>{errors.username?.message}</p>
              <li className="email reg">
                <p className="li text">Email address</p>
                <input
                  {...register('newEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'email должен быть корректным почтовым адресом'
                    }
                  })}
                  className="input reg"
                  type="text"
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={emailValue}
                />
              </li>
              <p style={{ color: 'red' }}>{errors.email?.message}</p>
              <li className="password-login">
                <p className="li text">New password</p>
                <input
                  {...register('newPassword', {
                    required: 'password is required',
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,40}$/,
                      message: 'password должен быть от 6 до 40 символов'
                    }
                  })}
                  className="input reg"
                  type="password"
                  placeholder="New password"
                />
              </li>
              <p style={{ color: 'red' }}>{errors.newPassword?.message}</p>
              <li className="avatar-img">
                <p className="li text">Avatar image (url)</p>
                <input
                  {...register('imgUrl', {
                    required: 'url is required',
                  })}
                  className="input reg"
                  type="text"
                  placeholder="Avatar image"
                />
              </li>
              <p style={{ color: 'red' }}>{errors.imgUrl?.message}</p>
            </ul>
            <div className="reg-btn">
              <input
                type="submit"
                onSubmit={() => editingProfile}
                style={{
                  width: '319px',
                  height: '40px',
                  background: '#1890FF',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '16px',
                }}
                value="Save"
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
  const switchPages = () => {
    switch (true) {
    case authed.sing && !authed.editing:
      return RegView()
    case !authed.sing && !authed.editing:
      return SingView()
    case !authed.sing && authed.editing:
      return EditingView()
    default:
      return null
    }
  }
  return switchPages()
}

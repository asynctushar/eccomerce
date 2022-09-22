import './Auth.css';
import { useEffect, useRef, useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AvatarPreview from '../../images/Profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, registerAction } from '../../redux/actions/userAction';
import { useAlert } from 'react-alert';
import { clearErrorAction } from '../../redux/actions/appAction';
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const { name, email, password, confirmPassword } = user;
    const [avatar, setAvatar] = useState(AvatarPreview);

    const dispatch = useDispatch();
    const error = useSelector(state => state.appState.error);
    const isAuthenticated = useSelector(state => state.userState.isAuthenticated);
    const alert = useAlert();
    const navigate = useNavigate();

    const loginRef = useRef();
    const registerRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [dispatch, isAuthenticated, alert])


    if (error) {
        alert.show(error.message);
        dispatch(clearErrorAction());
    }

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginAction(loginEmail, loginPassword));
    }

    const registerHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('password does not match')
        }

        const userInfo = {
            name,
            email,
            password,
            avatar
        }

        dispatch(registerAction(userInfo))
    }

    const registerFormChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onloadend = (e) => {
                setAvatar(reader.result);
            };

        } else {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            });
        }
    }

    const switchAuthType = (e, type) => {
        if (type === 'login') {
            e.target.nextElementSibling.classList.remove('active');
            e.target.classList.add('active');

            loginRef.current.classList.add('active');
            registerRef.current.classList.remove('active');
        }

        if (type === 'register') {
            e.target.previousElementSibling.classList.remove('active');
            e.target.classList.add('active');

            registerRef.current.classList.add('active');
            loginRef.current.classList.remove('active');
        }
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className='auth-toggle'>
                    <p className="login-heading active" onClick={(e) => switchAuthType(e, 'login')}>LOGIN</p>
                    <p className="register-heading" onClick={(e) => switchAuthType(e, 'register')}>REGISTER</p>
                </div>
                <div className="form-container">
                    {/* login form */}
                    <form className="login-form active" ref={loginRef} onSubmit={loginHandler}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input type="loginEmail" name="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input type="loginPassword" name="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <a href="#" className="forget-password">Forget Password?</a>
                        <button className="login-button">
                            Log In
                        </button>
                    </form>

                    {/* register  form */}
                    <form className="register-form" ref={registerRef} onSubmit={registerHandler}>
                        <div className="regName">
                            <PermIdentityIcon />
                            <input type="text" name="name" placeholder="Name" value={name} required onChange={registerFormChange} />
                        </div>
                        <div className="regEmail">
                            <MailOutlineIcon />
                            <input type="email" name="email" placeholder="Email" value={email} required onChange={registerFormChange} />
                        </div>
                        <div className="regPassword">
                            <LockOpenIcon />
                            <input type="password" name="password" placeholder="Password" value={password} required onChange={registerFormChange} />
                        </div>
                        <div className="regConfirmPassword">
                            <LockOpenIcon />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} required onChange={registerFormChange} />
                        </div>
                        <div className="regFileUpload">
                            <img src={avatar} alt="Avatar" />
                            <input type="file" name="avatar" placeholder="Upload avatar" accept="image/*" onChange={registerFormChange} />
                        </div>
                        <button className="register-button">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
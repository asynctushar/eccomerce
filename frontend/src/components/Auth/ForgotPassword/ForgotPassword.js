import './ForgotPassword.css';
import { Fragment, useEffect, useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction, resetForgotPasswordStatusAction } from '../../../redux/actions/userAction';
import { clearErrorAction } from '../../../redux/actions/appAction';
import { useAlert } from 'react-alert';
import Loader from '../../Loader/Loader';
import MetaData from '../../layout/MetaData';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { forgotPasswordMessage } = useSelector((state) => state.userState);
    const { error, isLoading } = useSelector((state) => state.appState);
    const alert = useAlert();
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (forgotPasswordMessage && forgotPasswordMessage.success) {
            alert.success(forgotPasswordMessage.message);
            dispatch(resetForgotPasswordStatusAction());
            setEmail('');
        }
    }, [dispatch, forgotPasswordMessage]); // eslint-disable-line react-hooks/exhaustive-deps

    if (error) {
        alert.error(error.response.data.message);
        dispatch(clearErrorAction());
    }

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        dispatch(forgotPasswordAction({ email }));
    }

    const onChangeHandler = (e) => setEmail(e.target.value);

    return (
        <Fragment>
            <MetaData title="Forgot Password" />
            <Fragment >
                {isLoading ? <Loader /> :
                    <div className="forgot-password">
                        <div className="forgot-password-form-container">
                            <h3 className="forgot-password-heading">Forgot Password</h3>
                            <p className="forgot-password-description">Enter your email address. We will send you password reset link.</p>
                            <form className="forgot-password-form" onSubmit={forgotPasswordSubmit}>
                                <div className="email">
                                    <MailOutlineIcon />
                                    <input type="email" name="email" placeholder="Email" value={email} required onChange={onChangeHandler} />
                                </div>
                                <button className="forgot-password-button">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                }
            </Fragment>
        </Fragment>
    );
}

export default ForgotPassword;
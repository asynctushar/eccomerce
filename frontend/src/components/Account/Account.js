import './Account.css';
import { Fragment } from "react";
import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from "../Loader/Loader";

const Account = () => {
    const { user } = useSelector((state) => state.userState);
    const { isLoading } = useSelector((state) => state.appState);
  

    return (
        <Fragment>
            {isLoading ? <Loader /> :
                <Fragment>
                    <MetaData title={user.name} />
                    <div className="profile-container">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to='/me/update' >Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined ON</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

export default Account;
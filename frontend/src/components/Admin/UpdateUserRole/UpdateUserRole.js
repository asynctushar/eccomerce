import './UpdateUserRole.css';
import { Fragment, useEffect, useState } from 'react';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar/SideBar';
import { SwitchAccount, Email, Spellcheck } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrorAction } from '../../../redux/actions/appAction';
import { getSingleUserAction, resetUpdateSingleUserStatusAction, updateSingleUserAction } from '../../../redux/actions/userAction';


const UpdateUserRole = () => {
    const [role, setRole] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();
    const { singleUser: user, isSingleUserUpdated } = useSelector((state) => state.userState);
    const { error } = useSelector((state) => state.appState);


    useEffect(() => {
        dispatch(getSingleUserAction(id));

        if (isSingleUserUpdated) {
            alert.success("User Updated Successfully.")
            navigate('/admin/users');

            dispatch(resetUpdateSingleUserStatusAction());
        }

    }, [dispatch, id, isSingleUserUpdated]); // eslint-disable-line react-hooks/exhaustive-deps

    const submitRoleHandler = (e) => {
        e.preventDefault();

        dispatch(updateSingleUserAction({ role }, id))
    }

    if (error) {
        alert.error(error.response.data.message);

        dispatch(clearErrorAction());
    }


    return (
        <Fragment>
            <MetaData title="Update User -- Admin" />
            <div className="dashboard">
                <SideBar />
                <div className="updateuser-container">
                    <form className="updateuser-form" onSubmit={submitRoleHandler}>
                        <h1>Update User Role</h1>
                        <div>
                            <Spellcheck />
                            <input type="text" placeholder="User Name" value={user ? user.name : ''} disabled={true} />
                        </div>
                        <div>
                            <Email />
                            <input type="email" placeholder="User Email" value={user ? user.email : ''} disabled={true} />
                        </div>
                        <div>
                            <SwitchAccount />
                            <select required onChange={(e) => setRole(e.target.value)}>
                                <option value='' > Choose Role </option>
                                {user && user.role === "user" && (
                                    <option value="admin">Admin</option>
                                )}
                                {user && user.role === "admin" && (
                                    <option value="user">User</option>
                                )}
                            </select>
                        </div>
                        <Button className="updateuser-btn" type="submit">Update</Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
export default UpdateUserRole;
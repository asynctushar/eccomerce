import './NotFound.css';
import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="not-found">
            <CheckCircle />

            <Typography> Page Not Found</Typography>
            <Link to="/">Return Home</Link>
        </div>
    )
}
export default OrderSuccess;
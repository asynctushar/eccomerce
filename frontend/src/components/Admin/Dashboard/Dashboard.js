import SideBar from '../SideBar/SideBar';
import MetaData from '../../layout/MetaData';
import './Dashboard.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip, ArcElement } from 'chart.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminAllProductsAction } from '../../../redux/actions/productAction';
import { clearErrorAction } from '../../../redux/actions/appAction';
import {useAlert} from 'react-alert';
import { getAllOrdersAction } from '../../../redux/actions/orderAction';

const Dashboard = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productState.adminAllProducts);
    const allOrders = useSelector((state) => state.orderState.allOrders);
    const { error } = useSelector(state => state.appState);

    useEffect(() => {
        dispatch(getAdminAllProductsAction());
        dispatch(getAllOrdersAction());
    }, [dispatch, products, allOrders]);

    if (error) {
        alert.error(error.response.data.message);

        dispatch(clearErrorAction());
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );

    let outOfStock = 0;

    products && products.forEach(item => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                data: [0, 100000],
                backgroundColor: "tomato",
                hoverBackgroundColor: "rgb(197, 72, 49)"
            }
        ]
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products && products.length - outOfStock]
            }
        ]
    }

    const options = {
        maintainAspectRation: false
    }

    return (
        <div className="dashboard" >
            <MetaData title="Dashboard" />
            <SideBar />
            <div className="dashboard-container">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboard-summary">
                    <div>
                        <p>Total Amount <br /> 20000 taka</p>
                    </div>
                    <div className="dashboard-summary-box-2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{ products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{ allOrders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>3</p>
                        </Link>
                    </div>
                </div>
                <div className="line-chart">
                    <Line data={lineState} options={options}/>
                </div>
                <div className="doughnut-chart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div >
    )
}
export default Dashboard;
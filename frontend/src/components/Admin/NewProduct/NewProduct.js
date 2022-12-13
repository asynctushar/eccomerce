import './NewProduct.css';
import { Fragment, useEffect, useState } from 'react';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar/SideBar';
import { AccountTree, AttachMoney, Description, Image, Spellcheck, Storage } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearCreateProductStatusAction, createNewProductAction } from '../../../redux/actions/productAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { clearErrorAction } from '../../../redux/actions/appAction';

const NewProduct = () => {
    const dispatch = useDispatch();
    const { createProductSuccess } = useSelector((state) => state.productState);
    const { error } = useSelector((state) => state.appState);
    const alert = useAlert();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ['Laptop', 'PC', 'Mobile', 'Accessories', 'Games', 'Others'];

    if (error) {
        alert.error(error.response.data.message);

        dispatch(clearErrorAction());
    }

    useEffect(() => {
        if (createProductSuccess) {
            alert.success("New Product Created Successfully.");
            navigate('/admin/dashboard');
            dispatch(clearCreateProductStatusAction());
        }
    }, [dispatch, createProductSuccess])

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setImages((old) => [...old, reader.result]);
                setImagesPreview((old) => [...old, reader.result])
            }
        })
    }

    const submitProductHandler = (e) => {
        e.preventDefault();

        const formData = {
            name,
            price,
            description,
            stock,
            category,
            images
        }

        dispatch(createNewProductAction(formData));
    }

    return (
        <Fragment>
            <MetaData title="Create New Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newproduct-container">
                    <form className="newproduct-form" onSubmit={submitProductHandler}>
                        <h1>Create New Product</h1>
                        <div>
                            <Spellcheck />
                            <input type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <AttachMoney />
                            <input type="number" placeholder="Product Price" required value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <Description />
                            <textarea placeholder="Product Description" required rows={1} cols={30} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)} required  >
                                <option value='' > Choose Category </option>
                                {categories.map((item) => (
                                    <option value={item} key={item}>{item}</option>
                                )
                                )}
                            </select>
                        </div>
                        <div>
                            <Storage />
                            <input type="number" placeholder="Stock" required value={stock} onChange={(e) => setStock(e.target.value)} />
                        </div>
                        <div className="newproduct-form-file">
                            <Image />
                            <input type="file" name="avatar" accept="image/*" multiple onChange={createProductImagesChange} />
                        </div>
                        <div className="newproduct-form-image">
                            {imagesPreview.map((item, index) => (
                                <img src={item} alt={`Image-${index + 1}`} key={index} />
                            ))}
                        </div>
                        <Button className="newproduct-btn" type="submit"> Create Product</Button>
                    </form>
                </div>
            </div>


        </Fragment>
    )
}
export default NewProduct;
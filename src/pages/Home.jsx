//Redux
import { useSelector, useDispatch } from "react-redux";
import { unSetUser } from "../app/reducers/user/userSlice";

//React
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ProducstList } from "../components/ProducstList";

import Axios from 'axios'

export const Home = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() =>{
        Axios.get("http://localhost:3000/products")
            .then(response => {
                setProducts(response.data)
            })
    }, [])

    const handleLogout = (e) => {
        dispatch(unSetUser());
        navigate("/");
    }

    return (
        <>
            <h2>Home</h2>
            <p>Welcome {user.fullName} / {user.email}</p>
            <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
            <hr />
            <ProducstList products={products} />
        </>
    )
}
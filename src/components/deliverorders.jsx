import React, { Fragment, useState, useEffect } from 'react';
import '../components.css';
import stores from './firebaseCofig'
import { Link } from "react-router-dom";
import Header from './header.jsx'
import swal from 'sweetalert';

const DeliverOrders = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getOrdersInfo = stores.collection('order').where("status", "==", "done").onSnapshot(snap => {
            const arrayOrders = snap.docs.map(doc => {
                return {
                    id: doc.id, ...doc.data()
                }
            })
            setTasks(arrayOrders)
        })
        return () => getOrdersInfo();
    }, [])

    const despacho = async (id) => {
        try {
            document.querySelector('#btn_served' + id).style.backgroundColor = '#000000';
            swal("Done", "order served", "info");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <header className="header">
                <Header></Header>
                <Link to="/waiters" className="btn btn-dark mt-2 btn_group">Waiters</Link>
                <Link to="/cuisine" className="btn btn-danger mt-2 btn_group">Cuisine</Link>
            </header>

            <section className="orders_container">
                {
                    tasks.map(item => (
                        <div key={item.id} className="card bg-light mb-3 mt-3 orders_group">
                            <p className="card-header"><strong>Customer:</strong> {item.name}</p>
                            {item.comments
                                ? <p>Comments: {item.comments}</p>
                                : null}
                            <span  >
                                <h5 className="card-title">Order summary</h5>
                                {item.orders.map(element => (
                                    <li key={element.id}> {element.title} ({element.quantity}) </li>
                                ))
                                }
                                <button className="btn btn-secondary mt-2 btn_group" id={"btn_served" + item.id} value={item.id} onClick={() => despacho(item.id)}>served</button>

                            </span>
                        </div>
                    ))
                }
            </section>
        </Fragment >
    )
}

export default DeliverOrders;
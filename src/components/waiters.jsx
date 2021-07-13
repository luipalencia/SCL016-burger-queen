import React, { Fragment, useState } from 'react';
import handroll from '../data/handroll.js'
import promos from '../data/promos.js'
import '../App.css';
import stores from './firebaseCofig'
import swal from 'sweetalert';
import Header from './header.jsx'
import { Link } from "react-router-dom";

const WaitersView = () => {
  const [orders, setOrders] = useState([]);
  const [costs, setCosts] = useState(0);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [pending] = useState('pending');
  const [toggler, setToggler] = useState(false);
  const dateOrder = new Date();
  let timing = dateOrder.toLocaleString();

  const setUser = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      swal("Oh no", "The name field is empty", "error");
    } else {
      const customer = {
        name: name,
        orders: orders,
        costs: costs,
        comments: comments,
        status: pending,
        time: timing
      }
      try {
        await stores.collection('order').add(customer)
        swal("Done", "Registered order", "success");
      } catch (e) {
        console.log(e)
      }
      setName('');
      setOrders([]);
      setCosts(0);
      setComments('');
    }
  }
  const viewHandrolls = (e) => {
    setToggler(true);
  }

  const viewPromos = (e) => {
    setToggler(false);
  }

  const addProduct = (e, item) => {
    e.preventDefault();
    if (orders.includes(orders.find((eachOrder) => eachOrder.id === item.id))) {
      item.quantity += 1;
      setOrders([...orders])
    } else {
      item.quantity = 1;
      setOrders([...orders, item])
    }
    setCosts(recupero(costs, item.cost, true))

  }

  const deleteProduct = (e, item) => {
    e.preventDefault();
    if (orders.includes(orders.find((eachOrder) => eachOrder.id === item.id))) {
      item.quantity -= 1;
      let i = orders.indexOf(item);
      if (item.quantity === 0) orders.splice(i, 1);
      setOrders([...orders])
      setCosts(recupero(costs, item.cost, false))
    }
  }

  const recupero = (a, b, c) => c ? Number(a) + Number(b) : Number(a) - Number(b);

  return (
    <Fragment>
      <div className="header">
        <Header></Header>
        <Link to="/cuisine" className="btn btn-dark mt-2 btn_group">Cuisine</Link>
        <Link to="/deliverorders" className="btn mt-2 btn_group btn-danger">Orders</Link>
      </div>

      <div className="header_date">{timing}</div>

      <div className="btn_group--menu">
        <button className="btn btn-dark mt-2 btn_group" onClick={(e) => viewHandrolls(e)}>Handrolls</button>
        <button className="btn btn-dark mt-2 btn_group" onClick={(e) => viewPromos(e)}>Special Offers</button>
      </div>

      {toggler ? <div className="mt-3 view_menu--options">
        {
          handroll.items.map(item => {
            return (
              <div key={item.id} className="card" style={{ width: "10rem" }}>
                <img src={item.image} className="card-img-top" style={{ width: "10rem", height: "10rem" }} alt="..." rel="preload" />
                <div className="card-body">
                  <p className="card-text"></p>
                  <p className="card-text">{item.title}</p>
                  <p className="card-text">${item.cost}</p>
                  <button className="btn btn-dark mt-2 btn_group" onClick={(e) => addProduct(e, item)}>+</button>
                  <button className="btn btn-dark mt-2 btn_group" onClick={(e) => deleteProduct(e, item)}>-</button>
                </div>
              </div>

            );
          })
        }
      </div>

        :

        <div className="mt-3 view_menu--options">
          {
            promos.items.map(item => {
              return (
                <div key={item.id} className="card" style={{ width: "10rem" }}>
                  <img src={item.image} className="card-img-top" style={{ width: "10rem", height: "10rem" }} alt="..." />
                  <div className="card-body">
                    <p className="card-text"></p>
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">${item.cost}</p>
                    <button className="btn btn-dark mt-2 btn_group" onClick={(e) => addProduct(e, item)}>+</button>
                    <button className="btn btn-dark mt-2 btn_group" onClick={(e) => deleteProduct(e, item)}>-</button>
                  </div>
                </div>
              );
            })
          }
        </div>}

      <div className="view_menu--options--form">
        <form className="register_form bg-dark" onSubmit={setUser}>
          <h6>Order Summary</h6>
          <input className="form-control" value={name} onChange={(e) => { setName(e.target.value) }}
            placeholder='Customer name' />

          <div>
            <table className="table table-light table-bordered table-sm table-responsive">
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(eachOrder => {
                  return (
                    <tr key={eachOrder.id}>
                      <td>{eachOrder.title}</td>
                      <td>{eachOrder.quantity}</td>
                      <td>${eachOrder.cost}</td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table>
            <input className="form-control" value={comments} onChange={(e) => { setComments(e.target.value) }}
              placeholder='Add Comment' />
            <p> TOTAL: ${costs} </p>
            <input className="btn btn-light mt-2 mb-2 btn_group" type='submit' value='proceed' />
          </div>
        </form>
      </div>

    </Fragment>
  );
}
export default WaitersView;

import React, { Fragment, useState, useEffect } from 'react';
import '../App.css';
import stores from './firebaseCofig'
import { Link } from "react-router-dom";
import Header from './header.jsx'
import swal from 'sweetalert';

const CuisineView = () => {
  const dateOrder = new Date();
  let timing = dateOrder.toLocaleString();
  const [taskss, setTaskss] = useState([]) 

/*  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await stores.collection('order').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setTaskss(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])  */


  useEffect(() => {
      const getDocsInfo2 = stores.collection('order').onSnapshot(snap => {
        const arrayOrders = snap.docs.map(doc => {
          return { 
          id: doc.id, ...doc.data() 
          }
        })
        setTaskss(arrayOrders)
        })
       return () => getDocsInfo2();
      }, [])

  const inProcess = async (id) => {
    try {
      await stores.collection('order').doc(id).update({
        status: "In progress",
      })
    } catch (error) {
      console.log(error)
    }
    swal("Great", "The order is in progress", "info");
    document.querySelector('#process' + id).style.backgroundColor = 'gold';
  }

  const done = async (id) => {
    try {
      await stores.collection('order').doc(id).update({
        status: "done",
      })
    } catch (error) {
      console.log(error)
    }
    swal("Excelent", "The order is ready", "success");
    document.querySelector('#done' + id).style.backgroundColor = 'green';
  }


  return (
    <Fragment>
      <div className="header">
        <Header></Header>
        <Link to="/waiters" className="btn btn-dark mt-2 btn_group">Waiters</Link>
        <Link to="/deliverorders" className="btn btn-danger mt-2 btn_group">Orders</Link>
      </div>

      <div className="header_date">{timing}</div>

   <div className="orders_container">
        {
          taskss.map(item => (
            <div key={item.id} className="card bg-light mb-3 mt-3 orders_group">
              <p className="card-header"><strong>Customer:</strong> {item.name}</p>
              {item.time
                ? <p>{item.time}</p>
                : null}
              {item.comments
                ? <p>Comments: {item.comments}</p>
                : null}
              <span>
              <h5 className="card-title">Order summary</h5>
                {item.orders.map(elemento => (
                  <li key={elemento.id}> {elemento.title} ({elemento.quantity}) </li>
                ))
                }
                <button className="btn btn-secondary mt-2 btn_group" id={'process' + item.id} value={item.id} onClick={() => inProcess(item.id)}>In progress</button>
                <button className="btn btn-secondary mt-2 btn_group" id={'done' + item.id} value={item.id} onClick={() => done(item.id)}>Done</button>

                <h6>status: {item.status}</h6>
              </span>
            </div>
          ))
        }
      </div>
    </Fragment >
  )
}

export default CuisineView;
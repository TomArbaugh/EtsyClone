import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkGetAllProducts } from "../../redux/products";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";


function ViewOrder() {

    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        dispatch(thunkGetAllProducts());
      }, [dispatch]);

    const user = useSelector((state) => state.session.user)




    let response;
    const fetchOrders = async () => {

        try {
            response = await fetch(`/api/orders/`)
            const data = await response.json()
            setOrders(data)
            // console.log("27", orders)
        } catch (err) {
            console.error('Request Error:', err);
        }

    }
    useEffect(() => {
        fetchOrders()
    },[dispatch])

    const getItems = async (order_id) => {

        const items = await fetch(`/order-items/${order_id}`)
        const data = await items.json()
        
        return data
    } 

    // console.log("This is orders", orders)


    const ordersArr = []
    orders ? orders.map((order) => {
        const orderDetails = {}

        orderDetails.status = order.status
        orderDetails.total = order.total
        orderDetails.id = order.id
        orderDetails.order_items = []
        // console.log("ORDER: ", order)

        order.products_ordered.map((order_item) => {

            const orderItemObj = {}

            items = getItems(order_id)
            
            console.log("ORDER_ITEMS: ", items)
            // const id = order_item.order_id

            orderItemObj.name = order_item.name,
            orderItemObj.price = order_item.price,
            // orderItemObj.quantity = order_item.quantity,
            // orderItemObj.total = order_item.quantity * order_item.price

            orderDetails.order_items.push(orderItemObj)

        })
        ordersArr.push(orderDetails)
}) : null
    // console.log("ORDERSARRAY: ", ordersArr)

    if (!ordersArr.length) return "no orders"
    return (
        <>
            <h1>Orders for {user.first_name}</h1>
            {ordersArr.map((order) => (
                <>
                    {order.order_items.map((order_item) => (
                        <>
                            {/* <p>Order Id: {order_items.order_id}</p> */}
                            
                            <p>Product Name: {order_item.name}</p>
                            <p>Price: {order_item.price}</p>
                            <p>Quantity: {order_item.quantity}</p>
                        </>

                    ))}
                    <p>Status: {order.status}</p>
                    <p>Total: {Number(order.total).toFixed(2)}</p>
                    <p></p>
                    <p></p>
                    <OpenModalButton
            buttonText="Cancel Order"
            modalComponent={<CancelOrderModal orderId={order.id}/>}
            />
                </>
            ))}
          
        </>
    )
}

export default ViewOrder

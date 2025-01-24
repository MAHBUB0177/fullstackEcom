import { cancelOrdersInfoByUser } from '@/service/allApi';
import React, { useEffect, useState } from 'react'


// Define the type for an individual order item
interface OrderItem {
  id: number; // Replace with the actual type of `id` if different
  productName: string;
  brand: string;
  category: string;
  quantity: number;
  rating: number;
  price: number;
  oldprice: number;
  image: string[]; // Assuming `image` is an array of strings (URLs)
}
const CancelledOrder = () => {
 const [orderInfo, setOrderInfo] = useState<OrderItem[]>([]);
 console.log(orderInfo,'orderInfo======')
    const getConfirmOrderInfo = async () => {
      try {
        const response = await cancelOrdersInfoByUser();
        if (response?.data?.isSuccess) {
          setOrderInfo(response?.data?.item);
        } else {
          console.log("Error:", response?.data?.message);
        }
      } catch (err) {
        console.error("Error fetching order info:", err);
      }
    };
  
    useEffect(() => {
      getConfirmOrderInfo();
    }, []);
  return (
    <div>cancelledOrder order</div>
  )
}

export default CancelledOrder;
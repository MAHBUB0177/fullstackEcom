import { confirmOrdersInfoByUser } from "@/service/allApi";
import React, { useEffect, useState } from "react";
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import NodataFound from "../productFilter/nodataFound";

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

const ConfirmOrder: React.FC = () => {
  // Set the type of `orderInfo` state as an array of `OrderItem`
  const [orderInfo, setOrderInfo] = useState<OrderItem[]>([]);


  const getConfirmOrderInfo = async () => {
    try {
      const response = await confirmOrdersInfoByUser();
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
    <div>
      {orderInfo?.length == 0 ? (
        <>
          <div className=" mx-auto h-[500px] flex justify-center items-center">
            <NodataFound />
          </div>
        </>
      ) : (
        orderInfo?.map((item, index) => (
          <div className="bg-primary shadow-sm mb-3">
            <div className="border-b-[1px] border-slate-200"></div>
            <div className="flex flex-col md:flex-row justify-between pt-2 p-3">
             

              <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-center pb-2 md:pb-0 items-center">
              <div className="w-full  flex justify-center pb-2 md:pb-0 md:justify-start gap-2">
                
                <img
                  src={item?.image[0]}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                  className="rounded-lg"
                  alt={item?.productName}
                />
                <div className="flex justify-center items-center">
                  <div className="text-sm pt-2">
                    <p>{item?.productName}</p>
                    <p>Brand: {item?.brand}</p>
                    <p className="font-semibold">Category:{item?.category}</p>
                  </div>
                </div>
              </div>
                <div className="pt-2">
                  <div className="text-sm flex justify-start gap-2 text-md">
                    Quantity:
                    <p>{item?.quantity}</p>
                  </div>
                  <div className="text-sm flex justify-start gap-2 text-md">
                    Rating:
                    <p>{item?.rating}</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex justify-center pb-2 md:pb-0 items-center">
                <div className="pt-2">
                  <div className="text-sm flex justify-start">
                    <TbCoinTakaFilled className="h-[20px] w-[20px] text-red-400" />
                    <p>{item?.price}</p>
                  </div>
                  <div className="text-sm flex justify-start line-through">
                    <TbCurrencyTaka className="h-[20px] w-[20px] text-red-400" />
                    <p>{item?.oldprice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConfirmOrder;

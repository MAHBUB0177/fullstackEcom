import { RootState } from "@/store";
import React from "react";
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import { useSelector } from "react-redux";
import NodataFound from "../productFilter/nodataFound";

const ActiveOrders = () => {
  const cartList = useSelector((state: RootState) => state.cart.addProducts);

  return (
    <div>
      {cartList?.length == 0 ? (
        <>
          <div className=" mx-auto h-[500px] flex justify-center items-center">
            <NodataFound />
          </div>
        </>
      ) : (
        cartList?.map((item, index) => (
          <div key={item._id} className="bg-primary shadow-sm mb-3">
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
                    <p>{item?.qnty}</p>
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
                    <p>{item?.totalPrice}</p>
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

export default ActiveOrders;

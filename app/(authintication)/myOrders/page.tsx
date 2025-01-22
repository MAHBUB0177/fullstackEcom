'use client'
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { MdOutlinePreview } from "react-icons/md";
import ActiveOrders from "@/components/myOrders/activeOrders";
import ConfirmOrder from "@/components/myOrders/confirmOrder";
import CancelledOrder from "@/components/myOrders/cancelledOrder";
import Review from "@/components/myOrders/review";
const page = () => {
  const menuList = [
    { title: "Active Orders", path: "/myOrders", icon: FaShoppingCart ,state:"ActiveOrders"},
    { title: "Confirm Orders", path: "/profile", icon: FaShoppingCart,state:"ConfirmOrders" },
    { title: "Cancel Orders", path: "", icon: PiWarningCircle,state:"CancelOrders"  },
    { title: "Reviewed", path: "", icon: MdOutlinePreview,state:"Reviewed"  },
  ];
  const [orderState,setOrderState]=useState('ActiveOrders')
  return (
    <div>
      <div className=" mx-auto px-0 py-0 md:px-40 md:py-[50px]  p-3">
        <div className="flex flex-col md:flex-row  justify-between  gap-4">

          <div className="w-full h-auto py-2 md:h-[250px] lg:h-[250px]  md:w-2/6 p-3 bg-primary shadow-2xl  rounded-sm ">
            <div className="border-b-[1px]  border-slate-200">
              <p className="p-3 text-xl font-semibold">My Orders</p>
            </div>
            <div>
              {menuList.map((item, i) => (
                //   <Link href={item?.path} key={i}>
                <p className="px-3 py-2 hover:bg-gray-100  text-slate-500 cursor-pointer flex justify-start gap-2" onClick={()=>setOrderState(item?.state)}>
                  {item.icon && (
                    <item.icon
                      style={{
                        height: "20px",
                        width: "20px",
                        // color: "#FD375C",
                      }}
                      className="text-slate-500"
                    />
                  )}
                  <p>{item?.title}</p>
                </p>
                //   </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-4/6  h-auto bg-white rounded-sm shadow-2xl">
            <div className=" p-3 ">
              {orderState === 'ActiveOrders' ? <>
              <ActiveOrders/></> : orderState === 'ConfirmOrders' ?
              <> <ConfirmOrder/></> :orderState === 'CancelOrders' ? 
            <>
            <CancelledOrder/></> : orderState === 'Reviewed' ?
            <><Review/></>:<></> }
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default page;

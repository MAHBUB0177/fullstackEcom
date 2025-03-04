import { getNextThreeDaysFormatted } from "@/components/common/commonFunction";
import React, { useState } from "react";
import { TbCoinTakaFilled } from "react-icons/tb";
import OrderInfoEdit from "./orderInfoEdit";
import { useSelector } from "react-redux";

interface OrderDetailsInfoProps {
  orderInfo: any;
  cartList: any;
}

interface Order {
  _id: string;
  userId: string;
  name: string;
  phoneNumber: number;
  houseNo: string;
  postalCode: number;
  division: string;
  city: string;
  area: string;
  address: string;
  __v: number;
}

interface ConfirmOrderInfo {
  value: number;
  order: Order;
}

interface OrderinfoState {
  confirmOrderInfo: ConfirmOrderInfo;
}

interface RootState {
  Orderinfo: OrderinfoState;
}

// Use the props in the functional component
const OrderDetailsInfo = ({ orderInfo, cartList }: OrderDetailsInfoProps) => {
  const [open, setOpen] = useState(false);
  const selctedOrderinfo = useSelector(
    (state: RootState) => state.Orderinfo.confirmOrderInfo
  );
  return (
    <>
      <div className=" mb-3  shadow-sm  text-sm">
        <div className="bg-[#FAFAFA] font-semibold p-2 flex justify-between">
          <p> Shipping & Billing</p>
          <p
            className="text-[#1AB4D9] cursor-pointer "
            onClick={() => setOpen(true)}
          >
            EDIT
          </p>
          {open && <OrderInfoEdit open={open} setOpen={setOpen} />}
        </div>
        <div className="flex justify-start gap-2 text-textprimary p-2">
          <p>
            {selctedOrderinfo?.order !== null
              ? selctedOrderinfo?.order?.name
              : orderInfo[0]?.name}
          </p>
          <p>
            {selctedOrderinfo?.order !== null
              ? selctedOrderinfo?.order?.phoneNumber
              : orderInfo[0]?.phoneNumber}
          </p>
        </div>
        <div className="flex justify-start gap-2 text-textprimary px-2 pb-2">
          <p className="bg-orange-500 text-white rounded-md px-2">Home</p>
          <p>
            {selctedOrderinfo?.order !== null
              ? selctedOrderinfo?.order?.address
              : orderInfo[0]?.address}
          </p>
        </div>
      </div>

      <div className=" mb-3  shadow-sm  text-sm">
        <div className="bg-[#FAFAFA] font-semibold p-2">
          Product Information
        </div>
        {cartList?.map((item: any) => (
          <div key={item._id} className="bg-primary shadow-sm mb-3">
            <div className="flex flex-col md:flex-row justify-between pt-2 p-3">
              <div className="w-full md:w-1/3 flex justify-center pb-2 md:pb-0 md:justify-start gap-2">
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
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex justify-center pb-2 md:pb-0 items-center">
                <div className="pt-2">
                  <div className="text-sm flex justify-start">
                    <TbCoinTakaFilled className="h-[20px] w-[20px] text-red-400" />
                    <p>
                      {item?.totalPrice}
                      <span className="text-xs text-red-500">
                        ({item?.qnty}){" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex justify-center pb-2 md:pb-0 items-center gap-3">
                {getNextThreeDaysFormatted()}
                <span className="text-xs text-red-500">(delivery date) </span>
              </div>
            </div>
            <div className="border-b-[1px] border-slate-200"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderDetailsInfo;

import { cancelOrdersInfoByUser } from "@/service/allApi";
import React, { useEffect, useState } from "react";
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import NodataFound from "../productFilter/nodataFound";
import Pagination from "../common/paginate";

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
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const _handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1; // Adjust to 1-based index
    setCurrentPageNumber(selectedPage);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 30,
      behavior: "smooth",
    });
  };
  const [orderInfo, setOrderInfo] = useState<OrderItem[]>([]);
  const getConfirmOrderInfo = async () => {
    try {
      const response = await cancelOrdersInfoByUser(
        currentPageNumber,
        pageSize
      );
      if (response?.data?.isSuccess) {
        setOrderInfo(response?.data?.item);
        setPageCount(response?.data?.totalPage);
      } else {
        console.log("Error:", response?.data?.message);
      }
    } catch (err) {
      console.error("Error fetching order info:", err);
    }
  };

  useEffect(() => {
    getConfirmOrderInfo();
  }, [currentPageNumber]);
  return (
    <div>
      {orderInfo?.length == 0 ? (
        <>
          <div className=" mx-auto h-[500px] flex justify-center items-center">
            <NodataFound />
          </div>
        </>
      ) : (
        <>
          {orderInfo?.map((item, index) => (
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
                        <p className="font-semibold">
                          Category:{item?.category}
                        </p>
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
          ))}
          <div className="pt-5 flex justify-center items-center sticky top-20 z-10 bg-white">
            <Pagination
              pageCount={pageCount}
              forcePage={currentPageNumber - 1} // Adjust for zero-based index
              onPageChange={_handlePageClick}
              scrollToTop={scrollToTop}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CancelledOrder;

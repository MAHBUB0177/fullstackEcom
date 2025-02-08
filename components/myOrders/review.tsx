import { confirmOrdersInfoByUser, getReviewByUserId } from "@/service/allApi";
import React, { useEffect, useState } from "react";
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import NodataFound from "../productFilter/nodataFound";
import Pagination from "../common/paginate";
import moment from "moment";

// Define the type for an individual order item
interface Review {
  _id: string;
  message: string;
  rating: number;
  reviewer_name: string;
  orderedAt: string;
  image: string;
  productId: string;
}

const Review: React.FC = () => {
  // Set the type of `orderInfo` state as an array of `OrderItem`
  const [orderInfo, setOrderInfo] = useState<Review[]>([]);
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

  const getConfirmOrderInfo = async () => {
    try {
      const response = await getReviewByUserId(currentPageNumber,pageSize);
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
      ) :
        <>
          {orderInfo?.map((review, index) => (
            <div className="bg-primary shadow-sm mb-3">


              <div className={`p-4  border-slate-300 border-b-[1px]`}>
                <div className="flex justify-between w-full">
                  <div className="flex items-center   w-5/6">
                    <img
                      src={review.image}
                      alt={review.reviewer_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex justify-start gap-2">
                        <h3 className="font-bold">{review.reviewer_name}</h3>
                        <p className=" text-yellow-500 mb-1">⭐⭐⭐⭐⭐</p>

                      </div>
                      <p className="mt-2">{review.message}</p>

                    </div>
                  </div>

                  <p className="text-sm text-gray-500 w-1/6">
                    {moment(review.orderedAt).format('DD-MMM-YYYY')}
                  </p>

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


      }
    </div>
  );
};

export default Review;

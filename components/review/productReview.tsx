import moment from "moment";
import React from "react";

interface Review {
  _id: string;
  message: string;
  rating: number;
  reviewer_name: string;
  orderedAt: string;
  image: string;
  productId: string;
}

interface ProductReviewProps {
  item: Review[]; // Array of reviews
  details: string; // String description
}

const ProductReview: React.FC<ProductReviewProps> = ({ item, details }) => {
  return (

    <div className="shadow-sm bg-primary rounded-md w-full h-auto border border-slate-100 mt-8 ">
      <div className="bg-gray-300 h-[auto] w-full p-4 ">
        <p>Ratings & Reviews of {details} </p>

      </div>



      {item.map((review,index) => (
        <div className={`p-4  border-slate-300 ${
          index === item.length - 1 ? "border-b-0" : "border-b-[1px]"
        }`}>
          <div className="flex justify-between ">
            <div className="flex items-center space-x-4">
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

            <p className="text-sm text-gray-500">
              {moment(review.orderedAt).format('DD-MMM-YYYY')}
            </p>

          </div>
        </div>
      ))}

    </div>
  );
};

export default ProductReview;

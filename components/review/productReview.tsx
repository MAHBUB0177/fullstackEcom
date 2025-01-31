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

const ProductReview: React.FC<ProductReviewProps> = ({ item,details }) => {
    console.log(details,'details=========')
  return (

    <div className="shadow-sm bg-primary rounded-md w-full h-auto border border-slate-100 mt-8 ">
        <div className="bg-gray-300 h-[50px] w-full p-4 ">
            <p>Ratings & Reviews of {details} </p>

        </div>

   

      {item.map((review) => (
        <div  className="p-4">
          <div className="flex items-center space-x-4">
            <img
              src={review.image}
              alt={review.reviewer_name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold">{review.reviewer_name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(review.orderedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="px-14">
          <p className="mt-2">{review.message}</p>
          <p className="mt-1 text-yellow-500">⭐ {review.rating}</p>
          </div>
        </div>
      ))}
    
    </div>
  );
};

export default ProductReview;

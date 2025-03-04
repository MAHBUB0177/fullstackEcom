import { setAddProducts } from "@/reducer/cartReducer";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { successMessage } from "../common/commonFunction";


interface ProductProps {
  item: Array<any>
}

const Product = ({ item }: ProductProps) => {
  
  const dispatch = useDispatch()
  const router=useRouter()
  const handleOnClick = (id:any) => {
    router.push("/products/" + id);
  };

  const addToCart=(item:any)=>{
    dispatch(setAddProducts(item));
    successMessage('Product Add To Cart');

  }

  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4   gap-4 ">

        <>
          {item?.map((item, i) => (
            <div key={i} className="relative mt-2 flex w-full cursor-pointer   flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" >

              <div className="relative overflow-hidden pt-8 pb-3 px-2 rounded-md " onClick={() => handleOnClick(item?._id)}>
                <img src={item.image[0]} style={{ width: '100%', height: '200px', objectFit: 'contain' }} className="rounded-lg " alt="Description of the image" />

                <div className="absolute bg-secondary text-white rounded-xl p-[2px] top-[3%] left-[5%] px-4">
                  <p className="font-normal text-[12px]">39% OFF</p>
                </div>
              </div>
              
              <div className=" px-3 pb-5">
                <h5 className="text-md tracking-tight text-slate-900">
                  {item?.productName}
                </h5>
                <div className="mt-1 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-lg font-bold text-slate-900">
                      ${item?.price}
                    </span>
                    <span className="text-sm text-slate-900 line-through">
                      ${item?.oldprice ?? 699}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                   
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                   
                    <span className="mr-1 ml-0 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                      {item?.rating ?? 5.0}
                    </span>
                  </div>
                </div>
                <a
                onClick={()=>addToCart(item)}
                  href="#"
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to cart
                </a>
              </div>
            </div>


          
          ))}
        </>
      </div>




    </div>
  );
};

export default Product;

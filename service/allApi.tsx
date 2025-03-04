import axiosInstance from ".";


export const s3URL =
  "https://fstuploaddocument.s3.ap-southeast-1.amazonaws.com/";

export const RegisterUser = (payload:any) => {
  let url = `api/user/register`;
  return axiosInstance.post(url,payload);
};

export const LoginUser = (payload:any) => {
    let url = `api/user/login`;
    return axiosInstance.post(url,payload);
  };


  export const GetCurrentuserInfo = () => {
    let url = `api/user/currenuserinfo`;
    return axiosInstance.get(url);
  };

 export const updateUserInfo=(payload:any)=>{
  let url=`api/user/update`;
  return axiosInstance.put(url,payload);
 }

 export const UserPassChange=(payload:any)=>{
  let url=`api/user/resetPassword`;
  return axiosInstance.put(url,payload);
 }
  export const GetProductInfo = (currentPageNumber: number, pageSize: number) => {
    const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}`;
    http://localhost:500/api/products?name=iphone&select=company,featured
    return axiosInstance.get(url);
};

export const GetSearchProduct = (currentPageNumber: number, pageSize: number, payload: any) => {
  // Convert payload object to query string
  const queryParams = new URLSearchParams(payload).toString();
  const url = `/api/items/getproducts?page=${currentPageNumber}&limit=${pageSize}&${queryParams}`;
  return axiosInstance.get(url);
};

// API call (Update URL to use the path parameter)
export const getProductById = (id: string | number) => {
  const url = `/api/items/fetch/${id}`;  // Using path parameter instead of query parameter
  return axiosInstance.get(url); 
};

export const GetRelatedProduct = ( payload: any) => {
  const queryParams = new URLSearchParams(payload).toString();
  const url = `/api/items/getRelatedProducts?${queryParams}`;
  return axiosInstance.get(url);
};

export const GetAllShops = () => {
  const url = `/api/items/shop/fetch`;
  return axiosInstance.get(url);
};

export const getShopsById = (id: string | number) => {
  const url = `/api/items/shop/fetchbyid/${id}`;  // Using path parameter instead of query parameter
  return axiosInstance.get(url); 
};

export const getAllDivison=()=>{
  const url=`/api/cart/division/fetch`
  return axiosInstance.get(url)
}

export const getCityByDivision=(division:string)=>{
  const url=`/api/cart/city/fetchByType?division=${division}`
  return axiosInstance.get(url)
}

export const getAreaByCity=(city:string)=>{
  const url=`/api/cart/area/fetchByType?city=${city}`
  return axiosInstance.get(url)
}

export const createOrder=(payload:any)=>{
  const url=`/api/cart/orders`
  return axiosInstance.post(url,payload)
}
export const getOrderInfo=()=>{
  const url=`/api/cart/orders/fetch`
  return axiosInstance.get(url)
}

export const confirmOrder=(payload:any)=>{
  const url=`/api/cart/orders/confrim`
  return axiosInstance.post(url,payload)
}


export const cancelOrder=(payload:any)=>{
  const url=`/api/cart/orders/cancel`
  return axiosInstance.post(url,payload)
}


export const getCategoryByName=(productName:string)=>{
  const url=`/api/items/category/fetchByType?productName=${productName}`
  return axiosInstance.get(url)
}

export const getBrandByName=(productName:string)=>{
  const url=`/api/items/brand/fetchByType?productName=${productName}`
  return axiosInstance.get(url)
}


export const confirmOrderPayment=(payload:any)=>{
  const url=`/api/cart/orders/confrim/create-checkout-session`
  return axiosInstance.post(url,{payload})
}
export const getBgImage=()=>{
  const url=`/api/bgimage/getAllBgIMage`
  return axiosInstance.get(url)
}

export const createMyContact=(payload:any)=>{
  const url=`/api/contact/create`
  return axiosInstance.post(url,payload)
}

export const confirmOrdersInfoByUser=(currentPageNumber: number, pageSize: number,)=>{
  const url=`/api/cart/orders/confrimOrdersInfoByUser?page=${currentPageNumber}&limit=${pageSize}`
  return axiosInstance.get(url)
}

export const cancelOrdersInfoByUser=(currentPageNumber: number, pageSize: number,)=>{

  // const queryParams = new URLSearchParams(payload).toString();
  const url = `/api/cart/orders/cancelOrdersInfoByUser?page=${currentPageNumber}&limit=${pageSize}`;
  return axiosInstance.get(url);
}

export const createMyReview=(payload:any)=>{
  const url=`/api/review/create`
  return axiosInstance.post(url,payload)
}

export const getReviewById=(productId:string | number)=>{
  const url=`/api/review/fetchById?productId=${productId}`
  return axiosInstance.get(url)
}

export const getReviewByUserId=(currentPageNumber: number, pageSize: number,)=>{
  const url=`/api/review/fetchByUserId?page=${currentPageNumber}&limit=${pageSize}`
  return axiosInstance.get(url)
}

'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import profilePic from '@/assets/images/logo/airbnb-logo.png'
import { BsCart3 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import Link from 'next/link';
import { Badge } from 'antd';
import { SketchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchData } from '@/reducer/searchReducer';
// import { RootState } from '@/store';
import { setAuth, setAuthUser } from '@/reducer/authReducer';
import { GetCurrentuserInfo } from '@/service/allApi';
import { signOut, useSession } from 'next-auth/react';
import CustomButton from '../common/customButton';
import { usePathname, useRouter } from 'next/navigation';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { RootState } from '@/store';
import SmallDeviceHeader from './smallDeviceHeader';




export interface UserType {
  email: string;
  name: string;
}
export interface AuthDataType {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}

export interface UserType {
  email: string;
  name: string;
  _id: string; // Ensure the id matches the actual field in your data
}

const menuList = [
  { title: 'My Orders', path: '/myOrders' },
  // { title: 'Old Orders', path: '' },
  { title: 'Profile', path: '/profile' },
  { title: 'Logout', path: '' },
]




const Rootheader = () => {
  const pathname = usePathname()

  const searchData = useSelector((state: RootState) => state.search.search)
  const cartList = useSelector((state: RootState) => state.cart.addProducts)
 
  
  const [show, setShow] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const authUserData = useSelector((state: RootState) => state.auth.authUser) as UserType
  const authData = useSelector((state: RootState) => state.auth.authData) as AuthDataType
  const { data: session, status: sessionStatus } = useSession();
  const handelLogout = () => {
    dispatch(setAuth({}))
    dispatch(setAuthUser({}))
    signOut({ callbackUrl: "/" });
  }

  const handleItemClick = (title: string) => {
    setShow(false)
    if (title === "Logout") {
      handelLogout()
    } else {
      return;
    }
  };



  const [searchTerm, setSearchTerm] = useState<string>('');
  console.log(searchTerm,'searchTerm===')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchData(searchTerm));
    router.push('/search')
  };

 

  useEffect(() => {
    if (pathname !== '/search') {
      dispatch(setSearchData(''));
      setSearchTerm(''); 
    }
  }, [pathname, dispatch]);

  const clearState=()=>{
    setSearchTerm('');
    dispatch(setSearchData(''))
  }


  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (sessionStatus === 'authenticated') {
      router.push('/orders'); 
    } else {
      // Manually construct the URL with query parameters
      const loginUrl = `/auth?callbackUrl=/orders`;
      router.push(loginUrl);
    }
  };

  useEffect(() => {
    if (searchTerm.length === 0) {
      clearState(); // Call your clearState function when searchTerm is empty
    }
  }, [searchTerm]);

  return (
    <div className='bg-primary  w-full z-50 fixed shadow-sm p-5 px-4 lg:px-20'>
      <div className='hidden md:block'>
      <div className='  flex justify-between items-center'>
        <Link href={'/'}>
          <div className='flex gap-1'>
            <Image
              src={profilePic}
              alt="Picture of the author"
              className='h-[30px] w-[30px] cursor-pointer'
            />
            <p className='text-xl text-red-500 font-bold pt-1'>TrendyCart</p>
          </div>
        </Link>

        <div className="flex justify-start">
          <form className="flex flex-col md:flex-row gap-3" onSubmit={handleSubmit}>
            <div className="flex items-center">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search for Category, Brand, Name"
                  className="w-full px-3 h-10 rounded-l border-2 border-secondary focus:outline-none focus:border-secondary pr-10"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm !== '' ? searchTerm : searchData || ''}
                />


                {(searchTerm || searchData) && (
                  <button
                    type="button"
                    onClick={clearState}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <IoMdCloseCircleOutline className="text-secondary h-[20px] w-[20px]" />
                  </button>
                )}

              </div>

              <button type="submit" className="bg-secondary text-white rounded-r px-3 md:px-4 py-1 md:py-2">
                Search
              </button>
            </div>

          </form>
        </div>

        <div className="flex justify-start gap-7 pt-1 ">
         
            <div className="cursor-pointer text-lg pt-2 font-base flex justify-between gap-1 text-slate-900" onClick={handleLinkClick}>
              <Badge count={cartList?.length}>
                <BsCart3 className='h-[20px] w-[20px] font-semibold' />
              </Badge>
            </div>
          



          {sessionStatus == 'authenticated' ? (
            <>
              <p className="flex justify-center items-center cursor-pointer text-normal h-[35px] w-[35px] font-semibold rounded-full bg-secondary text-white pt-0"
                onClick={() => setShow(!show)}>
                {authUserData?.name?.charAt(0).toUpperCase()}
              </p>{" "}
            </>
          ) : (
            <div className='flex justify-between gap-2'>
              <Link href={'/auth'} >
                <button
                  className={"w-20 text-sm p-[6px] font-semibold border hover:bg-red-200 border-red-500  text-secondary rounded-md hover:scale-105 duration-300"}
                >
                  Sign in

                </button>
              </Link>

              <Link href={'/signup'} >
                <CustomButton
                  btnName="Sign up"
                  size={"w-20 text-sm p-[6px] font-semibold bg-secondary"}
                />
              </Link>
            </div>


          )}


        </div>
        {show &&
          <div
            className="bg-primary shadow-md rounded-md h-auto w-[40%] md:w-[25%] lg:w-[15%] fixed right-10 top-20 px-4 border-[1px] border-slate-200"
            style={{ zIndex: 1000 }}
          >
            <div className='flex justify-start gap-2'>
              <p className="mt-5 flex justify-center items-center cursor-pointer text-normal h-[25px] w-[25px] font-semibold rounded-full bg-secondary text-white pt-1"
                onClick={() => setShow(!show)}>
                {authUserData?.name?.charAt(0).toUpperCase()}
              </p>
              <p className='pt-5'> {authUserData?.name}</p>

            </div>

            <div className='flex justify-start gap-2  border-2 border-orange-300 mt-3 rounded-md p-2 bg-orange-100'>
              <SketchOutlined
                className="h-[30px] w-[30px]  text-orange-400"
                style={{ fontSize: "200%" }}
              />
              <p className='text-orange-400'>0 points</p>
            </div>

            {menuList.map((item, i) => (
              <Link href={item?.path} key={i}>
                <p
                  key={i}
                  className={`py-1 cursor-pointer ${item?.title === "Sign Up"
                    ? "border-b-[1px] border-slate-400"
                    : ""
                    }`}
                  onClick={() => handleItemClick(item.title)}
                >
                  {item?.title}
                </p>
              </Link>
            ))}
          </div>}

      </div>
      </div>

      <div className='md:hidden'>
        <SmallDeviceHeader handleItemClick={handleItemClick} menuList={menuList} setSearchTerm={setSearchTerm} searchTerm={searchTerm} handleSubmit={handleSubmit} searchData={searchData} clearState={clearState} handleLinkClick={handleLinkClick}/>

      </div>
    </div>
  )
}

export default Rootheader
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { MdOutlinePreview } from "react-icons/md";
const page = () => {
  const menuList = [
    { title: "Active Orders", path: "/myOrders", icon: FaShoppingCart },
    { title: "Confirm Orders", path: "/profile", icon: FaShoppingCart },
    { title: "Cancel Orders", path: "", icon: PiWarningCircle },
    { title: "Reviewed", path: "", icon: MdOutlinePreview },
  ];
  return (
    <div>
      <div className=" mx-auto max-w-screen-xl py-[100px]  p-3">
        <div className="flex flex-col md:flex-row  justify-between  gap-2">

          <div className="w-full h-auto py-2 md:h-[250px] lg:h-[250px] md:w-2/6 p-3 bg-primary shadow-2xl  rounded-sm ">
            <div className="border-b-[1px]  border-slate-200">
              <p className="p-3 text-xl font-semibold">My Orders</p>
            </div>
            <div>
              {menuList.map((item, i) => (
                //   <Link href={item?.path} key={i}>
                <p className="px-3 py-2 hover:bg-gray-100  text-slate-500 cursor-pointer flex justify-start gap-2">
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

          <div className="w-full md:w-4/6  h-[400px] bg-white rounded-sm shadow-2xl">
            <div className=" p-3 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              porro nam est vitae molestiae dolores aspernatur eos, ducimus
              quisquam, accusantium quod dolore quidem tenetur laudantium ad
              debitis. Eos, dolores corrupti?
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default page;

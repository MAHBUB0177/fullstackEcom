import React from "react";
import CustomInput from "../common/CustomInput";
import { Form } from "antd";

// Define the types for props
interface UserData {
  name: string;
  email: string;
  image?: File | string;
}

interface EditFormProps {
  userData: UserData;
  handleInputChange: (value: string | File, fieldName: keyof UserData) => void;
  setLoading: (loading: any) => void;
  // handleInputChange: (value: string, fieldName: keyof UserData) => void;
}
const EditForm = ({ userData, handleInputChange,setLoading }: EditFormProps) => {

   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
        
          const formData = new FormData();
          formData.append("image", file);
          try {
            setLoading(true);
            const response = await fetch("https://node-express-hostapi.vercel.app/api/user/uploadProfile", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            if (data.isSuccess) {
              handleInputChange(data.image, "image");
              setLoading(false);
            } else {
              console.error("File upload failed:", data.message);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error uploading file:", error);
            setLoading(false);
          }
        };
        

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your FullName",
              },
            ]}
          >
            <CustomInput
              type="text"
              labelText={"Full Name"}
              value={userData?.name}
              onChange={(e) => handleInputChange(e.target.value, "name")}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email",
              },
            ]}
          >
            <CustomInput
              type="text"
              labelText={"Email"}
              value={userData?.email}
              onChange={(e) => handleInputChange(e.target.value, "email")}
            />
          </Form.Item>
        </div>

        <div className="col-span-1 flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="file:bg-primary file:px-4 file:py-2 file:text-gray-400 rounded-md file:cursor-pointer border border-slate-400 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;

import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;  // Optional size prop for custom styling
  btnName: string; // Required btnName prop for button text
  type?: 'button' | 'submit' | 'reset'; 
  bg?: string;  // Optional bg prop for custom background styling
  disabled?: boolean; // Optional disabled prop
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  size, 
  bg, 
  btnName, 
  type = 'button', // Default type is 'button'
  disabled = false, // Default disabled is false
  ...rest 
}) => {
  return (
    <button
      {...rest}
      disabled={disabled} // Use the correct `disabled` prop
      type={type}
      className={`${
        size ? size : "w-full mt-6 px-4"
      } ${bg ? bg : "bg-secondary"} shadow-shadow-glow text-white text-custom-size rounded-md
        hover:scale-105 duration-300 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
    >
      {btnName}
    </button>
  );
};

export default CustomButton;

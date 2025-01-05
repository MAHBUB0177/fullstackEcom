// authUtils.ts
// import { RootState } from "@/store";
// import { store } from "@/store"; // Ensure you export your store properly

// export const getAuthData = (): AuthDataType | null => {
//   const state = store.getState() as RootState;
//   return state.auth.authData || null;
// };


import { RootState } from "@/store";
import { store } from "@/store"; // Ensure you export your store properly


 interface AuthDataType {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiration: string;
    tokenExpiration: string;
  }
  
export const getAuthData = (): AuthDataType | null => {
    const state = store.getState(); // Access Redux store directly
      const authData = state.auth.authData as AuthDataType;
  
  return authData;
};

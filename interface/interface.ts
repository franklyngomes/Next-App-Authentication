export interface Product {
    _id: string;
    name: string;
    category: string;
    description: string;
  }
  export interface IResetPassword {
    user_id: string;
    password: string;
  }
  export interface ISignin {
    email: string;
    password: string;
  }
  export interface ISignup {
    name: string;
    email: string;
    password: string;
  }
  export interface IVerifyOtp {
    email: string;
    otp: number;
  }
  export interface ICreate{
    name: string;
    price: number;
    description: string;
    category: string;
  }
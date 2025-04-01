export interface LoginValidation {
    email: string;
    password: string;
  }
   
  export interface SignUpValidation {
    email: string;
    password: string;
  }
  
  export interface AuthSignature {
    id: string;
    email: string | null;
  }
import { GoogleLogin } from '@react-oauth/google';

const SignInComponent = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* <button>sign in with google</button> */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      
    </div>
  );
};

export default SignInComponent;

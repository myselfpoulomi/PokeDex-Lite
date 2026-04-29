import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { parseGoogleCredential, setSession } from "../../utils/session";

export default function LoginPage() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1F1611] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/20 p-10 shadow-2xl flex flex-col items-center">

       
        <div className="flex flex-col items-center mb-8">
         

          <h1 className="text-3xl font-bold text-center">
            Welcome to Pokédex
          </h1>

          <p className="text-white/60 text-sm text-center mt-2 max-w-sm">
            Explore Pokémon, save your favorites, and discover detailed stats,
            abilities, and moves all in one beautiful place.
          </p>
        </div>

     
        <div className="w-full flex items-center gap-3 mb-6">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-white/40 text-sm">LOGIN</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

    
        {!clientId ? (
          <p className="text-center text-white/70 text-sm">
            Set{" "}
            <span className="text-[#D4A569] font-mono text-xs">
              VITE_GOOGLE_CLIENT_ID
            </span>{" "}
            in a{" "}
            <span className="text-[#D4A569] font-mono text-xs">
              .env
            </span>{" "}
            file for Google sign-in.
          </p>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const cred = credentialResponse.credential;
              if (cred) {
                setSession(parseGoogleCredential(cred));
                navigate("/", { replace: true });
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            theme="filled_black"
            size="large"
            text="signin_with"
            shape="pill"
          />
        )}

       
        <p className="text-xs text-white/40 text-center mt-8">
          Secure login powered by Google
        </p>
      </div>
    </div>
  );
}
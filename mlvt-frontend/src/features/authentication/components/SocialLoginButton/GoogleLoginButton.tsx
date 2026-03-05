import SocialLoginButton from "./SocialLoginButton";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        console.log("Google login clicked");
        // Add Google login logic here
    };

    return (
        <SocialLoginButton
            icon={
                <GoogleIcon
                    style={{
                        verticalAlign: "middle",
                        fontSize: "1.7rem",
                        fontFamily: "Poppins, sans-serif",
                        color: "#B8001F",
                    }}
                />
            }
            label="Sign in with Google"
            onClick={handleGoogleLogin}
        />
    );
};

export default GoogleLoginButton;

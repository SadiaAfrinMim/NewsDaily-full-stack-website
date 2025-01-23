import { Helmet } from "react-helmet-async";
import Navbar from "../../SharedStyle/Navbar";
import NewspaperFooter from "../../SharedStyle/NewspaperFooter";
import { Link } from "lucide-react";

const Error = () => {
  return (
    <>
      <Navbar />
      
      <div className="flex m-12 mx-auto flex-col items-center justify-center w-full space-y-6 px-4">
        {/* <Helmet>
          <title>Error || CollabStudy</title>
        </Helmet> */}
        
        {/* Container with consistent width */}
        <div className="w-full max-w-2xl">
          {/* Background image */}
          <img
            className="w-full object-cover rounded-lg"
            src="https://i.ibb.co.com/Y02kQsR/istockphoto-500639166-1024x1024-1.jpg"
            alt="404 Error: Page not found"
          />

          {/* Content */}
          <div className="text-center w-full mt-4">
            <Link
              to="/"
              className="w-full block btn text-white bg-red-600 hover:bg-red-700"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
      
      <NewspaperFooter />
    </>
  );
};

export default Error;

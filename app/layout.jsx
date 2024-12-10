import Navbar from "@/components/Navbar"
import AuthProvider from "@/components/AuthProvider"
import "@/assets/styles/globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Footer from "@/components/Footer"
import { GlobalProvider } from "@/context/GlobalContext"
//FOR SEO we set up out metadata
export const metadata = {
    title: "PropertyPules | Find The Perfect Rental",
    description: "Find Your Dream Rental Property",
    keywords: "rental, find rentals, find properties"
}
//this children prop is for nested routes....
const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html lang='en'>
                    <body>
                        <main>
                            <Navbar />
                            {children}
                        </main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    )
}

export default MainLayout


// we put things here that is supposed to be shownm on every page
//this is the entire applcaiton, this is sth like index.html in the React
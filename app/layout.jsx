import Navbar from "@/components/Navbar"
import AuthProvider from "@/components/AuthProvider"
import "@/assets/styles/globals.css"
import Footer from "@/components/Footer"
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
            <html lang='en'>
                <body>
                    <main>
                        <Navbar />
                        {children}
                    </main>
                    <Footer />
                </body>
            </html>
        </AuthProvider>
    )
}

export default MainLayout


// we put things here that is supposed to be shownm on every page
//this is the entire applcaiton, this is sth like index.html in the React
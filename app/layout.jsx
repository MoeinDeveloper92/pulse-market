import Navbar from "@/components/Navbar"
import "@/assets/styles/globals.css"
import Footer from "@/components/Footer"

export const metadata = {
    title: "PropertyPules | Find The Perfect Rental",
    description: "Find Your Dream Rental Property",
    keywords: "rental, find rentals, find properties"
}
const MainLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <main>
                    <Navbar />
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}

export default MainLayout


// we put things here that is supposed to be shownm on every page
//this is the entire applcaiton, this is sth like index.html in the React
import "@/assets/styles/globals.css"
export const metadata = {
    title: "PropertyPules | Find The Perfect Rental",
    description: "Find Your Dream Rental Property",
    keywords: "rental, find rentals, find properties"
}
const MainLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div>
                    {children}
                </div>
            </body>
        </html>
    )
}

export default MainLayout

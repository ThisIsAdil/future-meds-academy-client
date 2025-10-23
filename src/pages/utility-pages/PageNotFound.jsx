import { Link } from "react-router-dom"
const PageNotFound = ({ redirect }) => {
    return (
        <div className="text-center px-8 py-[15vh] w-screen">
            <h3 className="text-xl font-semibold mb-4 text-(--accent-dark)">
                Sorry, page not found!
            </h3>
            <p className="text-gray-700 max-w-md mx-auto">
                Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.
            </p>
            <Link to={redirect.path} className="animated-button inline-block mt-16">
                <span className="label">
                    Go to {redirect.label}
                </span>

            </Link>
        </div>
    )
}

export default PageNotFound
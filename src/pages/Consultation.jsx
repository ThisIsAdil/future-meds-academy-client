import { useState } from "react";
import { Link } from "react-router-dom";

export default function Consultation() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call your backend API here
        setSubmitted(true);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">

            {!submitted ? (
                <div className="max-w-md w-full bg-white border border-gray-100 p-8 rounded-xl shadow-xl">
                    <h1 className="text-2xl font-bold text-center mb-2 text-(--accent-dark)">Book Your Free Consultation</h1>
                    <p className="text-center text-gray-400 mb-6">
                        Fill in the form below and our team will reach out shortly.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                        <input type="text" placeholder="Full Name" required
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300" />

                        <input type="tel" placeholder="Phone / WhatsApp" required
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300" />

                        <input type="email" placeholder="Email (optional)"
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300" />

                        <input type="datetime-local" required
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300" />

                        <select required
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300">
                            <option value="">Consultation About</option>
                            <option>IMAT Prep</option>
                            <option>Study Abroad</option>
                            <option>Visa Guidance</option>
                            <option>IELTS / English</option>
                            <option>Other</option>
                        </select>

                        <button type="submit"
                            className="animated-button">
                            <span className="label">
                                Request Callback
                            </span>
                        </button>
                    </form>
                </div>
            ) : (
                <div className="text-center p-6 rounded-lg">
                    <p className="text-lg font-semibold text-green-700 flex items-center gap-2">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                        </span>
                        Thank you! We’ve received your request.
                    </p>
                    <p className="text-gray-400 mt-2 mb-8">Our team will contact you soon.</p>
                    <Link to={"/"} className="animated-button">
                        <span className="label">Back to Home</span>
                    </Link>
                </div>
            )}
        </div>
    );
}

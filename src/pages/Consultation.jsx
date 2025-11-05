import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { consultationService } from "../services/consultation";

const formInitialState = {
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    consultationAbout: "",
};

function getLocalDateTimeMin() {
    const now = new Date();
    // ensure "future" — set minimum to one minute ahead to avoid race with current moment
    now.setMinutes(now.getMinutes() + 1);
    const tzOffset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - tzOffset * 60000);
    return local.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
}

export default function Consultation() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const [minDate, setMinDate] = useState(getLocalDateTimeMin());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // update minDate every 30s so user can't pick past time if page stays open
        const id = setInterval(() => setMinDate(getLocalDateTimeMin()), 30000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        // live-validate when form changes
        setErrors(validateForm(form, minDate));
    }, [form, minDate]);

    function validateForm(values, minDateValue) {
        const e = {};
        if (!values.fullName.trim()) e.fullName = "Full name is required";
        if (!values.phone.trim()) e.phone = "Phone / WhatsApp is required";
        if (!values.preferredDate) e.preferredDate = "Preferred date & time is required";
        else {
            // compare as Date objects (preferredDate from input is local)
            const selected = new Date(values.preferredDate);
            const min = new Date(minDateValue);
            if (selected <= min) e.preferredDate = "Please choose a future date and time";
        }
        if (!values.consultationAbout) e.consultationAbout = "Please select a topic";
        if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email";
        return e;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateForm(form, minDate);
        setErrors(validation);
        if (Object.keys(validation).length > 0) return;

        setLoading(true);
        try {
            await consultationService.create(form);
            setSubmitted(true);
            setForm(formInitialState);
        } catch (error) {
            console.error("Error creating consultation:", error);
            // show a simple error message
            setErrors({ submit: "Something went wrong. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            {!submitted ? (
                <div className="max-w-md w-full bg-white border border-gray-100 p-8 rounded-xl shadow-xl">
                    <h1 className="text-2xl font-bold text-center mb-2 text-(--accent-dark)">Book Your Free Consultation</h1>
                    <p className="text-center text-gray-400 mb-6">
                        Fill in the form below and our team will reach out shortly.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                        <label className="sr-only" htmlFor="fullName">Full Name</label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300"
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            aria-invalid={!!errors.fullName}
                            aria-describedby={errors.fullName ? "fullName-error" : undefined}
                        />
                        {errors.fullName && <div id="fullName-error" className="text-sm text-red-600">{errors.fullName}</div>}

                        <label className="sr-only" htmlFor="phone">Phone / WhatsApp</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Phone / WhatsApp"
                            required
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && <div id="phone-error" className="text-sm text-red-600">{errors.phone}</div>}

                        <label className="sr-only" htmlFor="email">Email (optional)</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email (optional)"
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && <div id="email-error" className="text-sm text-red-600">{errors.email}</div>}

                        <label className="sr-only" htmlFor="preferredDate">Preferred Date & Time</label>
                        <input
                            id="preferredDate"
                            name="preferredDate"
                            type="datetime-local"
                            required
                            min={minDate}
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300"
                            value={form.preferredDate}
                            onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                            aria-invalid={!!errors.preferredDate}
                            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                        />
                        {errors.preferredDate && <div id="preferredDate-error" className="text-sm text-red-600">{errors.preferredDate}</div>}

                        <label className="sr-only" htmlFor="consultationAbout">Consultation About</label>
                        <select
                            id="consultationAbout"
                            name="consultationAbout"
                            required
                            className="w-full p-3 rounded-lg bg-(--accent-light) text border border-gray-300"
                            value={form.consultationAbout}
                            onChange={(e) => setForm({ ...form, consultationAbout: e.target.value })}
                            aria-invalid={!!errors.consultationAbout}
                            aria-describedby={errors.consultationAbout ? "consultationAbout-error" : undefined}
                        >
                            <option value="">Consultation About</option>
                            <option>IMAT Prep</option>
                            <option>Study Abroad</option>
                            <option>Visa Guidance</option>
                            <option>IELTS / English</option>
                            <option>Other</option>
                        </select>
                        {errors.consultationAbout && <div id="consultationAbout-error" className="text-sm text-red-600">{errors.consultationAbout}</div>}

                        {errors.submit && <div className="text-sm text-red-600">{errors.submit}</div>}

                        <button
                            type="submit"
                            className="animated-button"
                            disabled={loading || Object.keys(errors).length > 0}
                            aria-busy={loading}
                        >
                            <span className="label">{loading ? "Sending..." : "Request Callback"}</span>
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

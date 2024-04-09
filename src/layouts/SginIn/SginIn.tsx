import { useState } from "react";
import { Link } from "react-router-dom";

export const SignIn = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        password: "",
        email: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Check if any field is empty
        if (!formData.firstname || !formData.lastname || !formData.password || !formData.email) {
            setErrorMessage("Please fill out all fields.");
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Failed to register user");
            }
            setFormData({
                firstname: "",
                lastname: "",
                password: "",
                email: ""
            });
            setSuccessMessage("Registration successful!");
            // Handle success, e.g., redirect to login page
            setErrorMessage(""); // Clear error message
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-3 mb-3">
            <div className="row">
                <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-3 border rounded p-4 mt-2 shadow">
                    <h3 className="text-center m-4 register">Register User</h3>
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                        
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">First Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Last Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your email address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <Link to="/login" className="link-style">Already have an account?</Link>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn main-color text-white">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/user` ,{
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
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ width: "900px" }} className="container mt-3 mb-3">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h3 className="text-center m-4 register">Register User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ fontSize: "1.1rem" }}>First Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                style={{ height: "45px" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label" style={{ fontSize: "1.1rem" }}>Last Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                style={{ height: "45px" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ fontSize: "1.1rem" }}>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ height: "45px" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ fontSize: "1.1rem" }}>Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your email address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ height: "45px" }}
                            />
                        </div>
                        <Link to="/login" className="link-style">Already have an account?</Link>
                        {successMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            {successMessage}
                        </div>
                    )}
                        <div className="mt-3 d-flex justify-content-center align-items-center">
                            <button type="submit" className="btn main-color text-white" style={{ width: "300px", height: "50px" }}>
                                Register
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

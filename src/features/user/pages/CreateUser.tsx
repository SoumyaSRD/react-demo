import { useState } from "react";

const CreateUser = ({ onSubmit, initialValue = {
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    password: "",
} }: any) => {
    let [formData, setFormData] = useState(initialValue);

    return (
        <form
            id="BookPackageForm"
            onSubmit={(e: any) => {
                e.preventDefault();
                onSubmit(formData);
            }}
        >
            <div className="mb-4">
                <label className="form-label small fw-bold text-muted-custom ms-1">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    className="form-control glass-input"
                    placeholder="Enter username"
                    onChange={(e) =>
                        setFormData((data: any) => {
                            return {
                                ...data,
                                username: e.target.value,
                            };
                        })
                    }
                />
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <label className="form-label small fw-bold text-muted-custom ms-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        className="form-control glass-input"
                        placeholder="John"
                        onChange={(e) =>
                            setFormData((data: any) => {
                                return {
                                    ...data,
                                    firstName: e.target.value,
                                };
                            })
                        }
                    />
                </div>
                <div className="col-md-6 mb-4">
                    <label className="form-label small fw-bold text-muted-custom ms-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        className="form-control glass-input"
                        placeholder="Doe"
                        onChange={(e) =>
                            setFormData((data: any) => {
                                return {
                                    ...data,
                                    lastName: e.target.value,
                                };
                            })
                        }
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="form-label small fw-bold text-muted-custom ms-1">
                    Age
                </label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    className="form-control glass-input"
                    placeholder="25"
                    onChange={(e) =>
                        setFormData((data: any) => {
                            return {
                                ...data,
                                age: e.target.value,
                            };
                        })
                    }
                />
            </div>
            <div className="mb-2">
                <label className="form-label small fw-bold text-muted-custom ms-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className="form-control glass-input"
                    placeholder="••••••••"
                    onChange={(e) =>
                        setFormData((data: any) => {
                            return {
                                ...data,
                                password: e.target.value,
                            };
                        })
                    }
                />
            </div>
        </form>
    );
};

export default CreateUser;

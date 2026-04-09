import { useState } from "react";

const CreateUser = ({ onSubmit, initialValue = {
    username: "",
    name: "",
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
            <div className="mb-4">
                <label className="form-label small fw-bold text-muted-custom ms-1">
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="form-control glass-input"
                    placeholder="John Doe"
                    onChange={(e) =>
                        setFormData((data: any) => {
                            return {
                                ...data,
                                name: e.target.value,
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

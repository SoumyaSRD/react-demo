import { useState } from "react";

const CreateUser = ({ onSubmit, initialValue = {
    email: "",
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
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                    Email
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        className="form-control-plaintext"
                        id="staticEmail"
                        placeholder="email@example.com"
                        onChange={(e) =>
                            setFormData((data: any) => {
                                return {
                                    ...data,
                                    email: e.target.value,
                                };
                            })
                        }
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                    Name
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        name="username"
                        value={formData.name}
                        className="form-control-plaintext"
                        id="staticEmail"
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
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                    Password
                </label>
                <div className="col-sm-10">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        className="form-control"
                        id="inputPassword"
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
            </div>
            <div className="mb-3 row">
                <button className="btn btn-sm" type="submit">
                    Save
                </button>
            </div>
        </form>
    );
};

export default CreateUser;

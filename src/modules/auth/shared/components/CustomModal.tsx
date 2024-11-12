import React, { useEffect } from "react";

// Button properties interface for customizing button text and colors
export interface IButtonProperties {
    closeButtonText?: string; // Custom text for Close button
    saveButtonText?: string; // Custom text for Save button
    closeButtonColor?: string; // Custom color for Close button (e.g., "btn-danger")
    saveButtonColor?: string; // Custom color for Save button (e.g., "btn-success")
}

// Default button properties
export const InitialButtonProperties: IButtonProperties = {
    closeButtonText: "Close",
    saveButtonText: "Save Changes",
    closeButtonColor: "btn-secondary",
    saveButtonColor: "btn-primary",
};

interface CustomModalProps {
    show: boolean; // Show or hide the modal
    onHide: (data?: any) => void; // Callback when modal is closed
    title: string; // Title of the modal
    children: React.ReactNode; // Modal content
    footer?: React.ReactNode; // Optional footer to override default buttons
    data?: any; // Data to pass when saving
    buttonProperties?: IButtonProperties; // Custom button properties (optional)
}

const CustomModal: React.FC<CustomModalProps> = ({
    show,
    onHide,
    title,
    children,
    footer,
    data,
    buttonProperties = InitialButtonProperties, // Default value for buttonProperties
}: CustomModalProps) => {

    // Effect to handle modal visibility and aria-hidden attribute
    useEffect(() => {
        const modal = document.getElementById("customModal") as HTMLElement;
        if (modal) {
            if (show) {
                modal.classList.add("show");
                modal.style.display = "block";
                modal.setAttribute("aria-hidden", "false");
            } else {
                modal.classList.remove("show");
                modal.style.display = "none";
                modal.setAttribute("aria-hidden", "true");
            }
        }
    }, [show]); // Dependency array ensures this runs when `show` changes

    return (
        <div
            id="customModal"
            key={Math.random() * 1000}
            className={`modal fade ${show ? "show" : ""}`}
            tabIndex={-1}
            aria-labelledby="customModalLabel"
            aria-hidden={show ? "false" : "true"} // Correctly set aria-hidden to "true" or "false"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="customModalLabel">
                            {title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => onHide(false)} // Trigger onHide with false for Close
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        {footer ? (
                            footer
                        ) : (
                            <div className="d-flex">
                                <button
                                    type="button"
                                    className={`btn btn-sm me-1 ${buttonProperties.closeButtonColor}`}
                                    onClick={() => onHide(false)} // Close button triggers onHide with false
                                >
                                    {buttonProperties.closeButtonText}
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${buttonProperties.saveButtonColor}`}
                                    onClick={() => onHide(data)} // Save button triggers onHide with optional data
                                >
                                    {buttonProperties.saveButtonText}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;

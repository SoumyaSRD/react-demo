import React, { useEffect } from "react";

export interface IButtonProperties {
    closeButtonText?: string;
    saveButtonText?: string;
    closeButtonColor?: string;
    saveButtonColor?: string;
}

export const InitialButtonProperties: IButtonProperties = {
    closeButtonText: "Cancel",
    saveButtonText: "Save Changes",
    closeButtonColor: "btn-glass-secondary",
    saveButtonColor: "btn-glass-primary",
};

interface CustomModalProps {
    id: string;
    show: boolean;
    onHide: (data?: any) => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    data?: any;
    buttonProperties?: IButtonProperties;
}

const CustomModal: React.FC<CustomModalProps> = ({
    show,
    onHide,
    title,
    children,
    footer,
    buttonProperties = InitialButtonProperties,
}: CustomModalProps) => {

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    if (!show) return null;

    return (
        <>
            <div 
                className="modal show d-block p-4" 
                tabIndex={-1} 
                role="dialog"
                onClick={() => onHide(false)}
                style={{ zIndex: 1060 }}
            >
                <div 
                    className="modal-dialog modal-dialog-centered" 
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content glass-card border-0 shadow-lg overflow-hidden text-main" style={{ borderRadius: '28px' }}>
                        <div className="modal-header border-0 py-4 px-4 align-items-center bg-white bg-opacity-5">
                            <h5 className="modal-title fw-bold-custom m-0" style={{ fontSize: '1.2rem' }}>
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close shadow-none"
                                aria-label="Close"
                                onClick={() => onHide(false)}
                            ></button>
                        </div>
                        <div className="modal-body px-4 py-4">{children}</div>
                        <div className="modal-footer border-0 px-4 pb-4 pt-0">
                            {footer ? (
                                footer
                            ) : (
                                <div className="d-flex gap-3 w-100 mt-2">
                                    <button
                                        type="button"
                                        className={`btn flex-grow-1 py-2 fw-bold rounded-3 ${buttonProperties.closeButtonColor || InitialButtonProperties.closeButtonColor}`}
                                        onClick={() => onHide(false)}
                                    >
                                        {buttonProperties.closeButtonText || InitialButtonProperties.closeButtonText}
                                    </button>
                                    <button
                                        type="submit"
                                        form="BookPackageForm"
                                        className={`btn flex-grow-1 py-2 fw-bold rounded-3 shadow-sm ${buttonProperties.saveButtonColor || InitialButtonProperties.saveButtonColor}`}
                                    >
                                        {buttonProperties.saveButtonText || InitialButtonProperties.saveButtonText}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
        </>
    );
};

export default CustomModal;

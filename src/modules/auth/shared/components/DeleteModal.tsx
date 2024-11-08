
const DeleteModal = ({ data, OnDelete, message }: any) => {
    return (

        <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{message ? message : 'Are you sure you want to delete this item? This action cannot be undone.'}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" id="confirmDeleteButton" onClick={() => OnDelete(data)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal


// Import Assets
import crossIcon from '../assets/cross-icon.svg'

export function Modal({onClose, onCancel, onConfirm}){

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button type="button" className="modal-header-close" onClick={onClose}>
                        <img src={crossIcon} alt='btn modal cross'/>
                    </button>
                </div>
                <div className="modal-body">
                    <h1>Are you sure you want to delete this item?</h1>
                    <p>
                        Once deleted the item can't be returned, 
                        so make sure to check again before deleting.
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="modal-footer-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="modal-footer-confirm" onClick={onConfirm}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )

}
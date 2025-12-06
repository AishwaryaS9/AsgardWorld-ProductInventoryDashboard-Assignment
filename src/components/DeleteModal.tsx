import { BiX } from 'react-icons/bi';

interface DeleteModalProps {
    message?: string;
    onCancel: () => void;
    onDelete: () => void;
}

const DeleteModal = ({ message, onCancel, onDelete }: DeleteModalProps) => {
    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onCancel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
        >
            <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center mb-4">
                    <h2 id="delete-modal-title" className="text-lg font-medium text-gray-800">
                        Confirm Delete
                    </h2>
                    <button
                        onClick={onCancel}
                        aria-label="Close delete modal"
                        className="text-gray-800 hover:text-gray-900 cursor-pointer"
                    >
                        <BiX size={28} />
                    </button>
                </header>

                <p className="text-gray-700 mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
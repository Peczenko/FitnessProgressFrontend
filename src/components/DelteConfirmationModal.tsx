
import { Modal } from './Modal';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

export function DeleteConfirmationModal({
                                            isOpen,
                                            onClose,
                                            onConfirm,
                                            itemName,
                                        }: DeleteConfirmationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
            <div className="space-y-4">
                <p className="text-gray-600">
                    Are you sure you want to delete "{itemName}"? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}
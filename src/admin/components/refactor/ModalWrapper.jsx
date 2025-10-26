import React from 'react'

const ModalWrapper = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />

                <div className={`relative bg-white rounded-lg shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}>
                    {title && (
                        <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--accent-light)' }}>
                            <h2 className="text-xl font-medium" style={{ color: 'var(--accent-dark)' }}>{title}</h2>
                            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 transition-colors" style={{ color: 'var(--accent-dark)' }}>✕</button>
                        </div>
                    )}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWrapper

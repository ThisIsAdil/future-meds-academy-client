import React from 'react'

const AdminHeader = ({ title, count, onAdd, addLabel = 'Add', addIcon }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-medium" style={{ color: 'var(--accent-dark)' }}>{title}</h1>
                {onAdd && (
                    <button onClick={onAdd} className="animated-button">
                        <span className="label flex items-center gap-2">
                            {addIcon}
                            {addLabel}
                        </span>
                    </button>
                )}
            </div>
            {typeof count !== 'undefined' && (
                <p className="text-sm text-gray-600">{count} {title.toLowerCase()}</p>
            )}
        </div>
    )
}

export default AdminHeader

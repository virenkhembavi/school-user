import { Modal } from '@mui/material';
import React from 'react'

export default function DetailsModal({
    data,
    setOpen,
    open,
    setDetails
}) {

    const handleClose = () => {
        setOpen(false)
        setDetails({})
    }
    
    return (
        <Modal
            open={true}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='modal-container'>
                <div class="modal-overlay">
                    <div class="modal">
                        <button class="close-button" aria-label="Close modal" onClick={handleClose}>&times;</button>
                        <h2>User Details</h2>
                        <div class="user-details">
                            <div class="detail">
                                <strong>Username:</strong> {data?.username}
                            </div>
                            <div class="detail">
                                <strong>Email:</strong> {data?.email}
                            </div>
                            <div class="detail">
                                <strong>Language:</strong> {data?.language}
                            </div>
                            <div class="detail">
                                <strong>Address:</strong> {data?.address}
                            </div>
                            <div class="detail">
                                <strong>Standard:</strong> {data?.standard}
                            </div>
                            <div class="detail">
                                <strong>Subjects:</strong>
                                <div class="subjects">
                                    {
                                        data?.subjects.map((subject, index) => {
                                            return (
                                                <span class="subject" key={index}>{subject}</span>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

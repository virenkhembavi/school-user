import React, { useState } from 'react'
import db from '../../../db.json'
import DetailsModal from '../../../lib/Modal';
import { useNavigate } from 'react-router-dom'

export default function Admin() {
    let navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState({})
    const [search, setSearch] = useState('')

    const handleOpen = (evt) => {
        setOpen(true)
        setDetails(evt)
    }

    const handleChange = (evt) => {
        setSearch(evt?.target?.value)
    }

    const handleLogout = () => {
        localStorage?.removeItem("Auth")
        localStorage?.removeItem("User")
        localStorage?.removeItem("Email")
        navigate("/")
    }

    const filteredData = db
        ?.filter((e) => {
            const usernameMatch = e.username.toLowerCase().includes(search.toLowerCase());
            const subjectMatch = e.subjects?.some((subject) => subject.toLowerCase().includes(search.toLowerCase()));
            return usernameMatch || subjectMatch;
        });

    return (
        <div class="container">
            {
                open && (
                    <DetailsModal open={open} setOpen={setOpen} data={open && details} setDetails={setDetails} />
                )
            }
            <div className='search-section'>
                <div class="search-container">
                    <input type="text" class="search-bar" placeholder="Search..." onChange={handleChange} />
                    <button class="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div class="card-grid">
                {
                    filteredData
                        ?.filter(e => e.userType === 'student')
                        ?.map((e, i) => {
                            return (
                                <div class="card">
                                    <h2>{" "}{e?.username}</h2>
                                    <p><strong>Email:{" "}</strong>{e?.email}</p>
                                    <p><strong>Subject:{" "}</strong>{" "}{
                                        e?.subjects?.map((subject, index) => (
                                            <span key={index}>{" "}{subject}</span>
                                        ))
                                    }
                                    </p>
                                    <button class="details-button" onClick={() => handleOpen(e)}>Details</button>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

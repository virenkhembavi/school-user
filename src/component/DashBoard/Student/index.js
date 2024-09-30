import { useNavigate } from 'react-router-dom';
import db from '../../../db.json'

export default function Student() {
    let navigate = useNavigate()
    const details = localStorage?.getItem("Email") && db.find((item) => item?.email?.toLocaleLowerCase() === localStorage?.getItem("Email")?.toLocaleLowerCase());

    const handleLogout = () => {
        localStorage?.removeItem("Auth")
        localStorage?.removeItem("User")
        localStorage?.removeItem("Email")
        navigate("/")
    }

    return (
        <div className="student-main-container">
            <div className="student-container">
                <h1>User Details</h1>
                <div className="user-details">
                    <div className="detail">
                        <strong>Username:</strong> {details?.username}
                    </div>
                    <div className="detail">
                        <strong>Email:</strong> {details?.email}
                    </div>
                    <div className="detail">
                        <strong>Language:</strong> {details?.language}
                    </div>
                    <div className="detail">
                        <strong>Address:</strong> {details?.address}
                    </div>
                    <div className="detail">
                        <strong>Standard:</strong> {details?.standard}
                    </div>
                    <div className="detail">
                        <strong>Subjects:</strong>
                        <div className="subjects">
                            {
                                details?.subjects?.map((subject, index) => (
                                    <span className="subject" key={index}>{subject}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button className="logout-button-student" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

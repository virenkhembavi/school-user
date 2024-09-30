import Admin from './Admin'
import Student from './Student'

export default function DashBoard() {

    return localStorage?.getItem("User")?.toLocaleLowerCase() === "admin" ? <Admin /> : <Student />
}

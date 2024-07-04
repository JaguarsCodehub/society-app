import sql from 'mssql'
import { SQL_URL } from '../config'

async function connectToDb() {
    try {
        await sql.connect(SQL_URL)
        console.log("🟢Connected to DB")
        alert("🟢Connected to DB")
    } catch (error) {
        console.log("🔴DB CONNECTION ERROR")
        alert("🔴DB CONNECTION ERROR")
    }
}

export default connectToDb
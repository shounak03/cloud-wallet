import express  from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import txnRoutes from "./routes/txn.routes"
const app = express()
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/v1",authRoutes)
app.use("/api/v1",txnRoutes)




app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
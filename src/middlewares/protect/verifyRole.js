import fs from "fs"
let users = JSON.parse(fs.readFileSync("./src/database/users.json", "utf-8"))
const verifyRole = (req, res, next) => {
    const { username, password } = req.body
    const user = users.find(user => user.username == username && user.password == password)
    if(user) {
        req.user = user
        next()
    } else {
       res.render("404.ejs")
    }
}

export { verifyRole }
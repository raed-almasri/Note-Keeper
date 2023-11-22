import app from './app.js'
 //run at port
app.listen(process.env.PORT, async () => {
    
    console.log(`Server Run of Port : ${process.env.PORT}  ✔✅`)
})

const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require('cors')

app.use(express.json())
app.use(cors())

const mongoURI = "mongodb+srv://vishalpawar:tDvvhVIy8i225xKn@own-data.unin18g.mongodb.net/?retryWrites=true&w=majority&appName=own-website"

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}

connectToMongo().then(()=>{
    console.log("conneted");
}).catch(()=>{
    console.log("get error");
});


const jobSchema={
    postuser:String,
    jobposition:String,
    joblocation:String,
    joblink:String,
    companyname:String
}

const monmodel=mongoose.model("own-jobs",jobSchema)

app.get("/get",async(req,res)=>{
    try {
        let upid = req.params.id;
        let getDocument = await monmodel.find();
        
        if (getDocument === null) {
            res.send("Nothing Found");
        } else {
            res.json(getDocument);
        }
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/post",async(req,res)=>{
    const data=new monmodel({
        postuser:req.body.postuser,
        jobposition:req.body.jobposition,
        joblocation:req.body.joblocation,
        joblink:req.body.joblink,
        companyname:req.body.companyname,
    })

    const val=await data.save()
    // res.json(val)
    res.send("Saved Succesfully")
})

app.put("/update/:id", async (req, res) => {
    try {
        let upid = req.params.id;
        let updatedDocument = await monmodel.findByIdAndUpdate({ _id: upid }, req.body, { new: true });
        
        if (updatedDocument === null) {
            res.send("Nothing Found");
        } else {
            res.send("Update Succesfully");
        }
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.put("/delete/:id", async (req, res) => {
    try {
        let upid = req.params.id;
        let deleteDocument = await monmodel.findByIdAndDelete({ _id: upid });
        
        if (deleteDocument === null) {
            res.send("Nothing Found");
        } else {
            res.send("Delete Succesfully");
        }
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000,()=>{
    console.log("on port 3000")
})
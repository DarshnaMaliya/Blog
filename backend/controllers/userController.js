import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import exceljs from "exceljs";

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }catch (err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No user found"});
    }
    return res.status(200).json({users});
};
export const signUp = async(req, res, next) => {
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err) {
        console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User exists...You can Login"});
    }
    const hashedPassword = bcrypt.hashSync(password);
   const user = new User({
    name, 
    email,
    password:hashedPassword,
    blogs: []
   });
   
   try{
        await user.save();
    } catch (err) {
        console.log(err)
    }
    return res.status(201).json({user});
}

 export const login = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        res.status(404).json({message:"Couldn't find user by this email"});
    }
    const isPasswordCorrect = bcrypt.compareSync( password , existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"});
    }
    return res.status(200).json({message:"Successful Login", user:existingUser});
}


export const exportFile = async (req, res, next) => {
    // let startdate = req.params.startdate;
    // let enddate = req.params.enddate;
    try {
        // blog = await blogSchema.find({blogs}).populate('user');
        const data = await User.find();
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("blogList");

        worksheet.columns = [
            {header : "Sr no.", key: "sr_no"},
            {header : "name", key: "name"},
            {header : "email", key: "email"},
            {header : "blogs", key: "blogs"},
            // {header : "Create-Date", key: "startDate"},
            // {header : "User", key: "user"},
        ];
let count = 1;

console.log(data);
data.forEach((blog) => {
    blog.sr_no = count;
    worksheet.addRow(blog);
     count++;
})
worksheet.getRow(1).eachCell((cell)=> {
    cell.font = {bold : true};
});

// res.setHeader(
//     "Content-type",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
// );

// res.setHeader("content-Disposition", `attachment; filename=blogList.xlsx`);

// return workbook.xlsx.write(res).then(()=> {
//     res.status(200);
// });
const data1 = await workbook.xlsx.writeFile('blogs1.xlsx');
res.send("done");
        //console.log(blog);
    } catch (err) {
        return console.log(err)
    }

}
export default getAllUser;
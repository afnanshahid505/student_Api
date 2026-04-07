const Student=require("../models/Student")

const getstudents= async(req,res)=>{
     const students = await Student.find();
    res.json(students)
    };
const addstudents= async (req,res)=>{
        const newStudent= await Student.create({
            name :req.body.name
        });
        
        res.status(201).json({
            message: "Student added sucessfully",
            student: newStudent

        });
    };
const updatestudents = async(req,res)=>{
    const updatestudent= await Student.findByIdAndUpdate(
        req.params.id,
        {name: req.body.name},
            {new : true}
        );
    if (! updatestudent){
        return res.json.status(404)({
            message:"Student not found"

        });
    } 
    res.json({
        message: "Student updated successfully",
        student: updatestudent
    });   
} 
const deletestudents=async (req,res)=>{
    const deletestudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletestudent){
        return res.json({
            message:"Student not found"

        });
    }
    res.json({
        message:"Student deleted sucessfully"

    });

};  
 

module.exports ={addstudents,getstudents,updatestudents,deletestudents}; 
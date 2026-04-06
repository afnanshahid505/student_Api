let students=[
    {id : 1, name: "Rohit"},
    {id : 2, name: "Virat"}
    ]
const getstudents=(req,res)=>{
    console.log("hit correctly");
    res.json(students)
    };
const addstudents=(req,res)=>{
        const newStudent=req.body
        students.push(newStudent);
        res.status(201).json({
            message: "Student added sucessfully",
            student: newStudent

        });
    };
const updatestudents=(req,res)=>{
    const studentId =parseInt(req.params.id);
    const updatedata=req.body;
    const student = students.find(student=> student.id===studentId);
    if (!student){
        return res.status(404).json({
            message:"Student Not found"
            
        });
    }
    student.name=updatedata.name
    res.json({
        message:"student updates sucessfully",
        updated: student

    })
}; 
const deletestudents=(req,res)=>{
    const studentId= parseInt(req.params.id);
    const student = students.find(student=> student.id===studentId);
    if (!student){
        return res.status(404).json({
            message: "student not found"
        });
    }
    students=students.filter(student=> student.id!== studentId);
    res.json({
        message: "deleted sucessfully"
    })


};
module.exports ={addstudents,updatestudents,getstudents,deletestudents}; 
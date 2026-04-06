const express =require("express");
const router=express.Router();
const {updatestudents,getstudents,deletestudents,addstudents}=require("../controllers/studentcontroller")
router.get("/",getstudents);
router.post("/",addstudents);
router.put("/:id",updatestudents);
router.delete("/:id",deletestudents);
module.exports=router;

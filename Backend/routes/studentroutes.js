const express =require("express");
const protect = require("../middleware/authMiddleware");
const router=express.Router();
const {getstudents,addstudents,updatestudents,deletestudents}=require("../controllers/studentcontroller")
router.get("/",protect,getstudents);
router.post("/",protect,addstudents);
router.put("/:id",protect,updatestudents);
router.delete("/:id",protect,deletestudents);

module.exports=router;

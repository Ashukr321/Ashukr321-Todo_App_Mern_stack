import Task from "../models/tasksModel.js";

// create 
const createTask = async(req,res,next)=>{
  try {
    const {title,description,status} = req.body;
    if(!title || !description || !status){
      throw new Error("All fields are required");
    }
    const newTask = new Task({
      title: title,
      description: description,
      status: status,
      createdBy:req.userId,
    })
    // New Task created 
    await newTask.save();
    res.status(201).json({
      success:true,
      message:"Task created successfully",
      newTask,
    })

  } catch (error) {
    return next(error);
  }
}

// read 
const getTasks = async(req,res,next)=>{
  try {
    // find methods  mongoose that return all the tasks 
    const tasks = await Task.find({createdBy:req.userId});
    res.status(200).json({
      success:true,
      tasks,
    })
  } catch (error) {
    return next(error);
  }
}

// updateById
// deleteById

export {
  createTask,
  getTasks
}
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json()); //parser req body and saves in req.body
//use is used to insert middleware, static() is used to specify the directory path for static content.

const fieldType = {
  id : 'required',
  title : 'required',
  moreDetails : 'optional',
  deadline : 'required',
  subToDo : 'optional'
};

const tasks = [
  {
    id: 1,
    title: "Pay electricity bill",
    moreDetails: "Also, conform if last month's bill was paid. Split the expense with roomate.",
    deadline : new Date('2017-8-05'),
    completed : false,
    subToDos :[
      {
      id:101,
      title: "Check last times bill",
      moreDetails: "The bills aree kept in the top most drawer of the night stand.",
      deadline : new Date('2017-6-02'),
      completed : false,
    },
    {
      id:102,
      title: "Set auto pay",
      moreDetails: "Try setting up on Amex acocunt.",
      deadline : new Date('2017-2-01'),
      completed : false,
    }]
  },
  {
    id: 2,
    title: "Purchase grocery",
    moreDetails: "Also, conform if last month's bill was paid. Split the expense with roomate.",
    deadline : new Date('2016-8-05'),
    completed : false,
    subToDos :[]
  },
  {
    id: 3,
    title: "Purchase gifts for family",
    moreDetails: "Don't forget gift for grandma",
    deadline : new Date('2018-8-05'),
    completed : false,
    subToDos :[
      {
        id:99,
        title: "Gifts for mom",
        moreDetails: "Scented candles",
        deadline : new Date('2018-8-05'),
        completed : false,
      },
      {
        id:98,
        title: "Gifts for mom",
        moreDetails: "Scented candles",
        deadline : new Date('2018-8-05'),
        completed : false,
      },
      {
        id:97,
        title: "Gifts for mom",
        moreDetails: "Scented candles",
        deadline : new Date('2018-8-05'),
        completed : false,
      }
    ]
  }
];

function validateTask(task){
  for(const field in fieldType){
    const type = fieldType[field];
    if(!type){
      delete task[field];
    }else if(fieldType[field] == 'required' && !task[field]){
      return `${field} is required`;
    }
  }
  return null;
}

app.post('/api/tasks/subtasks',(req,res)=>{
  const newSubTask = req.body;
  for(let i=0; i<tasks.length ; i++){
    if(tasks[i].id == newSubTask.parentID){
      newSubTask.id = tasks[i].id+"_"+tasks[i].subToDos.length+1;
      let err = validateTask(newSubTask);
      if(!err){
        tasks[i].subToDos.push(newSubTask);
        res.json(newSubTask);
      }else{
        res.status(422).json({message : `Invaid request : ${err}`});
      }
    }
  }
});
app.delete('/api/tasks/subtasks/:id/:subid',(req,res)=>{
  console.log("++++++++++SUB");
  let id = req.param("id");
  let subid = req.param("subid");
  let resposne = '';
  for(let i =0;i<tasks.length ;i++){
    if(tasks[i].id == id){
      for(let j =0;j<tasks[i].subToDos.length ;j++){
        if(tasks[i].subToDos[j].id == subid){
          tasks[i].subToDos.splice(j,1);
          resposne = 'delete successfull';
        }
      }
    }
  }
  resposne = 'not found';
  res.send(resposne);
});
app.get('/api/tasks',(req,res)=>{
  console.log();
  const metadata = {total_count : tasks.length};
  res.json({_metadata : metadata, records : tasks});
});

app.post('/api/tasks',(req,res)=>{
  console.log(req.body);
  const newTask = req.body;
  newTask.id=tasks.length + 1;
  let err = validateTask(newTask);
  if(!err){
    tasks.push(newTask);
    res.json(newTask);
  }else{
    res.status(422).json({message : `Invaid request : ${err}`});
  }

});
app.delete('/api/tasks/:id',(req,res)=>{
  console.log("MAIN++++++++++++");
  let id = req.param("id");
  let response = '';
  for(let i =0;i<tasks.length ;i++){
    if(tasks[i].id == id){
      tasks.splice(i,1);
      response = 'delete successfull';
    }
  }
  response = 'not found';
  res.send(response);
});

app.listen(3000, function(){
  console.log("app started at port 3000");
});

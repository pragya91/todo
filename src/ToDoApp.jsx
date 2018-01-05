
const TASKS_URL = "http://localhost:3000/api/tasks";
const SUB_TASKS_URL = "http://localhost:3000/api/tasks/subtasks";

const contentNode = document.getElementById("content");

import ToDoTask from './ToDoTask.jsx';
import TaskAdd from './TaskAdd.jsx';

class TasksTable extends React.Component{
  render(){
    let props = this.props;
    let taskRows = props.tasks.map(task => <ToDoTask key={task.id} task={task} deleteTask = {props.deleteTask} createSubTask={props.createSubTask} deleteSubTask={props.deleteSubTask}/>);
    return (
      <div>
        <div className="list-header">
          <div className="deadline">Deadline</div>
          <div className="status">Status</div>
          <div className="tasks">Task</div>
        </div>
        <hr/>
        <ul id="incomplete-tasks">
          {taskRows}
        </ul>

      </div>
    );
  }
}


class TaskList extends React.Component{
  constructor(){
    super();
    this.state = {tasks : []};
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.createSubTask = this.createTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    let self = this;
    let getTasks = new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', TASKS_URL,true);
        xhr.onload = function() {
            if (xhr.status == 200 || xhr.status == 304) {
              resolve(JSON.parse(xhr.response));
            }
            else {
              reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function() {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
    getTasks.then(function(response){
      response.records.forEach(task => {
        //+++++++
      });
      self.setState({tasks : response.records});
    })
    /*.catch(function(error){
      console.log("The data could not be fetched");
    });*/
  }
  createTask(newTask){
    let self = this;
    var createNewTask = new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open('POST',TASKS_URL,true);
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.onload = function(){
        if(xhr.status ==200){
          resolve(JSON.parse(xhr.response));
        }else{
          reject(JSON.parse(xhr.response));
        }
      };
      xhr.onerror = function() {
          reject(Error("Network Error"));
      };
      xhr.send(JSON.stringify(newTask));
    });
    createNewTask.then(function(response){
        let allTasks = self.state.tasks.concat(response);
        self.setState({tasks : allTasks});
    },function(error){
        alert(error.message)
    });
  }
  deleteTask(taskID){
    let self = this;
    let deleteCurTask = new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE',TASKS_URL+"/"+taskID,true);
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.onload = function(){
        if(xhr.status ==200){
          resolve(xhr.response);
        }else{
          reject(xhr.response);
        }
      };
      xhr.onerror = function() {
          reject(Error("Network Error"));
      };
      xhr.send(null);
    });
    deleteCurTask.then(function(response){
        self.loadData();
    },function(error){
        alert(error.message);
    });
  }
  createSubTask(newSubTask){
    let self = this;
    var createNewSubTask = new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open('POST',SUB_TASKS_URL,true);
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.onload = function(){
        if(xhr.status ==200){
          resolve(JSON.parse(xhr.response));
        }else{
          reject(JSON.parse(xhr.response));
        }
      };
      xhr.onerror = function() {
          reject(Error("Network Error"));
      };
      xhr.send(JSON.stringify(newSubTask));
    });
    createNewSubTask.then(function(response){
      let allTasks = self.state.tasks;
      for(let i=0;i<allTasks.length;i++){
        if(allTasks[i].id == newSubTask.parentID){
          allTasks[i].subToDos.push(response);
        }
        self.setState({tasks : allTasks});
      }
    },function(error){
        alert(error.message)
    });
  }
  deleteSubTask(taskID,subID){
    let self = this;
    let deleteCurTask = new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE',SUB_TASKS_URL+"/"+taskID+"/"+subID,true);
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.onload = function(){
        if(xhr.status ==200){
          resolve(xhr.response);
        }else{
          reject(xhr.response);
        }
      };
      xhr.onerror = function() {
          reject(Error("Network Error"));
      };
      xhr.send(null);
    });
    deleteCurTask.then(function(response){
        self.loadData();
    },function(error){
        alert(error.message);
    });
  }
  render(){
    return (
      <div className="container">
        <header>
          <h1> My To-Do list </h1>
        </header>
        <TaskAdd createTask = {this.createTask}/>
        <hr/>
        <TasksTable tasks={this.state.tasks} deleteTask={this.deleteTask} deleteSubTask={this.deleteSubTask} createSubTask={this.createSubTask}/>
      </div>
    );
  }
}
ReactDOM.render(
    <TaskList />,
    contentNode
  );

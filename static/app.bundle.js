/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToDoTask_jsx__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TaskAdd_jsx__ = __webpack_require__(3);

const GET_TASKS_URL = "http://localhost:3000/api/tasks";
const CREATE_TASK_URL = "http://localhost:3000/api/tasks";
const DELETE_TASK_URL = "http://localhost:3000/api/tasks";

const contentNode = document.getElementById("content");




class TasksTable extends React.Component {
  render() {
    let props = this.props;
    let taskRows = props.tasks.map(task => React.createElement(__WEBPACK_IMPORTED_MODULE_0__ToDoTask_jsx__["a" /* default */], { key: task.id, task: task, deleteTask: props.deleteTask, createTask: props.createTask }));
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "list-header" },
        React.createElement(
          "div",
          { className: "deadline" },
          "Deadline"
        ),
        React.createElement(
          "div",
          { className: "status" },
          "Status"
        ),
        React.createElement(
          "div",
          { className: "tasks" },
          "Task"
        )
      ),
      React.createElement("hr", null),
      React.createElement(
        "ul",
        { id: "incomplete-tasks" },
        taskRows
      )
    );
  }
}

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = { tasks: [] };
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    let self = this;
    let getTasks = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', GET_TASKS_URL, true);
      xhr.onload = function () {
        if (xhr.status == 200 || xhr.status == 304) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(Error(xhr.statusText));
        }
      };
      xhr.onerror = function () {
        reject(Error("Network Error"));
      };
      xhr.send();
    });
    getTasks.then(function (response) {
      response.records.forEach(task => {
        //+++++++
      });
      self.setState({ tasks: response.records });
    });
    /*.catch(function(error){
      console.log("The data could not be fetched");
    });*/
  }
  createTask(newTask) {
    let self = this;
    var createNewTask = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', CREATE_TASK_URL, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(JSON.parse(xhr.response));
        }
      };
      xhr.onerror = function () {
        reject(Error("Network Error"));
      };
      xhr.send(JSON.stringify(newTask));
    });
    createNewTask.then(function (response) {
      let allTasks = self.state.tasks.concat(response);
      self.setState({ tasks: allTasks });
    }, function (error) {
      alert(error.message);
    });
  }
  deleteTask(taskID) {
    let self = this;
    let deleteCurTask = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE', DELETE_TASK_URL + "/" + taskID, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };
      xhr.onerror = function () {
        reject(Error("Network Error"));
      };
      xhr.send(null);
    });
    deleteCurTask.then(function (response) {
      self.loadData();
    }, function (error) {
      alert(error.message);
    });
  }
  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "header",
        null,
        React.createElement(
          "h1",
          null,
          " My To-Do list "
        )
      ),
      React.createElement(__WEBPACK_IMPORTED_MODULE_1__TaskAdd_jsx__["a" /* default */], { createTask: this.createTask }),
      React.createElement("hr", null),
      React.createElement(TasksTable, { tasks: this.state.tasks, deleteTask: this.deleteTask, createTask: this.createTask })
    );
  }
}
ReactDOM.render(React.createElement(TaskList, null), contentNode);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TaskAdd_jsx__ = __webpack_require__(3);

class ToDoTask extends React.Component {
  constructor() {
    super();
    this.state = {
      detailsDisplay: false,
      addSubTask: false
    };
    this.titleClick = this.titleClick.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.deteleTask = this.deteleTask.bind(this);
  }

  titleClick() {
    this.setState({
      detailsDisplay: !this.state.detailsDisplay
    });
  }
  deteleTask() {
    this.props.deleteTask(this.props.task.id);
  }
  addSubTask() {
    this.setState({
      addSubTask: !this.state.addSubTask
    });
  }
  createSubTask() {}
  render() {
    let props = this.props;
    let subtodos = props.task.subToDos.map(subToDo => React.createElement(SubToDo, { subToDo: subToDo, key: subToDo.id }));
    return React.createElement(
      "li",
      null,
      React.createElement(
        "div",
        { className: "task-row" },
        React.createElement(
          "div",
          { className: "deadline" },
          new Date(props.task.deadline).toDateString()
        ),
        React.createElement("input", { type: "checkbox", className: "status" }),
        React.createElement(
          "label",
          { className: "tasks", onClick: this.titleClick },
          props.task.title
        ),
        React.createElement("input", { type: "text", className: "edit-hide" }),
        React.createElement(
          "button",
          { className: "delete", onClick: this.deteleTask },
          "Delete"
        ),
        React.createElement(
          "button",
          { className: "edit", onClick: this.addSubTask },
          this.state.addSubTask ? 'Cancel' : 'Add Sub Task'
        )
      ),
      React.createElement(
        "div",
        { className: 'details ' + (this.state.detailsDisplay ? 'details-show' : 'details-hide') },
        props.task.moreDetails
      ),
      this.state.addSubTask ? React.createElement(__WEBPACK_IMPORTED_MODULE_0__TaskAdd_jsx__["a" /* default */], { createTask: this.props.createTask }) : React.createElement("div", null),
      React.createElement(
        "ul",
        { className: "sub-tasks" },
        subtodos
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ToDoTask;


function SubToDo(props) {
  return React.createElement(
    "li",
    null,
    React.createElement(
      "div",
      { className: "subtask-row" },
      React.createElement("input", { type: "checkbox", className: "sub-status" }),
      React.createElement(
        "label",
        { className: "tasks" },
        props.subToDo.title,
        "\xA0"
      ),
      React.createElement(
        "i",
        null,
        "(Deadline: ",
        new Date(props.subToDo.deadline).toDateString(),
        ")"
      ),
      React.createElement("input", { type: "text", className: "edit-hide" }),
      React.createElement(
        "div",
        { className: "sub-details" },
        props.subToDo.moreDetails
      ),
      React.createElement(
        "button",
        { className: "delete", onClick: this.deteleSubTask },
        "Delete"
      )
    )
  );
}

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TaskAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.taskAdd;
    this.props.createTask({
      title: form.title.value,
      moreDetails: form.moredetails.value,
      deadline: form.deadline.value,
      completed: false
    });
    form.title.value = "";
    form.title.moredetails = "";
    form.title.deadline = "";
  }
  render() {
    return React.createElement(
      "form",
      { name: "taskAdd", onSubmit: this.handleSubmit, className: "task-add" },
      React.createElement(
        "label",
        { htmlFor: "new-task" },
        "Add Item"
      ),
      React.createElement("input", { name: "title", type: "text", placeholder: "Enter task here" }),
      React.createElement("textarea", { name: "moredetails", placeholder: "More details... (optional)" }),
      React.createElement("input", { name: "deadline", type: "date" }),
      React.createElement(
        "button",
        null,
        "Add"
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TaskAdd;


/***/ })
/******/ ]);
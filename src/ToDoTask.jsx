import TaskAdd from './TaskAdd.jsx';
export default class ToDoTask extends React.Component{
  constructor(){
    super();
    this.state = {
      detailsDisplay : false,
      addSubTask : false
    };
    this.titleClick = this.titleClick.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.deteleTask = this.deteleTask.bind(this);
  }

  titleClick(){
    this.setState({
      detailsDisplay: !this.state.detailsDisplay
    });
  }
  deteleTask(){
    this.props.deleteTask(this.props.task.id);
  }
  addSubTask(){
    this.setState({
      addSubTask: !this.state.addSubTask
    });
  }
  createSubTask(){

  }
  render(){
    let props = this.props;
    let subtodos = props.task.subToDos.map(subToDo => <SubToDo subToDo={subToDo} key={subToDo.id}/>);
    return (
      <li>
        <div className="task-row">
          <div className="deadline">{new Date(props.task.deadline).toDateString()}</div>
          <input type="checkbox" className="status"></input>
          <label className="tasks" onClick={this.titleClick}>{props.task.title}</label>
          <input type="text" className="edit-hide"></input>

          <button className="delete" onClick={this.deteleTask}>Delete</button>
          <button className="edit" onClick={this.addSubTask}>{this.state.addSubTask ? 'Cancel' : 'Add Sub Task'}</button>
        </div>
        <div className={'details ' + (this.state.detailsDisplay ? 'details-show' : 'details-hide')}>{props.task.moreDetails}</div>
        {this.state.addSubTask ? <TaskAdd createTask = {this.props.createTask} /> : <div></div>}
        <ul className="sub-tasks">
          {subtodos}
        </ul>
      </li>
    );
  }
}

function SubToDo(props){
  return (
    <li>
      <div className="subtask-row">
        <input type="checkbox" className="sub-status"></input>
        <label className="tasks">{props.subToDo.title}&nbsp;</label>
        <i>(Deadline: {new Date(props.subToDo.deadline).toDateString()})</i>
        <input type="text" className="edit-hide"></input>
        <div className='sub-details'>{props.subToDo.moreDetails}</div>
        <button className="delete" onClick={this.deteleSubTask}>Delete</button>
      </div>

    </li>
  );
}

import TaskAdd from './TaskAdd.jsx';
import SubToDo from './SubToDo.jsx';
export default class ToDoTask extends React.Component{
  constructor(){
    super();
    this.state = {
      detailsDisplay : false,
      addSubTask : false
    };
    this.titleClick = this.titleClick.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
  }

  titleClick(){
    this.setState({
      detailsDisplay: !this.state.detailsDisplay
    });
  }
  deleteTask(){
    this.props.deleteTask(this.props.task.id);
  }
  deleteSubTask(subID){
      this.props.deleteSubTask(this.props.task.id,subID);
  }
  addSubTask(){
    this.setState({
      addSubTask: !this.state.addSubTask
    });
  }
  render(){
    let props = this.props;
    let self = this;
    let subtodos = props.task.subToDos.map(subToDo => {
        subToDo.parentID = self.props.task.id;
        return <SubToDo subToDo={subToDo} key={subToDo.id} deleteSubTask={this.deleteSubTask}/>;
      });
    return (
      <li>
        <div className={"task-row " + (new Date(props.task.deadline).toDateString() < new Date() ? 'missed' : '')}>
          <div className="deadline">{new Date(props.task.deadline).toDateString()}</div>
          <input type="checkbox" className="status"></input>
          <label className="tasks" onClick={this.titleClick}>{props.task.title}</label>
          <input type="text" className="edit-hide"></input>

          <button className="delete" onClick={this.deleteTask}>Delete</button>
          <button className="edit" onClick={this.addSubTask}>{this.state.addSubTask ? 'Cancel' : 'Add Sub Task'}</button>
        </div>
        <div className={'details ' + (this.state.detailsDisplay ? 'details-show' : 'details-hide')}>{props.task.moreDetails}</div>
        {this.state.addSubTask ? <TaskAdd createTask = {this.props.createSubTask} parentID = {props.task.id} /> : <div></div>}
        <ul className="sub-tasks">
          {subtodos}
        </ul>
      </li>
    );
  }
}

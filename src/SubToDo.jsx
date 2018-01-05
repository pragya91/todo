//Sub task module for the main tasks
export default class SubToDo extends React.Component{
  constructor(){
    super();
    this.deleteSubTask = this.deleteSubTask.bind(this);
  }
  deleteSubTask(){
    this.props.deleteSubTask(this.props.subToDo.id);
  }
  render(){
    let props = this.props;
    return (
      <li>
        <div className="subtask-row">
          <input type="checkbox" className="sub-status"></input>
          <label className="tasks">{props.subToDo.title}&nbsp;</label>
          <i>(Deadline: {new Date(props.subToDo.deadline).toDateString()})</i>
          <input type="text" className="edit-hide"></input>
          <div className='sub-details'>{props.subToDo.moreDetails}</div>
          <button className="delete" onClick={this.deleteSubTask}>Delete</button>
        </div>
      </li>
    );
  }

}

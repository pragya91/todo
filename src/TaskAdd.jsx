export default class TaskAdd extends React.Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const form = document.forms.taskAdd;
    this.props.createTask(
      {
        title : this.refs.title.value,
        moreDetails : this.refs.moredetails.value,
        deadline : this.refs.deadline.value,
        completed :false,
        parentID : this.props.parentID
      }
    );
    form.title.value="";
    form.title.moredetails="";
    form.title.deadline="";
  }
  render(){
    return (
      <form name="taskAdd" onSubmit={this.handleSubmit} className="task-add">
        <label htmlFor="new-task">Add Item</label>
        <input ref="title" name="title" type="text" placeholder="Enter task here"/>
        <textarea ref="moredetails" name="moredetails" placeholder = "More details... (optional)"/>
        <input ref="deadline" name="deadline" type="date" />
        <button>Add</button>
      </form>
    );
  }
}

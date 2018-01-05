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
        title : form.title.value,
        moreDetails : form.moredetails.value,
        deadline : form.deadline.value,
        completed :false
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
        <input name="title" type="text" placeholder="Enter task here"/>
        <textarea name="moredetails" placeholder = "More details... (optional)"/>
        <input name="deadline" type="date" />
        <button>Add</button>
      </form>
    );
  }
}

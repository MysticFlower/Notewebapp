import React from 'react';
import { Link } from 'react-router-dom';
class Update extends React.Component {
    constructor (props) {
        super(props);
        this.state = { _id: '', title: '', note: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount () {
        fetch('http://192.168.1.10:8080/notes/' + this.props.match.params.id)
            .then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
                this.setState({
                    _id: result._id,
                    title: result.title,
                    note: result.note
                });
            });
    }
    handleChange (event) {
	  const state = this.state;
	  state[event.target.name] = event.target.value;
	  this.setState(state);
    }
    handleSubmit (event) {
	  event.preventDefault();
	  fetch('http://192.168.1.10:8080/notes/', {
            method: 'POST',
            body: JSON.stringify({
                _id: this.state._id,
                title: this.state.title,
                note: this.state.note
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                alert("Website update successfully."); // eslint-disable-line no-alert
            }
        });
    }
    render () {
        return (
            <div id="container">
			  <Link to="/">Websites</Link>
				  <p/>
				  <form onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={this.state._id}/>
                    <p>
                        <label>Title:</label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
                    </p>
                    <p>
                        <label>NOTE:</label>
                        <input type="text" name="note" value={this.state.note} onChange={this.handleChange} placeholder="Note" />
                    </p>
                    <p>
                        <input type="submit" value="Submit" />
                    </p>
				  </form>
			   </div>
        );
    }
}
export default Update;

import React from 'react';
import { Link } from 'react-router-dom';
class Websites extends React.Component {
    constructor (props) {
        super(props);
        this.state = { websites: [] };
        this.headers = [
            { key: '_id', label: 'Id' },
            { key: 'title', label: 'Title' },
            { key: 'note', label: 'Note' }
        ];
        this.deleteWebsite = this.deleteWebsite.bind(this);
    }
    componentDidMount () {
        fetch('http://192.168.1.10:8080/notes/')
            .then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
                this.setState({
                    websites: result
                });
            });
    }
    deleteWebsite (_id) {
        fetch('http://192.168.1.10:8080/notes/delete/' + _id)
            .then(response => {
                if (response.status === 200) {
                    fetch('http://192.168.1.10:8080/notes/')
                        .then(response => {
                            return response.json();
                        }).then(result => {
                            console.log(result);
                            this.setState({
                                websites: result
                            });
                        });
                }
            });
    }
    render () {
        return (
            <div id="container">
                <Link to="/create">Add Website</Link>
                <p />
                <table>
                    <thead>
                        <tr>
                            {
                                this.headers.map(function (h) {
                                    return (
                                        <th key={h.key}>{h.label}</th>
                                    );
                                })
                            }
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.websites.map(function (item, key) {
                                return (
                                    <tr key={key}>
                                        <td>{item._id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.note}</td>
                                        <td>
                                            <Link to={`/update/${item._id}`}>Edit</Link>
                                            {/* <a href="#" onClick={this.deleteWebsite.bind(this, item._id)}>Delete</a> */}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Websites;

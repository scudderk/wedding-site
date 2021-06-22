import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import 'react-table/react-table.css'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class UpdateGuest extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/guest/update/${this.props.id}`
    }

    render() {
        return <div className="btn-update" onClick={this.updateUser}>Update</div>
    }
}

class DeleteGuest extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the guest ${this.props.id} permanently?`,
            )
        ) {
            api.deleteGuestById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <div className="btn-delete" onClick={this.deleteUser}>Delete</div>
    }
}
class GuestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getAllGuests()
        .then(guests => {
            console.log(guests.data.success)
            if (guests.data.success === false) {
                history.push('/login')
            } else {
                this.setState({
                    guests: guests.data.data,
                    isLoading: false,
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const { guests, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'forename',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'surname',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'guestGroupID',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteGuest id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateGuest id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (guests !== null) {
            if (!guests.length) {
                showTable = false
            }
        }

        return (
            <div className="table-padding">
                {showTable && (
                    <ReactTable
                        data={guests}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </div>
        )
    }
}
export default GuestList
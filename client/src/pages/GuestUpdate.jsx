import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class GuestUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            forename: '',
            surname: '',
            guestGroupID: '',
        }
    }

    handleChangeInputForename = async event => {
        const forename = event.target.value
        this.setState({ forename })
    }
    handleChangeInputSurname = async event => {
        const surname = event.target.value
        this.setState({ surname })
    }
    handleChangeInputGuestGroupID = async event => {
        const guestGroupID = event.target.validity.valid
            ? event.target.value
            : this.state.guestGroupID

        this.setState({ guestGroupID })
    }


    handleUpdateGuest = async () => {
        const { id, forename, surname, guestGroupID } = this.state
        const payload = { forename, surname, guestGroupID }

        await api.updateGuestById(id, payload).then(res => {
            window.alert(`Guest updated successfully`)
            this.setState({
                forename: '',
                surname: '',
                guestGroupID: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const guest = await api.getGuestById(id)

        this.setState({
            forename: guest.data.data.forename,
            surname: guest.data.data.surname,
            guestGroupID: guest.data.data.guestGroupID,
        })
    }

    render() {
        const { forename, surname, guestGroupID } = this.state
        return (
            <Wrapper>
                <Title>Create Guest</Title>

                <Label>Forename: </Label>
                <InputText
                    type="text"
                    value={forename}
                    onChange={this.handleChangeInputForename}
                />

                <Label>Surname: </Label>
                <InputText
                    type="text"
                    value={surname}
                    onChange={this.handleChangeInputSurname}
                />

                <Label>Guest Group ID: </Label>
                <InputText
                    type="number"
                    value={guestGroupID}
                    onChange={this.handleChangeInputGuestGroupID}
                />

                <Button onClick={this.handleUpdateGuest}>Update Guest</Button>
                <CancelButton href={'/guest/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default GuestUpdate
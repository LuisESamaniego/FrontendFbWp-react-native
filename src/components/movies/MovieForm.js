import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import Movies from './Movies';
import { withAuth } from '@okta/okta-react';
import { API_BASE_URL } from '../../config';
export default withAuth(class MovieForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            duracion:'',
            sinopsis:'',
            imagen:'',
            errorMessage: '',
            error: false,
            isLoading: false
        }
        this.duracionPeli = this.duracionPeli.bind(this);
        this.sinopsisPeli = this.sinopsisPeli.bind(this);
        this.imagenPeli = this.imagenPeli.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    duracionPeli(e) {
        this.setState({
            duracion: e.target.value
        })
    }
    
    sinopsisPeli(e) {
        this.setState({
            sinopsis: e.target.value
        })
    }

    imagenPeli(e) {
        this.setState({
            imagen: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        

        const response = await fetch(API_BASE_URL + '/movies', {
            method: 'POST',
            body: JSON.stringify({
                "title": this.state.title,
                "sinopsis": this.state.sinopsis,
                "duracion": this.state.duracion,
                "imagen": this.state.imagen
            })
        });
        const data = await response.json();

        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors
            });
        } else {
            this.setState({
                title: '',
                isLoading: false,
                error: false,
                errorMessage: ''
            });
            //this.props.onAddition(data);
        }
    }

    render() {
        return (
            <Form error={this.state.error} onSubmit={this.onSubmit}>
            <div>
                <Form.Field error={this.state.error}>
                    <label>Title:</label>
                    <input type='text' value={this.state.title} onChange={this.handleChange}/><br></br>
                    <label>Sinopsis:</label>
                    <input type='text' value={this.state.sinopsis} onChange={this.sinopsisPeli}/><br></br>
                    <label>Duracion:</label>
                    <input type='text' value={this.state.duracion} onChange={this.duracionPeli}/><br></br>
                    <label>Imagen:</label>
                    <input multiple type="file" onChange={this.imagenPeli} />
                </Form.Field>
                </div>
                <Button type='submit' loading={this.state.isLoading}>Agregar película</Button>

                <div>
                    <Movies>

                    </Movies>
                </div>
            </Form>
        )
    }
});

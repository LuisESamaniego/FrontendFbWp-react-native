
import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { API_BASE_URL } from '../../config';
import ReactDOM from 'react-dom';
import MaterialTable from '../../../node_modules/material-table';
//import MaterialTable from 'material-table';


export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            data: null,
            loaded: true,
            error: null
        }
    }
    baseURL = API_BASE_URL+'/movies';
    
    getData = (ev)=>{
        this.setState({loaded:false, error: null});
        let url = this.baseURL;
        
        let req = new Request(url, {
            method: 'GET'
        });
        
        fetch(req)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }
    showData = (data)=>{
        this.setState({loaded:true, data});
        console.log(data);
    }
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }
    componentDidMount(){
      
    }
    onDelete(id) {
        this.setState({loaded:false, error: null});
        let url = this.baseURL + '/'+ id;
        
        let req = new Request(url, {
            method: 'DELETE'
        });
        
        fetch(req)
        .then(this.showData)
        .then(this.getData)
    }
    onIncrease(id) {
        this.setState({loaded:false, error: null});
        let url = this.baseURL + '/'+ id + '/count';
        
        let req = new Request(url, {
            method: 'POST'
        });
        
        fetch(req)
        .then(this.showData)
        .then(this.getData)
    }
    render() {
        return (
           
            <ScrollView  style={{width:'300%'}}>
                { !this.state.loaded && (
                    <Text>LOADING</Text>
                )}
            
                <Button title="LISTADO DE PELICULAS"
                    onPress={this.getData} />
                { this.state.error && (
                    <Text style={styles.err}>{this.state.error}</Text>
                )}
                { this.state.data && this.state.data.length > 0 && (
                    this.state.data.map( comment => (
                        <Text key={comment.id} style={styles.txt}>
                            <div>
                            <table> 
                            <tr>
                            <tr>
                            <th scope="col">Titulo </th>
                            <th scope="col">Likes </th>
                            <th scope="col">Duración </th>
                            <th scope="col">Sinopsis </th>
                            </tr>

                             <tr>
                            <td>{ comment.title }</td>
                            <td>{ comment.count }</td>
                            <td>{ comment.duracion }</td>
                            <td>{ comment.sinopsis }</td>
                            </tr>
                           <td>
                           <button style={{backgroundColor:'pink'}} textStyle={{fontSize: 20}} onClick={() => this.onDelete(comment.id)}> Eliminar</button>
                           </td>
                           <button style={{backgroundColor:'#507CFB'}} textStyle={{fontSize: 20}}onClick={()=> this.onIncrease(comment.id)}>Like</button>
                           <img src="https://img.icons8.com/windows/50/000000/koala.png"/>
                           </tr>
                           </table>
                           </div>
                           </Text>
                    ))
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 24,
        color: '#333'
    },
    err:{
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold'
    }
});
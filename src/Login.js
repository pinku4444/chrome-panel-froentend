import React, { Component } from 'react'
import Signin  from './Signin';
// import Img from 'react-image';
// import {images} from './image';
import { height } from '@material-ui/system';

export default class Login extends Component {
  constructor(props){
      super(props);
      this.state ={
          'email': '',
          'password': ''
      }
  }
  onChangeHandle = (evt) => {
    this.setState({[evt.target.name] : evt.target.value});
}

onSubmit = (event) => {
    event.preventDefault();
    console.log('checked::::::',this.state);
}
   render() {
        return (
            <div className='mainDiv'>
               <Signin  onChangeHandle={this.onChangeHandle} onSubmit={this.onSubmit} />
               {/* <img src={images.logo} className='imageButterfly' /> */}
            </div>
            // <h1>hello friends..</h1>
        )
    }
}
  

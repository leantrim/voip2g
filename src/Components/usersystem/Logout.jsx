import React, { Component } from 'react'
import firebase from '../Firebase/firebase';

class Logout extends Component {

    handleLogout = () => {
        firebase.auth().signOut();
      };


    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>Logga Ut</button>
            </div>
        )
    }
}


export default Logout


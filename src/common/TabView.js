import React, { Component } from 'react';

const styles = {
    paddingTop: 50,
    paddingRight: 100,
    paddingLeft: 100,
};

class TabView extends Component {

    render() {
         return (
             <div style={styles}>
                 {this.props.children}
             </div>
        );
    }
}

export default TabView;
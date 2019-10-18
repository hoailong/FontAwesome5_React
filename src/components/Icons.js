import React, { Component } from 'react';

class Icons extends Component {
    handleClick = (icon) => {
        this.props.handleClick(icon);
    }
    render() {
        const {icon, name} = this.props;
        return (
            <div className="icon-flex" onClick={()=> this.handleClick(icon)}>
        <i className={icon}></i>
        <p>{name}</p>
    </div>
        );
    }
}
export default Icons;

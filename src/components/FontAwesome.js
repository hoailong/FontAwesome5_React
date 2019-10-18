import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Icons from "./Icons";

class FontAwesome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [],
            iconsFilter: [],
            search: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value,
            iconsFilter: this.state.icons.filter(icon => icon.includes(event.target.value))
        });
    }

    handleClick = (icon) => {
        let textField = document.createElement('textarea');
        textField.innerText = icon;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();

        toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
            
        // toast("You clicked the button");
    }

    componentWillMount() {
        axios
        .get('https://gist.githubusercontent.com/mohamdio/982653e3a8ae35f892f13c5ef0ef9b58/raw/d1ca241180eef44cad1d3147a5a70c47f383dc38/font-awesome-v5.0.1.json')
        .then(resp => {
            console.log(resp);
            this.setState({
                icons: [...resp.data.icons],
                iconsFilter: [...resp.data.icons]
            });
        })
        .catch(error => console.log(error));
    }
    
    
    render() {
        const {iconsFilter, search} = this.state;
        const iconName = iconsFilter ? iconsFilter.map(icon=>icon.substring(icon.indexOf('-')+1, 25)) : [];
        return (
            <div className="font-awesome">
                <h1><i className="fas fa-flag"></i> Font Awesome Icons 5</h1>
                <input type="text" value={search} onChange={this.handleChange} placeholder="Search icons for..."/>
                {
                    iconsFilter.length ? iconsFilter.map((icon, index) => 
                    <Icons key={index} icon={icon} name={iconName[index]} handleClick={this.handleClick}/>) : <p>Nothing to show !</p>
                }
            </div>
        );
    }
}

export default FontAwesome;
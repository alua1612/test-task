import React from 'react'
import ReactDOM from 'react-dom'
import './Sidebar.css';

export class Sidebar extends React.Component {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div className='Sidebar'>
                <a className='item'>Продукты</a>
                <a className='item'>Категории</a>
                <a className='item'>Чеки</a>
            </div>)
    }
}
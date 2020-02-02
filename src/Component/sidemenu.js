import React from "react";
import Sidebar from "react-sidebar";
import Icon from 'react-icons-kit';
import {ic_sort} from 'react-icons-kit/md/ic_sort'
import SearchHomeMain from './searchHomeMain'

 
class sidemenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {

    this.setState({ sidebarOpen: open });
  }
 
  render() {

    return (
      <Sidebar 
        sidebar=
        {
        <div className="sideMenuBar">
          <div className="MainMenu">
            <h5>Movie</h5>
            <h5>Show</h5>
            <h5>Anime</h5>
            <h5>Stand up</h5>
          </div>

          <div className="SubMenu">
            <p className="menuSubText">Apple</p>
            <p className="menuSubText">Apple</p>
            <p className="menuSubText">Apple</p>
            <p className="menuSubText">Apple</p>
            <p className="menuSubText">Apple</p>
            <p className="menuSubText">Apple</p>
            <p className="menuSubText">Apple</p>
          </div>

        </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", padding:"50px", width:"80vw" } }}
      >
        <button className="float_btn" onClick={() => this.onSetSidebarOpen(true)}>
          <Icon size={30} className="MenuIcon" icon={ic_sort}/>
        </button>
        <input className="float_btn search" placeholder="Title, Description, and Author"></input>
        <SearchHomeMain></SearchHomeMain>
      </Sidebar>
    );
  }
}
 
export default sidemenu;
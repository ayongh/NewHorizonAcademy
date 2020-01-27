import React from "react";
import Sidebar from "react-sidebar";
import BrowseMainContent from './browse_main_content'
import Icon from 'react-icons-kit';
import {search } from 'react-icons-kit/fa';
import {ic_sort} from 'react-icons-kit/md/ic_sort'
import {display} from 'react-icons-kit/icomoon/display'

 
class browse extends React.Component {
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
            <b>Sidebar content</b>
            <Icon size={50} className="icon" icon={display}/>
            <Icon size={50} className="icon" icon={search}/>

        </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", padding:"50px" } }}
      >
        <button className="float_btn" onClick={() => this.onSetSidebarOpen(true)}>
          <Icon size={30} className="MenuIcon" icon={ic_sort}/>
        </button>
        <BrowseMainContent></BrowseMainContent>
      </Sidebar>
    );
  }
}
 
export default browse;
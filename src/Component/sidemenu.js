import React from "react";
import Sidebar from "react-sidebar";
import axios from 'axios'
import Icon from 'react-icons-kit';
import {ic_sort} from 'react-icons-kit/md/ic_sort'
import {API_URL} from '../globalVariable'


import SearchHomeMain from './HomeMainPage'
import Browse from './browse'
import { Link} from "react-router-dom";

 
class sidemenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      redirctLoginPage:false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {

    this.setState({ sidebarOpen: open });
  }

  logout()
  {
    //Calls the post method to retrive the token and validate username and password
    axios.get(API_URL+'/user/logout', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
      
      if(res.status === 200)
      {
        this.setState({
          redirctLoginPage:true
        })
      }
      
    })
  }// logout
 
  render() {
    if(this.state.redirctLoginPage)
    {
      window.location.reload();
    }

    let component
    if(this.props.name === "HomeMainPage")
    {
      component = <SearchHomeMain/>
    }
    else if(this.props.name === "browse")
    {
      component = <Browse/>
    }

    return (
      <Sidebar 
        sidebar=
        {
        <div className="sideMenuBar">
          <div className="MainMenu_User">
            <h4>User Content</h4>
            <Link to='/profile' className="MainMenuList">
              <h4>profile</h4>
            </Link>
            <h4 className="MainMenuList" onClick={() => this.logout()}>Logout</h4>
          </div>

          <div className="MainMenu_content">
            <h4>Media Content</h4>
            <Link to='/Homepage' className="MainMenuList">
              <p>Home</p>
            </Link>
            <Link to='/browse/movie' className="MainMenuList">
              <p>Movie</p>
            </Link>
            <Link to='/browse/show' className="MainMenuList">
              <p>Show</p>
            </Link>
          </div>
        </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: {background: "white", padding:"50px", width:"auto" } }}
      >
        <button className="float_btn" onClick={() => this.onSetSidebarOpen(true)}>
          <Icon size={30} className="MenuIcon" icon={ic_sort}/>
        </button>
        <input className="float_btn search" placeholder="Title, Description, and Author"></input>
        
        {component}
      </Sidebar>
    );
  }
}
 
export default sidemenu;
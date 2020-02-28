import React from "react";
import Sidebar from "react-sidebar";
import axios from 'axios'
import Icon from 'react-icons-kit';
import {ic_sort} from 'react-icons-kit/md/ic_sort'
import SearchHomeMain from './HomeMainPage'
import { Redirect } from "react-router-dom";

 
class sidemenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,

      menuSelect:'searchHomeMain',

      redirctLoginPage: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {

    this.setState({ sidebarOpen: open });
  }

  logout()
  {
    localStorage.removeItem("authToken")

    //Calls the post method to retrive the token and validate username and password
    axios.get('http://localhost:3000/user/logout', {withCredentials: true, validateStatus: function (status) { return status >= 200 && status < 600; }}).then( res =>{
      this.setState({
        redirctLoginPage:true
      })
    })
  }// logout

  menuClicked(clickedvar)
  {
    alert(clickedvar)
  }
 
  render() {

    if(this.state.redirctLoginPage)
    {
      window.location.reload(false);
    }
    return (
      <Sidebar 
        sidebar=
        {
        <div className="sideMenuBar">
          <div className="MainMenu">
            <h4 className="MainMenuList" onClick={()=>this.menuClicked("Movie")}>Movie</h4>
            <h4 className="MainMenuList" onClick={()=>this.menuClicked("Show")}>Show</h4>
            <h4 className="MainMenuList" onClick={()=>this.menuClicked("browse")}>Browse</h4>
            <h4 className="MainMenuList" onClick={()=>this.menuClicked("Educational")}>Education</h4>
            <h4 className="MainMenuList" onClick={() => this.logout()}>Logout</h4>
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
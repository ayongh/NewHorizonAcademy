import React from "react";
import Sidebar from "react-sidebar";
import axios from 'axios'
import Icon from 'react-icons-kit';
import {ic_sort} from 'react-icons-kit/md/ic_sort'
import {API_URL} from '../globalVariable'

import AllBrowse from './allBrowseContent'

import {Link} from "react-router-dom";

 
class allBrowseSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      param:null,
      search:null,
      redirctLoginPage:false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  
  onSetSidebarOpen(open) {

    this.setState({ sidebarOpen: open });
  }

  componentDidMount(){
      this.setState({
        param : this.props.match.params.categorie
      })
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
            <Link to='/search/movie' className="MainMenuList">
              <p>search</p>
            </Link>
          </div>
        </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: {background: "white", padding:"50px", width:"auto",vzIndex:10001,height:"100%" } }}
      >
        <button className="float_btn" onClick={() => this.onSetSidebarOpen(true)}>
          <Icon size={30} className="MenuIcon" icon={ic_sort}/>
        </button>
        <AllBrowse urlparam ={this.props.match.params.categorie}/>
      </Sidebar>
    );
  }
}
 
export default allBrowseSideMenu;
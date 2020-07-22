import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openModalLogin, openModalRegister } from '../store/modal/actions';
import { connect } from 'react-redux';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import { MDBIcon } from 'mdbreact';
import { logout } from '../store/authentication/actions';
import { rootHistory } from '../App';

class Header extends React.Component {
  indexRef = React.createRef()
  aboutRef = React.createRef()
  registerRef = React.createRef()
  nameRef = React.createRef()
  logoutRef = React.createRef()
  xesoRef = React.createRef()
  xetaygaRef = React.createRef()
  saleRef = React.createRef()
  feedBackRef = React.createRef()
  managerRef = React.createRef()
  loginRef = React.createRef()

  onMouseEnter = name => () => {
    let classList = this[name].current.classList
    if (classList.length === 1) {
      classList.add("animated")
      classList.add("bounceIn")
      setTimeout(() => {
        classList.remove("animated")
        classList.remove("bounceIn")
      }, 600)
    }
  }

  render() {
    const styleLink = {
      color: '#ffff'
    }
    const active = {
      borderBottom: '1px solid white'
    }
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: 'rgba(0,0,0,1)', borderColor: '#F5DEB3' }}>
          <Link to='/' className='navbar-brand' style={{ color: '#00FFFF' }}>
            <svg height="50px" viewBox="0 -63 512 511" xmlns="http://www.w3.org/2000/svg"><path d="m391.03125 35.515625h-59.03125c-8.265625 0-14.96875 6.703125-14.96875 14.96875v18.066406c0 8.265625 6.703125 14.96875 14.96875 14.96875h59.03125c8.265625 0 14.96875-6.703125 14.96875-14.96875v-18.066406c0-8.265625-6.703125-14.96875-14.96875-14.96875zm0 0" fill="#ffc15a" /><path d="m285 51.515625h32.03125v32h-32.03125c-8.835938 0-16-7.160156-16-16 0-8.835937 7.164062-16 16-16zm0 0" fill="#aac0c1" /><path d="m480 328.484375c0 26.507813-21.492188 48-48 48s-48-21.492187-48-48c0-26.511719 21.492188-48 48-48s48 21.488281 48 48zm0 0" fill="#aac0c1" /><path d="m502.128906 296.453125h-141.722656c-6.96875 12.375-20.066406 20.03125-34.265625 20.03125h-316.011719v-7.558594c0-78.648437 63.757813-142.40625 142.40625-142.40625h70.933594c11.132812 0 20.15625 9.023438 20.15625 20.15625v89.808594h53.214844c18.066406 0 34.710937-9.820313 43.449218-25.636719 4.050782-7.332031 6.183594-15.574218 6.191407-23.953125l.144531-143.378906h35.5l27.664062 124.984375h4.382813c48.578125 0 87.957031 39.378906 87.957031 87.953125zm0 0" fill="#ffc15a" /><path d="m172 328.484375c0 26.507813-21.492188 48-48 48s-48-21.492187-48-48c0-26.511719 21.492188-48 48-48s48 21.488281 48 48zm0 0" fill="#aac0c1" /><path d="m198.027344 316.484375c0-40.886719-33.140625-74.03125-74.027344-74.03125-17.234375 0-33.09375 5.890625-45.675781 15.769531-.003907.003906-.007813.007813-.011719.007813-17.257812 13.554687-28.339844 34.609375-28.339844 58.253906zm0 0" fill="#ffe6c0" /><path d="m446 79.148438h-20c-11.046875 0-20-8.953126-20-20 0-11.046876 8.953125-20 20-20h20zm0 0" fill="#eff3f3" /><path d="m93.984375 10.503906h64.507813c11.046874 0 20 8.953125 20 20v116c0 11.042969-8.953126 20-20 20h-128.492188c-11.046875 0-20-8.957031-20-20v-52.019531c0-46.382813 37.601562-83.980469 83.984375-83.980469zm0 0" fill="#ff6977" /><path d="m234.992188 166.503906h-36.5c-11.042969 0-20-8.957031-20-20 0-11.046875 8.957031-20 20-20h36.5c11.046874 0 20 8.953125 20 20 0 11.042969-8.953126 20-20 20zm0 0" fill="#aac0c1" /><path d="m218.53125 366.453125c-2.632812 0-5.210938 1.070313-7.070312 2.929687-1.859376 1.859376-2.929688 4.441407-2.929688 7.070313s1.070312 5.210937 2.929688 7.070313c1.859374 1.859374 4.4375 2.929687 7.070312 2.929687 2.628906 0 5.207031-1.070313 7.070312-2.929687 1.859376-1.859376 2.929688-4.429688 2.929688-7.070313 0-2.628906-1.070312-5.210937-2.929688-7.070313-1.863281-1.859374-4.441406-2.929687-7.070312-2.929687zm0 0" /><path d="m417.707031 198.566406-23.304687-105.285156c6.289062-.851562 11.835937-4.050781 15.738281-8.683594 4.605469 2.878906 10.039063 4.550782 15.859375 4.550782h20c5.523438 0 10-4.476563 10-10v-40c0-5.523438-4.476562-10-10-10h-20c-5.992188 0-11.578125 1.773437-16.269531 4.816406-4.578125-5.175782-11.261719-8.449219-18.699219-8.449219h-59.03125c-10.605469 0-19.683594 6.652344-23.296875 16h-23.703125c-14.335938 0-26 11.664063-26 26s11.664062 26 26 26h51.472656v20.152344c0 5.523437 4.476563 10 10 10 5.523438 0 10-4.476563 10-10v-20.152344h17.5l25.101563 113.417969-47.507813 84.617187c-5.191406 9.210938-14.980468 14.933594-25.554687 14.933594h-118.597657c-4.964843-41.636719-40.464843-74.03125-83.414062-74.03125-19.003906 0-36.933594 6.191406-51.851562 17.902344-.019532.015625-.039063.03125-.058594.046875-17.761719 13.96875-28.925782 34.015625-31.527344 56.082031h-20.539062c1.304687-71.890625 60.191406-129.96875 132.382812-129.96875h70.9375c5.597656 0 10.15625 4.558594 10.15625 10.160156v89.808594c0 5.523437 4.476562 10 10 10h53.210938c21.707031 0 41.710937-11.804687 52.203124-30.800781 4.855469-8.789063 7.429688-18.742188 7.4375-28.777344l.050782-33.222656c.007812-5.523438-4.464844-10.007813-9.988282-10.015625-.003906 0-.007812 0-.011718 0-5.515625 0-9.992188 4.46875-10 9.984375l-.050782 33.230468c-.003906 6.671876-1.714843 13.289063-4.941406 19.128907-6.976562 12.625-20.273437 20.46875-34.699218 20.46875h-43.210938v-79.808594c0-5.121094-1.289062-9.949219-3.550781-14.179687 8.984375-5.191407 15.046875-14.894532 15.046875-25.992188 0-16.542969-13.460938-30-30-30h-36.5c-3.507813 0-6.871094.609375-10 1.71875v-87.71875c0-16.542969-13.460938-30-30-30h-64.511719c-46.765625 0-85.65625 34.335938-92.804687 79.117188-.300782.953124-.464844 1.964843-.464844 3.015624 0 .0625.007812.121094.007812.179688-.476562 3.828125-.722656 7.722656-.722656 11.671875v52.019531c0 15.019532 11.097656 27.496094 25.523438 29.664063l22.144531 22.144531c-29.339844 27.796875-47.667969 67.101562-47.667969 110.613281v7.558594c0 5.523437 4.476562 10 10 10h56.199219c-.128907.644531-.199219 1.316406-.199219 2 0 14.511719 5.371094 27.789063 14.214844 37.96875h-70.214844c-5.523438 0-10 4.480469-10 10 0 5.523437 4.476562 10 10 10h112.84375c.386719.011719.769531.03125 1.15625.03125 31.980469 0 58-26.019531 58-58 0-.683594-.070312-1.355469-.199219-2h144.210938c15.746093 0 30.460937-7.546875 39.683593-20.03125h12.664063c-2.847656 6.929687-4.359375 14.398437-4.359375 22.03125 0 14.511719 5.371094 27.789063 14.214844 37.96875h-129.683594c-5.523438 0-10 4.480469-10 10 0 5.523437 4.476562 10 10 10h172.3125c.386719.011719.769531.03125 1.15625.03125 31.980469 0 58-26.019531 58-58 0-7.632813-1.511719-15.101563-4.359375-22.03125h16.359375c5.523438 0 10-4.476563 10-10 0-52.785156-41.972656-95.953125-94.292969-97.886719zm-219.210937-62.0625h36.5c5.511718 0 10 4.484375 10 10 0 5.511719-4.488282 10-10 10h-36.5c-5.515625 0-10-4.488281-10-10 0-5.515625 4.484375-10 10-10zm-178.496094-42.019531c0-.617187.03125-1.230469.046875-1.847656h109.425781c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-106.175781c9.34375-30.164063 37.496094-52.132813 70.6875-52.132813h64.507813c5.515624 0 10 4.484375 10 10v116c0 5.511719-4.484376 10-10 10h-128.488282s-.003906 0-.007812 0c-5.511719 0-9.996094-4.488281-9.996094-10zm34.144531 82.019531h22.882813c-4.804688 2.742188-9.441406 5.746094-13.902344 8.980469zm107.855469 151.980469c0 20.824219-16.839844 37.78125-37.613281 37.988281-.128907-.003906-.257813-.019531-.386719-.019531h-1.152344c-20.421875-.613281-36.847656-17.402344-36.847656-37.96875 0-.683594-.070312-1.355469-.199219-2h76.398438c-.128907.644531-.199219 1.316406-.199219 2zm-101.257812-22c2.476562-15.886719 10.820312-30.238281 23.707031-40.359375.03125-.019531.058593-.046875.089843-.066406 11.351563-8.898438 24.996094-13.605469 39.460938-13.605469 31.90625 0 58.433594 23.457031 63.25 54.03125zm365.257812-257.335937h10v20h-10c-5.515625 0-10-4.484376-10-10 0-5.511719 4.484375-10 10-10zm-147 18.367187c0-3.308594 2.691406-6 6-6h22.03125v7.03125c0 1.703125.171875 3.363281.496094 4.96875h-22.527344c-3.308594 0-6-2.691406-6-6zm67.472656 6h-14.472656c-2.738281 0-4.96875-2.226563-4.96875-4.96875v-18.0625c0-2.738281 2.230469-4.96875 4.96875-4.96875h59.03125c2.738281 0 4.96875 2.230469 4.96875 4.96875v18.0625c0 2.742187-2.230469 4.96875-4.96875 4.96875zm123.527344 254.96875c0 20.824219-16.839844 37.78125-37.613281 37.988281-.128907-.003906-.257813-.019531-.386719-.019531h-1.152344c-20.421875-.613281-36.847656-17.402344-36.847656-37.96875 0-7.945313 2.476562-15.625 7.039062-22.03125h61.921876c4.5625 6.40625 7.039062 14.085937 7.039062 22.03125zm-92.636719-42.03125 38.132813-67.917969c38.941406.714844 71.003906 30.109375 75.863281 67.917969zm0 0" /><path d="m346.472656 163.667969c5.523438 0 10-4.476563 10-10 0-5.523438-4.476562-10-10-10h-.035156c-5.523438 0-9.984375 4.476562-9.984375 10 0 5.523437 4.496094 10 10.019531 10zm0 0" /></svg>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li 
                className="nav-item" 
                ref={this.indexRef} 
                onMouseEnter={this.onMouseEnter("indexRef")}
              >
                <NavLink to='/' exact activeStyle={active} className='nav-link' style={styleLink}>Trang chủ</NavLink>
              </li>
              <li 
                className="nav-item" 
                ref={this.aboutRef} 
                onMouseEnter={this.onMouseEnter("aboutRef")} 
              >
                <NavLink to='/about' activeStyle={active} className='nav-link' style={styleLink}>Giới thiệu</NavLink>
              </li>
              <li 
                className="nav-item" 
                ref={this.xesoRef} 
                onMouseEnter={this.onMouseEnter("xesoRef")} 
              >
                <NavLink to='/xe-so' activeStyle={active} className='nav-link' style={styleLink}>Xe số</NavLink>
              </li>
              <li 
                className="nav-item" 
                ref={this.xetaygaRef} 
                onMouseEnter={this.onMouseEnter("xetaygaRef")} 
              >
                <NavLink to='/xe-tay-ga' activeStyle={active} className='nav-link' style={styleLink}>Xe tay ga</NavLink>
              </li>
              <li 
                className="nav-item" 
                ref={this.saleRef} 
                onMouseEnter={this.onMouseEnter("saleRef")} 
              >
                <NavLink to='/sale' activeStyle={active} className='nav-link' style={styleLink}>Khuyến mãi</NavLink>
              </li>
              <li 
                className="nav-item" 
                ref={this.feedBackRef} 
                onMouseEnter={this.onMouseEnter("feedBackRef")} 
              >
                <NavLink to='/feedback' activeStyle={active} className='nav-link' style={styleLink}>Phản hồi</NavLink>
              </li>
              {(this.props.user.role > 0)?(
                <li 
                  className="nav-item" 
                  ref={this.managerRef} 
                  onMouseEnter={this.onMouseEnter("managerRef")} 
                >
                  <NavLink to='/manager' activeStyle={active} className='nav-link' style={{color: '#FCD353'}}>Quản lý</NavLink>
                </li>
              ):""}
            </ul>
            {this.props.user.name!=='' ? (
              <ul className="navbar-nav navbar-right nav">
                <li 
                  className="nav-item" 
                  ref={this.nameRef} 
                  onClick={()=>{rootHistory.push('/profile/info')}} 
                  onMouseEnter={this.onMouseEnter("nameRef")} 
                >
                  <NavLink to='/profile' activeStyle={active} className='nav-link' style={styleLink}>
                    <FontAwesomeIcon icon="user"></FontAwesomeIcon> Xin chào: {this.props.user.name}!
                  </NavLink>
                </li>
                <li 
                  className="nav-item" 
                  ref={this.logoutRef} 
                  onClick={this.props.onLogout} 
                  onMouseEnter={this.onMouseEnter("logoutRef")} 
                >
                  <div className='nav-link' style={{ ...styleLink, cursor: 'pointer' }} >
                    <MDBIcon icon="sign-out-alt" /> Đăng xuất
                  </div>
                </li>
              </ul>
            ) : (
                <ul className="navbar-nav navbar-right nav">
                  <li 
                    className="nav-item" 
                    ref={this.registerRef} 
                    onClick={() => this.props.showRegister()} 
                    onMouseEnter={this.onMouseEnter("registerRef")} 
                  >
                    <div className='nav-link' style={{ ...styleLink, cursor: 'pointer' }} >
                      <FontAwesomeIcon icon="user"></FontAwesomeIcon> Đăng ký
                    </div>
                  </li>
                  <li 
                    onClick={() => this.props.showLogin()} 
                    ref={this.loginRef}
                    className="nav-item" 
                    onMouseEnter={this.onMouseEnter("loginRef")} 
                  >
                    <div className='nav-link' style={{ ...styleLink, cursor: 'pointer' }} >
                      <FontAwesomeIcon icon="sign-in-alt"></FontAwesomeIcon> Đăng nhập
                    </div>
                  </li>
                </ul>
              )
            }
          </div>
        </nav>
        <ModalLogin></ModalLogin>
        <ModalRegister></ModalRegister>
      </>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   showLogin: () => dispatch(openModalLogin()),
//   showRegister: () => dispatch(openModalRegister()),
//   onLogout: () => dispatch(logout())
// });

const mapDispatchToProps = {
  showLogin: openModalLogin,
  showRegister: openModalRegister,
  onLogout: logout
}

const mapStateToProps = state => ({
  user: state.authen
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
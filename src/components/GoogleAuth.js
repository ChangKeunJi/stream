import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // Initilaize Oauth library when this compoenent is rendered.
  componentDidMount() {
    // Variable "gapi" in Window scope.
    window.gapi.load("client:auth2", () => {
      // After loading is done, this function gets called.
      window.gapi.client
        .init({
          clientId:
            "228088736002-6lb0umvs92anmc9ob64u8gng0uq0m4gu.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          // Whenever there is a change in isSignedIn, onAuthChange gets called.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

//! this.auth vs const auth
// By assigning to this.auth, it is available throughout
//the class instance. If you are assigning using const auth,
//you will need to repeat this assignment throughout the component like so:

//! Connecting auth to Redux
// Other components need to know wheter it's signed in or not
// So, we're going to connect with Redux
// And Google Auth component will get user status from REDUX not in component.

//! Redux Flow
// GoogleAuth Component / onAuthChange() <==> GAPI Auth2
// => Action Creators / signIn(), signOut()
// => Redux Store / Auth State
// => GoogleAuth Component
// => Action Creators

//! isSignedIn.listen()
//GoogleAuth.isSignedIn.listen(listener)

//listener:
//A function that takes a boolean value. listen() passes
//true to this function when the user signs in, and false when the user
//signs out.
//this.onAuthChange is the "listener" that is passed true or false by
//the listen() method. The reason we are not using () is because we are
//not invoking this.onAuthChange, we are passing it as a reference.

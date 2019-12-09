import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
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

export default GoogleAuth;

// By assigning to this.auth, it is available throughout
//the class instance. If you are assigning using const auth,
//you will need to repeat this assignment throughout the component like so:

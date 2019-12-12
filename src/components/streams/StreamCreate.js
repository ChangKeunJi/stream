import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends Component {
  renderInput({ input, label }) {
    // console.log(input);
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  }

  onSubmit(formValue) {
    console.log(formValue);
  }

  render() {
    // console.log(this.props);
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  if (!formValues.title) {
    const errors = {};

    if (!formValues.title) {
      errors.title = "You muse enter a title";
    }

    if (!formValues.description) {
      errors.description = "You must enter a description";
    }
  }
};

export default reduxForm({
  form: "streamCreate",
  validate: validate
})(StreamCreate);

// How Redux Form works?
// It takes card of all the communication between
// Redux store and Component. Like, Action and mapStateToProps.

// Field => Component itself
// reduxForm => Kind of connect function.
// Connect between component and Redux store.

// Field itself doesn't know how to display input.
// So It needs component property

// Field Component doesn't know what to do with label or other property.
// So It just put into renderInput function as a prop

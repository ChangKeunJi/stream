import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../apis/streams";

class StreamCreate extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // rnderInput function gets called in Field Component.
  // And It doesn't know what is "this" exactly in renderError.
  // So we change renderInput function to Arrow function.
  renderInput = ({ input, label, meta }) => {
    // console.log(input, label);
    // console.log(meta);
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit(formValue) {
    console.log(formValue);
  }

  render() {
    // console.log(this.props);
    // Because of Redux Form, Lot of properties passed to this.props.
    return (
      <form
        className="ui form error"
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

// Valid input => Empty object
// Invalid input => Key-Value pair + Error message.
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

// Validate gets called when Form is rendered OR
// User interacts with it about anything.

// Name property of Field is connected with errors object.

export default reduxForm({
  form: "streamCreate",
  validate
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

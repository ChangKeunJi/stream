import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/stream/new" exact component={StreamCreate} />
          <Route path="/stream/edit" exact component={StreamEdit} />
          <Route path="/stream/delete" exact component={StreamDelete} />
          <Route path="/stream/show" exact component={StreamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

//! Client ID
// 228088736002-6lb0umvs92anmc9ob64u8gng0uq0m4gu.apps.googleusercontent.com

// Browser Router creates 'history' object which keeps track of the address bar in the browser.
// Navigate with 'achor tag' is not good. It's making a brand new request. That means all the data stored got dumped.

//! Types of Router
// 1) BrowserRouter / localhost:3000/pagetwo
// Uses everything after the TLD(Top Level Domain) or port as the 'path'
// If server can't find any router, It'll give index.html whatsoever instead of 404 error.

// 2) HashRouter / localhost:3000/#/pagetwo
// Uses everything after a # as the 'path'

// 3) MemoryRouter / localhost:3000/
// Don't use the URL to track navigation.

//! Error: You should not use <Link> outside a <Router>
// Component which contains react-router related stuff should be nested in BrowserRouter.

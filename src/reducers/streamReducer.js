import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/type";

import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS: // List all records // Need to change array to object.
      return { ...state, ..._.mapKeys(action.payload, "id") }; // Change array to object
    case FETCH_STREAM: // Get one particular record
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM: // Create recored
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM: // Update a record
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM: // Remove a record
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

//! mapKeys(arr,"key")
// mapKeys(action.payload, "id")

//! Array-based approach

// const streamReducer = (state = [], action) => {
//   switch (action.type) {
//     case EDIT_STREAM:
//       return state.map(stream => {
//         if (stream.id === action.payload.id) {
//           return action.payload;
//         } else {
//           return stream;
//         }
//       });
//     default:
//       return state;
//   }
// };

//! Object-based approach

// const streamReducer = (state={0. action}) => {
//   switch (action.type) {
//     case EDIT_STREAM:
//! Options 1
//       const newState = {...state};
//       newState[action.payload.id] = action.payload;
//       return newState;
//! Option 2 ES6
//       return {...state, [action.payload.id]: action.payload}
//     default:
//       return state;
//   }
// }

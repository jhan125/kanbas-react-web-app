import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunction";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariables";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import HelloRedux from "./ReduxExamples/HelloRedux";
import CounterRedux from "./ReduxExamples/CounterRedux";
import AddRedux from "./ReduxExamples/AddRedux";
import TodoList from "./ReduxExamples/todos/TodoList";
import App from "../../Q7/App"


export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4" className="container-fluid">
      <h3>Lab 4</h3>

      {/* 2.2 Handling User Events */}
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />

      {/* 2.3 Managing Component State */}
      {/* application state = collection of data structures and values
          Controllers = handle user events and convert them into changes in the application’s state. 
          user interface shows application state changes after rendering
          user interface changes consist of changes to the DOM
      */}
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />

      {/* 2.4 Managing Application State */}
      <ReduxExamples />
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />

      {/* X1 exam */}
      {/* <Fds /> */}
      {/* <Acme /> */}
      {/* <Fds d={{ b: "a" }} /> */}
      {/* <Mnb d={["a"]} /> */}
      
       {/* Q7 */}
      <App />

    </div>
  );
}
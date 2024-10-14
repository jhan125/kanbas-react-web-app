import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindFIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import TodoItem from "./TodoItem";
import TodoList from "./TodoList";
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import AddPathParameters from "./AddPathParameters";
import PathParameters from "./PathParameters";

export default function Lab3() {
  console.log('Hello World!');


  return (
    <div>
      <h2>Lab 3</h2>
      {/* 2.2 JavaScript Basics*/}
      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables/>
      <IfElse/>
      <TernaryOperator/>
      <ConditionalOutputIfElse/>
      <ConditionalOutputInline/>

      {/* 2.3 JavaScript Functions */}
      <LegacyFunctions/>
      <ArrowFunctions/>
      <ImpliedReturn/>
      <TemplateLiterals/>

      {/* 2.4 JavaScript Data Structures */}
      <SimpleArrays/>
      <ArrayIndexAndLength/>
      <AddingAndRemovingToFromArrays/>
      <ForLoops/>
      <MapFunction/>
      <FindFunction/>
      <FindFIndex/>
      <FilterFunction/>
      <JsonStringify/>
      <House/>
      <TodoItem/>
      <TodoList/>
      <Spreading/>
      <Destructing/>
      <FunctionDestructing/>
      <DestructingImports/>

      {/* 2.5 Dynamic Styling */}
      <Classes/>
      <Styles/>

      {/* 2.6 Parameterizing Components */}
      <Add a={3}   b={4} />

      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />

      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>

      <PathParameters/>

      {/* 2.7 Debugging */}

    </div>
  );
}
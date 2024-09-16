import { Link } from "react-router-dom";

export default function TOC() {
  return (
    <ul>
      <li><Link id="wd-labs" to="/Labs">Labs</Link></li>
      <li><Link id="wd-lab1" to="/Labs/Lab1">Lab 1</Link></li>
      <li><Link id="wd-lab2" to="/Labs/Lab2">Lab 2</Link></li>
      <li><Link id="wd-lab3" to="/Labs/Lab3">Lab 3</Link></li>
      <li><Link id="wd-kanbas" to="/Kanbas">Kanbas</Link></li>
      <li><Link id="wd-github" to="https://github.com/jhan125/kanbas-react-web-app/tree/a1">Github</Link></li>
    </ul>
  );
}
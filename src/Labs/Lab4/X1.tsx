import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";

// export default function Fds() {
//   const u = [1, 9, 3, 8, 6, 5, 7, 4, 2];
//   return (
//     <ul>
//       {u.filter((f) => f > 5)
//         .map((s) => (
//           <li key={s}>{s}</li>
//         ))}
//     </ul>
//   );
// }

// import { multiply } from "../Lab3/Math";

// export default function Fds() {
//   const [b, x, r] = 
//      ["p", "v", "j"]; 
//   return (
//     <div>
//       u = {b} <br /> 
//       w = {x} <br /> 
//       j = {r}      
//     </div>
//   );
// }


// export default function Fds() {
//   const a = ["x", "c", "y", "d", "z"];
//   const g= a.filter((h) => h === "c");
//   return <div>output = {g}</div>;
// }

// ----------------
// QQ4

// function Def() {
//   const { v, t } = useParams<{ v: string; t: string }>();
//   const vNum = Number(v);
//   const tNum = Number(t);
//   return (
//     <div>
//       {v} x {t} = {vNum * tNum}
//     </div>
//   );
// }

// export default function Fds() {
//   return (
//     <div>
//       <Link to="a/3/5">Def</Link>
//       <Routes>
//         <Route path="a/:v/:t" element={<Def />} />
//       </Routes>
//     </div>
//   );
// }


// import { useState } from 'react';

// function Fds() {
//   const [x, h] = useState(true); // __1__ is x, __2__ is true
//   return (
//     <div>
//       <button onClick={() => { h(false); }}>R</button> {/* __3__ is h, __4__ is false */}
//       <input type="checkbox" checked={x} onChange={() => h(!x)} id="q" /> {/* __5__ is q */}
//       <label htmlFor="s">Q</label> {/* Fix the for attribute to match the checkbox ID */}
//       {x && <h1>P</h1>} {/* Renders P when x is true */}
//       {!x && <h1>K</h1>} {/* Renders K when x is false */}
//     </div>
//   );
// }

// export default Fds;

// export default function Fds() {
//   const q = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   return (
//     <ul>
//       {q.map((s) => (
//         <li key={s}>
//           2 x {s} = {2 * s}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default function Fds(
//   { d = { b: "c" } }) { // __1__ is d
//   const a = {
//     b: "b",
//     c: 1,
//   };
//   const e = { // __3__ is e
//     ...a,
//     ...d, // __4__ is d
//   };
//   return (
//     <ul>
//       <li>{e.c}</li> 
//       <li>{e.b}</li> 
//     </ul>
//   );
// }


// function Def() {
//   const { pathname } = useLocation();
//   return (
//     <div>
//       output =
//       {pathname.includes("s") && <span>p</span>}
//       {pathname.includes("w") && <span>y</span>}
//     </div>
//   );
// }

// export default function Fds() {
//   return (
//     <div>
//       <Link to="q/w" style={{ marginRight: '10px' }}>x</Link>
      
//       <b/>

//       <Link to="q/s">r</Link>

//       <Routes>
//         <Route path="q/:a" element={<Def />} />
//       </Routes>
//     </div>
//   );
// }

// Fill in the blanks 12345 as in the code with underline, 
// so that the component renders as described below.

// 13???????

// function Def({ a }) {
//   const { c, d } = b;
//   return (
//     <pre>
//       {c} <br /> {d}
//     </pre>
//   );
// }

// const b = {
//   c: "e",
//   d: "f",
// };

// export default function Fds() {
//   return <Def a={b} />;
// }

// export default function Fds(
//   { d = { b: "c" } }) {

//   const a = {
//     b: "b",
//     c: 1,
//   };

//   const e = {
//     ...a,
//     ...d,
//   };

//   return (
//     <ul>
//       <li>{e.c}</li>
//       <li>{e.b}</li>
//     </ul>
//   );
// }

// function Def
// ({ a, b }: 
//   {
//   a: any,
//   b: any
// }) 
// {
//   return (
//     <div>
//       {a} times {b} = {a * b}
//     </div>
//   );
// }
// export default function Fds() {
//   const q = [2, 3];
//   const [x, y] = q;
//   return <Def a={x} b={y} />;
// }




// export default function Fds() {
//   const q = [
//     { a: 1, w: "g" },
//     { a: 2, w: "t" },
//     { a: 1, w: "j" },
//   ];
//   return (
//     <ul>
//     {
//       q.map((s, d) => (
//         <li key={s.a}>{s.w}</li>
//       ))
//     }
//     </ul>
//   );
// }


// export default function Mnb({ d = ["c"] }) { 
//   const a = ["b", 1];
//   const e = [...a, ...d, ...a]; 
//   return (
//     <div>
//       <p>{e.join("")}</p> 
//     </div>
//   );
// }


import { useState } from "react";

// export default function Fds() {
//   const [a, b] = useState({ c: "q", d: 27 });

//   const x = (e) => b({ ...a, c: e.target.value});
//   const y = (s) => b({ ...a, d: parseInt(s.target.value) });

//   return (
//     <div>
//       <input id="r" value={a.c} onChange={x} />
//       <input id="t" value={a.d} onChange={y} />
//       {JSON.stringify(a, null, 2)}
//     </div>
//   );
// }

// export default function Acme() {
//   const [q, g] = useState(0);
//   const [x, j] = useState(1);
//   const [k, h] = useState(1);
//   const p = () => {
//     h(k + x);
//     g(x);
//     j(k);
//   };
//   return (
//     <div>
//       W = {q}
//       U = {x}
//       F = {k}
//       <button onClick={p}>M</button>
//     </div>
//   );
// }


// export default function Acme() {
//   const [q, p] = useState({ w: "C", o: 25 });
//   const e = () => {
//     p({ ...q, w: "K" });
//   };
//   const u = (r: number) => {
//     p({ ...q, o: r });
//   };
//   return (
//     <div>
//       <h3>G: {q.w}</h3>
//       <h3>Y: {q.o}</h3>
//       <button onClick={e}>M</button>
//       <button onClick={() => u(30)}>H</button>
//     </div>
//   );
// }

// export default function Fds() {
//   const [n, m] = useState(0);
//   const [f, g] = useState(0);
//   const d = () => {
//     let h = 1;
//     for (let i = 1; i <= n; i++) {
//       h = h * i;
//     }
//     g(h);
//   };
//   return (
//     <div>
//       <button onClick={() => m(n + 1)}> T </button>
//       <button onClick={d}> C </button>
//       J: {n}
//       Q: {f}
//     </div>
//   );
// }
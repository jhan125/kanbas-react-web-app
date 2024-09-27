import { AiOutlineStop } from "react-icons/ai";
export default function ProhibitMark() {
  return (
    <span className="me-1 position-relative">
      <AiOutlineStop
        style={{ top: "2px" }}
        className=" text-gray position-relative fs-5 "
      />
    </span>
  );
}
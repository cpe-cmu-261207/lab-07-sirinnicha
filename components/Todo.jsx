import React, { useState } from "react";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Todo(props) {
  const LineSpan = () => (
    <span className="me-auto " style={mystyle}>
      {props.title}
    </span>
  );
  const Wow = () => (
    <div>
      <button className="btn btn-success" onClick={props.markFn}>
        <IconCheck />
      </button>
      <button className="btn btn-secondary" onClick={props.onMoveUp}>
        <IconArrowUp />
      </button>
      <button className="btn btn-secondary" onClick={props.onMoveDown}>
        <IconArrowDown />
      </button>
      <button className="btn btn-danger" onClick={props.deleteFn}>
        <IconTrash />
      </button>
    </div>
  );
  const NormalSpan = () => <span className="me-auto ">{props.title}</span>;

  const mystyle = {
    textDecoration: "line-through",
  };

  const [show, setShow] = useState(false);
  function onClickHn() {
    if (show === false) setShow(true);
  }
  function aiHereRich() {
    setShow(false);
  }

  return (
    <div
      className="border-bottom p-1 py-2 fs-2 d-flex gap-2"
      onMouseEnter={() => onClickHn()}
      onMouseLeave={() => aiHereRich()}
    >
      {props.completed ? <LineSpan /> : <NormalSpan />}
      {!show ? null : <Wow />}
    </div>
  );
}

import React, { useState, useRef } from "react";
import Modal from "./Modal";

const Container = (props) => {

  return <div>{props.isModalShownState ? <Modal /> : null}</div>;
};

export default Container;

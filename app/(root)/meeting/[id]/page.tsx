import React from "react";

const Meeting = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return <div>{params.id}</div>;
};

export default Meeting;

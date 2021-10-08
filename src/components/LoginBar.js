import React from "react";

function LoginBar(props) {
  console.log(props.result);
  return (
    <div>
      <div className="grid grid-cols-6">
        <input
          className="border-2 rounded-lg py-3 mt-2 mx-2 px-6 col-start-3"
          value={props.result[0]}
          placeholder={props.placeholder[0]}
          onChange={(e) => props.loginChange(e, "email")}
          name={props.name[0]}
        />
        <input
          className="border-2 rounded-lg py-3 mt-2 mx-2 px-6"
          value={props.result[1]}
          placeholder={props.placeholder[1]}
          onChange={(e) => props.loginChange(e, "password")}
          name={props.name[1]}
          type={props.name[1]}
        />
      </div>
      <div className="text-center mt-4">
      <button className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white">Submit</button>
      <button className="bg-red-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white">Log Out</button>
      </div>
    </div>
  );
}

export default LoginBar;

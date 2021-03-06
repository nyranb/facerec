import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signout")}
          className="fa3 link dim black pa3 underline"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="fa3 link dim black pa3 underline"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="fa3 link dim black pa3 underline"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;

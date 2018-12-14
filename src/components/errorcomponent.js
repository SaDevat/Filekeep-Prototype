import React, { Component } from "react";

class Error extends Component {
  state = {
    openerror: false
  };

  componentDidMount() {
    if (this.props.duration) {
      setTimeout(() => {
        this.props.seterrordisplay(false);
      }, this.props.duration);
    } else {
      setTimeout(() => {
        this.props.seterrordisplay(false);
      }, 3000);
    }
  }

  render() {
    var classname = "alert ";

    switch (this.props.status) {
      case "y":
        classname += "alert-warning";
        break;

      case "r":
        classname += "alert-danger";
        break;

      case "g":
        classname += "alert-success";
        break;

      default:
        classname += "alert-warning";
        break;
    }

    return (
      <div
        style={{
          position: "absolute",
          top: "65px",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        <div className={classname}>
          {this.props.message}
          <br />
          {this.props.error && (
            <div
              className="subtext text-left"
              style={{ cursor: "pointer" }}
              onClick={() =>
                this.setState({ openerror: !this.state.openerror })
              }
            >
              {this.state.openerror ? "hide" : "More information"}
            </div>
          )}
          {this.state.openerror && (
            <div className="subtext text-left">{this.props.error}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Error;

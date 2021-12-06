import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";

const particleOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: "top",
      out_mode: "out",
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: {},
      route: 'signin',
      isSignedIn: false,
    }
  }
  
  calculateFaceLoc = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({boxes: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onBtnSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs", 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 86ec710882a84605923f2e0a61801762'
      },
      body: JSON.stringify({
        "user_app_id": {
          "user_id": "tpl2kw87n0jj",
          "app_id": "4bc3fa735332455d8631a55184a0c8e8"
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": (this.state.input)
              }
            }
          }
        ]
      })
    })
      .then(response => response.text())
      .then(result => {
        this.displayBox(this.calculateFaceLoc(JSON.parse(result)))} )
      .catch(error => console.log('error', error))
  }

  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState({isSignedIn: false})
    } else if(route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {
    const {isSignedIn, route, boxes, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === "home"
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onBtnSubmit}  
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div> 
          : (
              route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>       
    );
  };
}
export default App;

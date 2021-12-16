import { Component } from "react";
import { Navigation } from "./components/Navigation/Navigation";
import { Logo } from "./components/Logo/Logo";
import { Rank } from "./components/Rank/Rank";
import { ImageLinkForm } from "./components/ImageLinkForm/ImageLinkForm"; 
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition"; 
import { Signin } from "./components/Signin/Signin";
import { Register } from "./components/Register/Register";
import Particles from "react-tsparticles";
import './App.css';

const url = "https://young-gorge-85051.herokuapp.com"

const particleOptions = {
  "fullScreen": {
    "zIndex": 1
  },
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "onHover": {
        "enable": true,
        "mode": "repulse",
        "parallax": {
          "force": 60
        }
      }
    },
    "modes": {
      "bubble": {
        "distance": 400,
        "duration": 2,
        "opacity": 0.8,
        "size": 40
      },
      "grab": {
        "distance": 400
      }
    }
  },
  "particles": {
    "color": {
      "value": "#ffffff"
    },
    "links": {
      "color": {
        "value": "#ffffff"
      },
      "distance": 150,
      "enable": true,
      "opacity": 0.4
    },
    "move": {
      "attract": {
        "rotate": {
          "x": 600,
          "y": 1200
        }
      },
      "enable": true,
      "outModes": {
        "bottom": "out",
        "left": "out",
        "right": "out",
        "top": "out"
      }
    },
    "number": {
      "density": {
        "enable": true
      },
      "value": 80
    },
    "opacity": {
      "value": {
        "min": 0.1,
        "max": 0.5
      },
      "animation": {
        "enable": true,
        "speed": 1,
        "minimumValue": 0.1
      }
    },
    "shape": {
      "options": {
        "character": {
          "value": [
            "t",
            "s",
            "P",
            "a",
            "r",
            "t",
            "i",
            "c",
            "l",
            "e",
            "s"
          ],
          "font": "Verdana",
          "style": "",
          "weight": "400",
          "fill": true
        },
        "char": {
          "value": [
            "t",
            "s",
            "P",
            "a",
            "r",
            "t",
            "i",
            "c",
            "l",
            "e",
            "s"
          ],
          "font": "Verdana",
          "style": "",
          "weight": "400",
          "fill": true
        }
      },
      "type": "char"
    },
    "size": {
      "value": 16,
      "animation": {
        "speed": 10,
        "minimumValue": 10
      }
    },
    "stroke": {
      "width": 1,
      "color": {
        "value": "#ffffff",
        "animation": {
          "h": {
            "count": 0,
            "enable": false,
            "offset": 0,
            "speed": 1,
            "sync": true
          },
          "s": {
            "count": 0,
            "enable": false,
            "offset": 0,
            "speed": 1,
            "sync": true
          },
          "l": {
            "count": 0,
            "enable": false,
            "offset": 0,
            "speed": 1,
            "sync": true
          }
        }
      }
    }
  }
}

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState
  }

  loadUser = data => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
    }})
  }

  calculatefaceLocation = data => {

    const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);

    if (clarifaiFaces) {

      const $image = document.getElementById("inputimage")
      const width = Number($image.width);
      const height = Number($image.height);

      return clarifaiFaces.map(face => {
        return {
          topRow: height * face.top_row,
          rightCol: width - (face.right_col * width),
          bottomRow: height - (face.bottom_row * height),
          leftCol: width * face.left_col ,
        }
      });
    } else {
      console.error("Image url error");
    }
  };

  displayfaceBox = boxes => {
    this.setState({boxes: boxes})
  }

  onInputChange = event => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = async () => {
 
    this.setState(state => ({imageUrl: state.input}));


    try {

      const imageResponse = await fetch(`${url}/imageurl`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          input: this.state.input, 
        })
      })

    if (!this.state.input || !imageResponse) return;

      const imageResponseJson = await imageResponse.json()

      if (imageResponseJson) {
        const entrieResponse = await fetch(`${url}/image`, {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id, 
          })
        });

        const count = await entrieResponse.json();

        const user = {...this.state.user, entries: count}
        this.setState({ user })
      }

      this.displayfaceBox(this.calculatefaceLocation(imageResponseJson))  

    } catch (err) {
      console.log(err)
    }
  }

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {

    const { isSignedIn, imageUrl, boxes } = this.state;

    return (
      <div className="App">
        <Particles options={particleOptions} className="fixed top-0 bottom-0 left-0 right-0 -z-10" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === "home"
            ? <>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition boxes={boxes} imageUrl={imageUrl} /> 
            </>
            : ( this.state.route === "signin"
              ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} url={url} />
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} url={url}/>
           )
        }
      </div>      
    )
  }
}

export default App;

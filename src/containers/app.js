import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { serie, series } from '../api'

import '../styles/libraries/bootstrap.min.css'
import '../styles/components/series.css'
import '../styles/components/loader.css'

const App = () => (
  <Router>
    <div className="container">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/series" className="nav-link">Series</Link>
        </li>
      </ul>

      <Route exact path="/" component={Home} />

      <section className="series">
        <div className="container">
          <Route path="/series" component={Series} />
        </div>
      </section>

      <Route path="/serie/:serie" component={Serie} />
    </div>
  </Router>
);

const Home = () => (
  <div className="container">
    <h2>Hello, welcome to Marvel Series</h2>
  </div>
);

class Series extends Component {
  constructor() {
    super()

    this.state = {
      series: { },
    }
  }
  componentDidMount() {
    series.get('', { params: { limit: 100 }})
      .then(response => {
        this.setState({
          series: response.data.data.results
        })

        console.log(response.data.data.results)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }
  render() {
    if (this.state.series.length) {
      return this.state.series.map((serie) => {
        return (  
          <div className="col-3">       
            <div className="card">
              <img className="card-img-top" src={serie.thumbnail.path + '.' + serie.thumbnail.extension} />
              <div className="card-body">
                <h3 className="card-title">{serie.title}</h3>
                <Link to={`/serie/${serie.id}`} className="btn btn-primary">View</Link>
              </div>
            </div> 
          </div>         
        )
      })    
    } else {
      return (
        <div className="loader"> <div class="circle-spin"></div><span> Loading </span></div>
      )
    }
  }
}

class Serie extends Component {
  constructor(match) {
    super(match)

    this.state = {
      serie: { title: '', thumbnail: { path: '', extension: '' }, description: '' },
    }

    this.serie = match.match.params.serie
  }
  componentDidMount() {
    serie(this.serie).get('')
      .then(response => {
        this.setState({
          serie: response.data.data.results[0]
        })
      })
      .catch((error) => {
        console.log("error", error)
      })
  }
  render() {
    return (
      <div className="container">
          <div className="col-6">
            <img src={this.state.serie.thumbnail.path + '.' + this.state.serie.thumbnail.extension }/>
          </div>
          <div className="col-6">
            <h3>{ this.state.serie.title  }</h3>
            <p>{ this.state.serie.description }</p>
          </div>
      </div>
    )  
  }
}

export default App;
import React, { Component } from 'react';

class Helpers extends Component {
  render () {
    return (
      <div>
        <br/>
        Helpers:
        <br/>
        <a href="?income=600000&formue=2000000&married=true&finnmark=false&fradrag=120000">
          G: 137649</a>
        <br/>
        <a href="?income=600000&formue=2000000&married=false&finnmark=false&fradrag=120000">
          U: 142069</a>
        <br/>
        <a href="?income=600000&formue=2000000&married=true&finnmark=true&fradrag=120000">
          FG: 1231200</a>
        <br/>
        <a href="?income=600000&formue=2000000&married=false&finnmark=true&fradrag=120000">
          F: 127540</a>
        <br/>
        <a href="?income=600000&formue=2000000&married=false&finnmark=true&fradrag=120000&monthly=true">
          F-Montly: 2954037</a>
        <br/>
        <a href="?income=600000&formue=3500000&married=true&finnmark=true&fradrag=200000&kapital=120000">
          KU: 135510</a>
        <hr/>
      </div>
    );
  }
}

export default Helpers;
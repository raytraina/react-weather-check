
class GetWeatherButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value:''};
      this.handleChange = this.handleChange.bind(this);
      this.getWeather = this.getWeather.bind(this);
    }

    handleChange(event) {
      this.setState({value:event.target.value});
      console.log("state change");
    }

    getWeather(event) {
      event.preventDefault();
    
      $.ajax({
          type: 'post',
          url: "/get-weather.json",
          data: {'location':this.state.value},
          async: false,
          success: function (response) {
              console.log(response);
          }
      }).done(function (data) {
          console.log(data);
      });
    }


    render() {
      return  (
              <form onSubmit={this.getWeather}>
                <input type="text" value={this.state.value} onChange={this.handleChange} name="location-name" />
                <input type="submit" value="Tell me now!" />
              </form>
      );
    }
}


ReactDOM.render(
    <GetWeatherButton />,
    document.getElementById('root'),
);
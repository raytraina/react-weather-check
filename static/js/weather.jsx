
class GetWeatherForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value:'',
        locDescription:'',
        locTemp:'',
        locDay:false,
        redirect:false
      };
      this.handleChange = this.handleChange.bind(this);
      this.getWeather = this.getWeather.bind(this);
    }

    handleChange(event) {
      this.setState({value:event.target.value});
      console.log("state change");
    }

    getWeather(event) {
      event.preventDefault();
      var respData;
    
      $.ajax({
          type: 'post',
          url: "/get-weather.json",
          data: {'location':this.state.value},
          async: false,
          success: function (resp) {
            console.log(resp);
            
          }
      }).done(function (data) {
          respData = data;
          // if (data.locDay) {
          //   alert("Today will be " + data.locDescription.toLowerCase() + " and " + data.locTemp + "°F");
          // } else {
          //   alert("This evening will be " + data.locDescription.toLowerCase() + " and " + data.locTemp + "°F");
          // }
      });

      this.setState({
        locDescription: respData.description,
        locTemp: respData.temp,
        locDay: respData.is_day,
        redirect:true
      });

      setTimeout(() => {
        this.showResults();
      }, 1000);
    }

    showResults() {
      if (this.state.locDay) {
        $('#resultsDiv').append("Today will be " + this.state.locDescription.toLowerCase() + " and " + this.state.locTemp + "°F");
      } else {
        $('#resultsDiv').append("This evening will be " + this.state.locDescription.toLowerCase() + " and " + this.state.locTemp + "°F");
      }
      $('#weatherForm').toggle();
      $('#resultsDiv').toggle();
    }


    render() {
      return  (
        <div>
          <div id="weatherForm">
            <form onSubmit={this.getWeather}>
              <input type="text" value={this.state.value} onChange={this.handleChange} name="location-name" />
              <input type="submit" value="Tell me now!" />
            </form>
          </div>
          <div id="resultsDiv" hidden></div>
        </div>
      );
    }
}


ReactDOM.render(
    <GetWeatherForm />,
    document.getElementById('root'),
);

var resultsDivStyle = {};
var icon;
var isJacket;

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
          resultsDivStyle = {
            color: data.ui_attributes.font_color,
            backgroundColor: data.ui_attributes.bg_color,
            height:200
          }
          icon = data.ui_attributes.icon;
          isJacket = data.ui_attributes.is_jacket;
      });

      this.setState({
        locDescription: respData.weather_obj.description,
        locTemp: respData.weather_obj.temp,
        locDay: respData.weather_obj.is_day,
        redirect:true
      });

      setTimeout(() => {
        this.showResults();
      }, 1000);
    }

    showResults() {
      if (this.state.locDay) {
        $('#resultsText').append("Today will be " + this.state.locDescription.toLowerCase() + " and " + this.state.locTemp + "°F");
      } else {
        $('#resultsText').append("This evening will be " + this.state.locDescription.toLowerCase() + " and " + this.state.locTemp + "°F");
      }
      if (isJacket) {
        $('#resultsText').append("<i class='em em---1'></i> you should wear a jacket <i class='em em-plus1'></i>");
      } else {
        $('#resultsText').append("you should be <i class='em em-ok_hand'></i> without a jacket");
      }

      $('body').css({'background-color':resultsDivStyle.backgroundColor, 'color': resultsDivStyle.color});
      $('#weatherForm').toggle();
      $('#resultsDiv').toggle();

      if (icon === 'rain') {
        $('.icon').addClass('rainy');
        $('.helperIcon').addClass('cloud');
        $('.helperIconTwo').addClass('rain');

        $('.icon').show();
        $('.helperIcon').show();
        $('.helperIconTwo').show();

      } else if (icon === 'thunder') {
        $('.icon').addClass('thunder-storm');
        $('.helperIcon').addClass('cloud');
        $('.secondaryIcon').addClass('lightning');
        $('.secIconOne').addClass('bolt');
        $('.secIconTwo').addClass('bolt');

        $('.icon').show();
        $('.helperIcon').show();
        $('.secondaryIcon').show();
        $('.secIconOne').show();
        $('.secIconTwo').show();

      } else if (icon === 'snow') {
        $('.icon').addClass('flurries');
        $('.helperIcon').addClass('cloud');
        $('.secondaryIcon').addClass('snow');
        $('.secIconOne').addClass('flake');
        $('.secIconTwo').addClass('flake');

        $('.icon').show();
        $('.helperIcon').show();
        $('.secondaryIcon').show();
        $('.secIconOne').show();
        $('.secIconTwo').show();
      } else if (icon === 'sun') {
        $('.icon').addClass('sunny');
        $('.secondaryIcon').addClass('sun');
        $('.secIconOne').addClass('rays');

        $('.icon').show();
        $('.secondaryIcon').show();
        $('.secIconOne').show();

      } else if (icon === 'cloud') {
        $('.icon').addClass('cloudy');
        $('.helperIcon').addClass('cloud');
        $('.helperIconTwo').addClass('cloud');

        $('.icon').show();
        $('.helperIcon').show();
        $('.helperIconTwo').show();
      }
    }

    render() {
      return  (
        <div>
          <div className="row">
            <div id="weatherForm">
              <form onSubmit={this.getWeather}>
                <input id="inputLocation" type="text" value={this.state.value} onChange={this.handleChange} name="location-name" />
                <input id="submitLocation" type="submit" value="Tell me now!" />
              </form>
            </div>
          </div>
          <div className="row">
            <div id="resultsDiv" style={resultsDivStyle} hidden>
              <p id="resultsText"></p>
              <div className="icon" hidden>
                <div className="helperIcon" hidden></div>
                <div className="helperIconTwo" hidden></div>
                <div className="secondaryIcon" hidden>
                  <div className="secIconOne" hidden></div>
                  <div className="secIconTwo" hidden></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

ReactDOM.render(
    <GetWeatherForm />,
    document.getElementById('root'),
);

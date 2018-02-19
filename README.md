## React + Flask Weather App

This is a simple application that takes in a user's location and returns whether or not they should wear a jacket, as well as the current weather using the Accuweather API.

It uses Python and Flask as a backend which retrieves data from Accuweather and passes it back to the React client. The DOM components are rendered with different styling and animations based on current weather conditions.

### Getting Started

First, begin by cloning this repo to your local machine:

```sh
$ git clone https://github.com/.../react-weather-check.git <YOUR_DIR_NAME>
```

Before getting started, you will need to obtain an Accuweather API Key by [signing up here](http://developer.accuweather.com/). 

Create a file called `secrets.sh` which will live in the project root alongside `server.py` and `requirements.txt`

Within `secrets.sh` export your newly created API Key using the same format as below and save the file:

```sh
export ACCUWEATHER_API_KEY="IfThisWereTheKeyItWouldBeHere"
```

Next, create and source a virtual environment so that you can install the requirements for this project. We recommend using Python's [virtualenv](https://virtualenv.pypa.io/en/stable/installation/) tool.

```sh
$ virtualenv env
$ source env/bin/activate
```

After sourcing your virtual environment, you can use pip to install the requirements. Please check out the [pip documentation](https://pip.pypa.io/en/stable/) for instructions on usage.

```sh
(env) $ pip install -r requirements.txt
```

You should also source your `secrets.sh` file to have access to the API Key.

```sh
(env) $ source secrets.sh
```

Once all required packages have finished installing and you have sourced your key, you will be ready to run the application locally using:

```sh
(env) $ python server.py
```

Visit [localhost:5000](http://localhost:5000/) in the browser of your choice to make weather queries to your heart's content.

#### Acknowledgements

Animated Weather Icons c/o [Josh Bader](http://codepen.io/joshbader/) 💯

This application is for learning purposes only. All code is reproducible and shareable. 🦄
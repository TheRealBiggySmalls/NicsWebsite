from flask import Flask
from flask import render_template

app = Flask(__name__)
app.config['STATIC_FOLDER'] = 'static'

@app.route("/")
def home():
    return render_template("base.html")

@app.route("/attack")
def attack():
    return render_template("attack.html")

@app.route("/creation")
def creation():
    return render_template("creation.html")

if __name__ == "__main__":
    #from "gameOfLifePy/gameOfLife.py" import *

    app.run(debug=True)
from flask import Flask
from flask import render_template

app = Flask(__name__)
app.config['STATIC_FOLDER'] = 'static'

@app.route("/")
def home():
    return render_template("base.html")

if __name__ == "__main__":
    app.run(debug=True)
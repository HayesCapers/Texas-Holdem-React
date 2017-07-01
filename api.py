#sudo pip install flask
from flask import Flask, request, jsonify
# sudo pip install flask-cors
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/',methods=['GET'])
def home_page():
	return "Hello, World!"

@app.route('/hand-checker',methods=['POST'])
def hand_checker():
	data = request.form.getlist('hand[]')
	print data
	hand = ['1h 2h 1s 9d 13d']
	return jsonify({
		'message': 'You have a pair of aces!'
		})

if __name__ == '__main__':
	app.run(debug=True)
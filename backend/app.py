from flask import Flask, make_response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail,Message



from mobile import send_message


# db connection and url
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://postgres.lubrypgqizxcfzhtopvr:44U5YIdTiHyOuy43@aws-0-us-east-1.pooler.supabase.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define the Flight model
class Flight(db.Model):
    __tablename__ = 'flights'
    id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.String(10), unique=True, nullable=False)
    airline = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    departure_gate = db.Column(db.String(10), nullable=False)
    arrival_gate = db.Column(db.String(10), nullable=False)
    scheduled_departure = db.Column(db.DateTime, nullable=False)
    scheduled_arrival = db.Column(db.DateTime, nullable=False)
    actual_departure = db.Column(db.DateTime, nullable=True)
    actual_arrival = db.Column(db.DateTime, nullable=True)

    # def __repr__(self):
    #     return f'<Flight {self.flight_id}>'


# Define the Subscriber model
class Subscriber(db.Model):
    __tablename__ = 'UserData'
    id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(120),  nullable=False)
    phone = db.Column(db.String(20),   nullable=False)

    def __repr__(self):
        return f'<Subscriber {self.email}>'

# Create the tables
with app.app_context():
    db.create_all()


 # smtp 
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] =587
app.config['MAIL_USERNAME'] = 'sudoswiftabhinav@gmail.com'
app.config['MAIL_PASSWORD'] = 'bzgpjjqgigwuztbq'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail=Mail(app) 

def flight_to_dict(flight):
    """Convert Flight model instance to dictionary."""
    return {
        'flight_id': flight.flight_id,
        'airline': flight.airline,
        'status': flight.status,
        'departure_gate': flight.departure_gate,
        'arrival_gate': flight.arrival_gate,
        'scheduled_departure': flight.scheduled_departure.isoformat() if flight.scheduled_departure else None,
        'scheduled_arrival': flight.scheduled_arrival.isoformat() if flight.scheduled_arrival else None,
        'actual_departure': flight.actual_departure.isoformat() if flight.actual_departure else None,
        'actual_arrival': flight.actual_arrival.isoformat() if flight.actual_arrival else None
    }




# Mock flight data


@app.route('/api/test', methods=['GET'])
def get_testRoute():
    return jsonify('Welcome User..')

@app.route('/api/flights', methods=['GET'])
def get_flight_data():
    try:
        flights = Flight.query.all()
        flight_list = [flight_to_dict(flight) for flight in flights]
        return jsonify(flight_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    flight_id = data.get('dropdownData')
    email = data.get('email')
    phone = data.get('phone')
    
    if not email or not flight_id or not phone:
        return jsonify({'error': 'Email, phone, and flight number are required'}), 400
    
    flightsData = Flight.query.all()
    flight_list = [flight_to_dict(flight) for flight in flightsData]
  
    
    
    flight_info = next((flight for flight in flight_list if flight['flight_id'] == flight_id), None)
    print(flight_info)

    if not flight_info:
        return jsonify({'error': 'Flight not found'}), 404

    new_subscriber = Subscriber(flight_id=flight_id, email=email, phone=phone)
    db.session.add(new_subscriber)
    db.session.commit()
    print({flight_info['status']})
    msg = Message('Message From Indigo ', sender = 'sudoswiftabhinav@gmail.com', recipients =[email])
    if(flight_info['status'] == 'Delayed'):

        msg.body = "Flight " + "".join(flight_id) + " (" + "".join({flight_info['airline']}) + ") Delayed. " + "Current status: " + "".join({flight_info['status']}) + ". " + "Departure gate: " + "".join({flight_info['departure_gate']}) + ". " + " We apologize for the inconvenience."
        print(msg.body)
    elif flight_info['status'] == 'On Time':
        msg.body = "Flight " + "".join(flight_id) + " (" + "".join({flight_info['airline']}) + ") On Time. " + "Current status: " + "".join({flight_info['status']}) + ". " + "Departure gate: " + "".join({flight_info['departure_gate']}) + ". " + "Thank you For Connecting with Us Wish you more " +  flight_id[0:2] + " flights."
        print(msg.body)
    elif flight_info['status'] == 'Cancelled':
         msg.body = "Sorry for inconvenience your Flight " + "" .join(flight_id) + " We Will Reschedule Shortly, keep patience. "
         print(msg.body)
    print(msg.body)
    msg.charset="utf-8"
    # sending mail with checking is there any exception or not 
    try:
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': 'Failed to send email'}), 500
  
    
    # mobile sms section
    if(flight_info['status'] == 'Delayed'):
        body = "phone Flight " + "".join(flight_id) + " (" + "".join({flight_info['airline']}) + ") Delayed. " + "Current status: " + "".join({flight_info['status']}) + ". " + "Departure gate: " + "".join({flight_info['departure_gate']}) + ". " + " We apologize for the inconvenience."
        print(body)
    elif flight_info['status'] == 'On Time':
        body = "phone Flight " + "".join(flight_id) + " (" + "".join({flight_info['airline']}) + ") On Time. " + "Current status: " + "".join({flight_info['status']}) + ". " + "Departure gate: " + "".join({flight_info['departure_gate']}) + ". " + "Thank you For Connecting with Us Wish you more " +  flight_id[0:2] + " flights."
        print(body)
    elif flight_info['status'] == 'Cancelled':
        body = "phone Sorry for inconvenience your Flight " + "" .join(flight_id) + " We Will Reschedule Shortly, keep patience. "
        print(body)

    msgRes = send_message(body,phone)  
    if msgRes["status"] == "success":
        return jsonify({"status": "success", "message_sid": msgRes["message"]}), 200
    else:
        return jsonify({"status": "error", "message": msgRes["message"]}), 500  




    
    

    
    
    



    # mobile number

    
    # return jsonify({'message': 'Subscribed successfully!'})
    return make_response(jsonify({'message': 'user created'}), 201)

if __name__ == '__main__':
    app.run(debug=True)

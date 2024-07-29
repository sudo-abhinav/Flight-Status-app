
from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()

account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
client = Client(account_sid, auth_token)

def send_message(body, to):
    msg_option = {
        "body": body,
        "from_": "+13302398343",
        "to": '+91' + to,
    }
    try:
        msg = client.messages.create(**msg_option)
        return {"status": "success", "message": msg.sid}
    except Exception as err:
        return {"status": "error", "message": str(err)}
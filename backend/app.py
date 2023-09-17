import os
import json
import websocket
from twilio.twiml.voice_response import Start, Stream, VoiceResponse
from google.cloud import speech_v1p1beta1 as speech
from google.cloud import texttospeech


# import firebase_admin
# from firebase_admin import credentials

# cred = credentials.Certificate("path/to/serviceAccountKey.json")
# firebase_admin.initialize_app(cred)



# Initialize Google Cloud clients
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service-account.json"
speech_client = speech.SpeechClient()
text_to_speech_client = texttospeech.TextToSpeechClient()

# Handle Web Socket Connection
def on_message(ws, message):
    msg = json.loads(message)
    if msg["event"] == "connected":
        print("A new call has connected.")
    elif msg["event"] == "start":
        print(f"Starting Media Stream {msg['streamSid']}")
    elif msg["event"] == "media":
        try:
            # Convert the received audio data to text using Google Cloud Speech-to-Text
            audio_content = msg["media"]["payload"]
            config = speech.RecognitionConfig(
                encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
                sample_rate_hertz=16000,  # Adjust based on your audio format
                language_code="en-US",  # Adjust based on the language of the audio
            )
            audio = speech.RecognitionAudio(content=audio_content)
            response = speech_client.recognize(config=config, audio=audio)

            transcription = ""
            for result in response.results:
                transcription += result.alternatives[0].transcript + "\n"

            print("Transcription:", transcription)

            # Convert the transcription to speech using Google Cloud Text-to-Speech
            synthesis_input = texttospeech.SynthesisInput(text=transcription)
            voice = texttospeech.VoiceSelectionParams(
                language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
            )
            audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.LINEAR16)
            response2 = text_to_speech_client.synthesize_speech(
                input=synthesis_input, voice=voice, audio_config=audio_config
            )

            # Send the synthesized speech back to the client
            ws.send(response2.audio_content, websocket.ABNF.OPCODE_BINARY)
        except Exception as e:
            print("Error processing audio:", e)

def on_error(ws, error):
    print("Error:", error)

def on_close(ws, close_status_code, close_msg):
    print("Websocket closed:", close_status_code, close_msg)

def on_open(ws):
    print("Websocket opened")

# Create TwiML Response
response = VoiceResponse()
start = Start()
stream = Stream(url="wss://localhost:8080/")  # Change the WebSocket URL to localhost
response.append(start)
response.append(stream)

# Print the TwiML Response
print(response)

# Start the WebSocket server on localhost:8080
ws = websocket.WebSocketApp("ws://localhost:8080/", on_message=on_message, on_error=on_error, on_close=on_close)
ws.on_open = on_open
ws.run_forever()
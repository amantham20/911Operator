import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// Function to make a post request
Future<String?> makePostRequest(String uid, String message) async {
  String url =
      'https://us-central1-operator-399221.cloudfunctions.net/run-llms';

  Map<String, String> headers = {
    'Content-Type': 'application/json',
  };

  Map<String, dynamic> requestBody = {
    'unique_id': uid,
    'message': message,
  };

  String jsonBody = json.encode(requestBody);

  try {
    final response = await http.post(
      Uri.parse(url),
      headers: headers,
      body: jsonBody,
    );

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response.body;
    } else {
      print('Request failed with status ${response.statusCode}');
      return null;
    }
  } catch (error) {
    print('Error: $error');
    return null;
  }
}

class CallerScreen extends StatefulWidget {
  const CallerScreen({super.key});

  @override
  State<CallerScreen> createState() => _CallerScreenState();
}

class _CallerScreenState extends State<CallerScreen> {
  final SpeechToText speech = SpeechToText();
  final FlutterTts flutterTts = FlutterTts();

  String uid = "";
  bool isListening = false;
  bool isProcessing = false;
  bool isConnected = false;
  String callText = "";

  @override
  void initState() {
    super.initState();
    flutterTts.setPitch(1);
    flutterTts.setLanguage('en-US');
    flutterTts.setSpeechRate(0.5);
  }

  Future<void> callOperator() async {
    setState(() {
      isConnected = true;
      uid = DateTime.now().toString(); // Generate uid when call starts
    });
    flutterTts.speak('911, What\'s your emergency?');
  }

  Future<void> listen(String uid) async {
    if (!isListening && !isProcessing) {
      bool available = await speech.initialize(
        onStatus: (val) => print('onStatus: $val'),
        onError: (val) => print('onError: $val'),
      );

      void processSpeech(String recognizedWords) async {
        setState(() {
          isListening = false;
          isProcessing = true;
        });

        speech.stop();

        String? response = await makePostRequest(uid, recognizedWords);

        if (response != null) {
          await flutterTts.speak(response);
        }

        setState(() {
          isProcessing = false;
        });
      }

      if (available) {
        setState(() {
          isListening = true;
        });

        Future.delayed(Duration(seconds: 1));

        var partialResult = "";
        Timer? timer;

        var listenResult = await speech.listen(
          onResult: (val) {
            setState(() {
              partialResult = val.recognizedWords;
              print(partialResult);

              if (timer != null && timer!.isActive) {
                timer!.cancel();
              }

              timer = Timer(Duration(seconds: 1), () {
                processSpeech(partialResult);
              });
            });
          },
        );

        if (!listenResult) print('Error starting to listen');
      } else {
        print('Speech recognition not available');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.white,
        colorScheme: ColorScheme.fromSwatch().copyWith(secondary: Colors.green),
      ),
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
        ),
        body: Container(
          color: Colors.white,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                radius: 50,
                backgroundImage: AssetImage('assets/logo.png'),
                backgroundColor: Colors.grey[200],
              ),
              const SizedBox(height: 20),
              const Text(
                'Surge SOS',
                style: TextStyle(fontSize: 24, color: Colors.black),
              ),
              SizedBox(height: 10),
              Text(
                isConnected ? "Connected" : " ",
                style: TextStyle(fontSize: 18, color: Colors.black54),
              ),
              SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  FloatingActionButton(
                    onPressed: () {
                      listen(uid);
                    },
                    child: Icon(Icons.mic),
                    backgroundColor: Colors.green,
                  ),
                  FloatingActionButton(
                    onPressed: () {
                      setState(() {
                        isConnected = false;
                      });
                      makePostRequest(uid, "CLEAR");
                      flutterTts.stop();
                    },
                    child: Icon(Icons.call_end),
                    backgroundColor: Colors.red,
                    heroTag: null,
                  ),
                ],
              ),
              FloatingActionButton(
                onPressed: () {
                  callOperator();
                },
                child: Icon(Icons.call_sharp),
                backgroundColor: Colors.grey,
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}

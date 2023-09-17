import 'package:caller/screens/CallerScreen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; // Import this to work with JSON

void makePostRequest() async {
  // Define the URL
  String url = 'https://us-central1-operator-399221.cloudfunctions.net/run-llms';

  // Define the request headers (if needed)
  Map<String, String> headers = {
    'Content-Type': 'application/json', // Specify JSON content type
  };

  // Define the request body
  Map<String, dynamic> requestBody = {
    'unique_id': 'abc123',
    'message': 'Hello! I',
  };

  // Convert the request body to a JSON string
  String jsonBody = json.encode(requestBody);

  // Make the POST request
  try {
    final response = await http.post(
      Uri.parse(url),
      headers: headers,
      body: jsonBody, // Use the JSON-encoded body
    );

    // Check if the request was successful (status code 200-299)
    if (response.statusCode >= 200 && response.statusCode < 300) {
      print('Response: ${response.body}');
    } else {
      print('Request failed with status ${response.statusCode}');
    }
  } catch (error) {
    print('Error: $error');
  }
}



void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false, // Hide the debug banner
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CallerScreen(),
    );
  }
}

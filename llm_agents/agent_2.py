import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}])
# print(chat_completion)

def location_information(location):
    # call firebase entry, edit with this information
    print(location)

def dispatch(person):
    print(person)

def situation_description(situation):
    print(situation)

def caller_information(victim):
    print(victim)

def suspect_information(suspect):
    print(suspect)

def vehicle_information(vehicle):
    print(vehicle)

def emergency_dispatch_location(emergency, dispatch, location):
    # Call firebase
    pass

def run_conversation():
    messages = [
        {"role" : "system", "content": "You will be assessing an ongoing 911 call, extracting important information from the caller's answers. Use the appropriate functions provided to you \
         for any important information you see. Only use the functions you have been provided with. Use emergency_dispatch_location when the caller reports the type of emergency and the location in one message, and the dispatch needed in inferred from the whole message.\
         Once you have reported the type of emergency and the location, do not report it again."},
    ]

    functions = [
        {
            "name" : "emergency_dispatch_location",
            "description" : "Report the emergency going on and its location, as well as the type of dispatch that needs to be sent.",
            "parameters": {
                "type" : "object",
                "properties" : {
                    "emergency" : {
                        "type" : "string",
                        "description" : "The type of emergency going on",
                    },
                    "dispatch" : {
                        "type": "string",
                        "description" : "The appropriate dispatch for the emergency. The only valid options are police, firefighters, or paramedics. You may use these together if necessary. This should be inferred from the type of emergency stated.",
                    },
                    "location" : {
                        "type" : "string",
                        "description" : "The location of the emergency",
                    }

                },
                "required": ["emergency", "dispatch", "location"],
            }
        },
        {
            "name" : "dispatch",
            "description" : "Report the appropriate dispatch for the emergency.",
            "parameters": {
                "type" : "object",
                "properties" : {
                    "person" : {
                        "type" : "string",
                        "description" : "The appropriate dispatch for the emergency. The only valid options are police, firefighters, or paramedics. You may use these together if necessary. This should be inferred from the type of emergency stated.",
                    }
                },
                "required": ["person"],
            }
        },
        {
            "name" : "location_information",
            "description" : "Report the current location of the emergency.",
            "parameters": {
                "type" : "object",
                "properties" : {
                    "location" : {
                        "type" : "string",
                        "description" : "The location of the emergency",
                    }
                },
                "required": ["location"],
            }
        },
        {
            "name" : "situation_description",
            "description" : "Report any important information about the situation, including the type of emergency (such as a fire, car accident, robbery, or other emergencies), the number of people involved, any injuries or medical conditions, the presence of weapons, or any potential hazards..",
            "parameters": {
                "type" : "object",
                "properties" : {
                    "situation" : {
                        "type" : "string",
                        "description" : "New information from the caller.",
                    }
                },
                "required": ["situation"],
            }
        },
        {
            "name" : "caller_information",
            "description" : "Report any identifying information about the caller.",
            "parameters": {
                "type" : "object",
                "properties" : {
                    "victim" : {
                        "type" : "string",
                        "description" : "Identifying information about the caller.",
                    }
                },
                "required": ["victim"],
            }
        },
        {
            "name" : "suspect_information",
            "description" : "Report any identifying information about the suspect.",
            "parameters": {
                "type" : "object",
                "properties" : {
                    "suspect" : {
                        "type" : "string",
                        "description" : "Identifying information about the suspect.",
                    }
                },
                "required": ["suspect"],
            }
        },
        {
            "name" : "vehicle_information",
            "description" : "Report any identifying information about a vehicle, if applicable.",
            "parameters": {
                "type" : "object",
                "properties" : {
                    "vehicle" : {
                        "type" : "string",
                        "description" : "Identifying information about the vehicle, such as the make, model, color, or license plate.",
                    }
                },
                "required": ["vehicle"],
            }
        },
    ]

    for i in range(5):
        user_msg = {"role" : "user", "content" : input("User: ")}
        messages.append(user_msg)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            functions=functions,
            function_call="auto",  # auto is default, but we'll be explicit
            n = 1,
        )

        available_functions = {
            "location_information" : location_information,
            "dispatch" : dispatch,
            "situation_description" : situation_description,
            "caller_information" : caller_information,
            "suspect_information" : suspect_information,
            "vehicle_information" : vehicle_information,
            "emergency_dispatch_location" : emergency_dispatch_location,
        }

        response_message = response["choices"][0]["message"]

        if response_message.get("function_call"):
            function_name = response_message["function_call"]["name"]

            if function_name in available_functions:
                function_to_call = available_functions[function_name]
                function_args = json.loads(response_message["function_call"]["arguments"])
                print(function_name)
                function_to_call(
                    **function_args
                )

run_conversation()
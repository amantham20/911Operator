import asyncio
import websockets

async def handle_client(websocket, path):
    print("New server connection established")
    # This function will handle each client connection
    async for message in websocket:
        # Process the incoming message
        await websocket.send(message)  # Send a response back

start_server = websockets.serve(handle_client, 'localhost', 8080)

# Start the server
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

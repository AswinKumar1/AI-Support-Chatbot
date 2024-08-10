import boto3
import json
import sys

def generate_response(input_text):
    # Initialize the Bedrock runtime client
    client = boto3.client('bedrock-runtime', region_name='us-west-2')

    # Construct the request body
    request_body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 320,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": input_text  # Ensure input_text is not empty
                    }
                ]
            }
        ]
    }

    # Define your model ID and other parameters
    kwargs = {
        "modelId": "anthropic.claude-3-haiku-20240307-v1:0",
        "contentType": "application/json",
        "accept": "application/json",
        "body": json.dumps(request_body)  # Serialize the request body to JSON
    }

    # Invoke the model
    try:
        response = client.invoke_model(**kwargs)
        response_body = response['body'].read().decode('utf-8')
        generated_text = json.loads(response_body)
        return generated_text
    except Exception as e:
        # Return error message as JSON
        error_message = {"error": str(e)}
        return error_message

if __name__ == "__main__":
    input_text = sys.argv[1] if len(sys.argv) > 1 else 'Default input'
    response_text = generate_response(input_text)
    print(json.dumps(response_text))  # Ensure output is JSON-formatted

exports.handler = async (event) => {
    console.log("Incoming event:", JSON.stringify(event));

    const response = {
        message: "Hello from AWS Lambda!",
        input: event
    };

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "this code is from main branch "
            "code is from feature branch"
        },
        body: JSON.stringify(response)
    };
};

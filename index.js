exports.handler = async (event) => {
    console.log("Incoming event:", JSON.stringify(event));

    const response = {
        message: "Hello from AWS Lambda!",
        input: event
    };

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json tayyab deployed thisvia jenkins "
        },
        body: JSON.stringify(response)
    };
};

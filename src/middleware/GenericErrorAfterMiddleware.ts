export default (app) => {
    app.use((error, request, response, next) => {
        if (error) {
            response.statusCode = 500;
            if (process.env.NODE_ENV === 'production') {
                response.end({});
            } else {
                console.error(error);
                response.end(
                    JSON.stringify({
                        error: error.toString()
                    })
                );
            }
        }
    });
};
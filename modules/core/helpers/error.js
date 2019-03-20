module.exports = handler;

function handler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        var errors = []
        for (const [field, e] of Object.entries(err.errors)) {
            errors.push({
                code:"is_invalid",
                target:'field',
                message:e.message,
                source:{'field': field}
            });
        }
        // mongoose validation error
        return res.status(400).json({'errors': errors});
    }

    // default to 500 server error
    return res.status(500).json({'errors':[
        {
            code:"internal_server_error",
            target:'common',
            message: err.message,
            source:{}
        }
    ]});
}
const logger = (req, res, next) => {
    const start = Date.now();
    const { method, url, ip } = req;

    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const user = req.user ? req.user.email : 'Anonymous';

        console.log(
            `[${new Date().toISOString()}] ${method} ${url} ${status} - ${duration}ms - User: ${user} - IP: ${ip}`
        );
    });

    next();
};

module.exports = { logger };

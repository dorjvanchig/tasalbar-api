const logger = (req, res, next) => {
    console.log(`url : ${req.hostname} ${req.method}`);
    next();
}
module.exports = logger;
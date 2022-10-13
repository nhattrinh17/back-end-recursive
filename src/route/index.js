const userRouter = require('./user');
const researchRouter = require('./research');
const subjectRouter = require('./subject');
const examRouter = require('./exam');
const departmentRouter = require('./department');

function router(app) {
    app.use('/user', userRouter);
    app.use('/research', researchRouter);
    app.use('/subject', subjectRouter);
    app.use('/exam', examRouter);
    app.use('/department', departmentRouter);
}

module.exports = router;

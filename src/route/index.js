const userRouter = require('./user');
const researchRouter = require('./research');
const subjectRouter = require('./subject');
const examRouter = require('./exam');

function router(app) {
    app.use('/user', userRouter);
    app.use('/research', researchRouter);
    app.use('/department', departmentRouter);
    app.use('/subject', subjectRouter);
    app.use('/exam', examRouter);
}

module.exports = router;

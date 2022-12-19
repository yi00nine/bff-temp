export const catchError = () => async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      data: {
        code: error.status || 500,
        msg: error,
      },
    };
  }
};

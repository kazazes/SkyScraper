export default (error: string, context: any) => {
  console.log(error);
  context.error({ statusCode: 304, message: "Server error" });
};

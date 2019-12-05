export default (error: string, context: any) => {
  console.error("Apollo error: ", error)
  context.error({ statusCode: 304, message: "Server error" })
}

export default function ({ store, redirect }) {
  debugger
  const u = store.getters['user/user'];
  if (!u || u.role !== "ADMIN") {
    redirect('/login')
  }
}

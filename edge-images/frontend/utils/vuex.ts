export const set = (property: string) => (state: { [x: string]: any; }, payload: any) => (state[property] = payload)
export const toggle = (property: string) => (state: { [x: string]: any; }) => (state[property] = !state[property])

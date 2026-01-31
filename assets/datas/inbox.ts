import inboxes from './inboxs.json'
export type inboxes_type = {
  id: number
  sender_id: number
  recever_id: number
  message: string
  send_at: string
  isseen: boolean
}
let inbox_data = inboxes as inboxes_type[]
export const addtoinbox = (data: inboxes_type) => {
  inbox_data.push(data)
}
export const removefrominbox = (data: number) => {
  inbox_data = inbox_data.filter((it) => it.id != data)
}
export const filter_userlist = (id: number): number[] => {
  return Array.from(
    new Set(
      inbox_data
        .filter((fi) => fi.sender_id == id || fi.recever_id == id)
        .map((user) => {
          return user.sender_id == id ? user.recever_id : user.sender_id
        })
    )
  )
}
export function findlastmessage(id: number): string {
  const thisusermessage = inbox_data.filter(
    (inb) =>
      (inb.sender_id == 4 && inb.recever_id == id) || (inb.recever_id == 4 && inb.sender_id == id)
  )
  thisusermessage.sort((a, b) => {
    const cndtion1 = new Date(a.send_at) > new Date(b.send_at)
    const cndtion2 = new Date(a.send_at) < new Date(b.send_at)
    return cndtion1 ? -1 : cndtion2 ? +1 : 0
  })
  return thisusermessage.map((itm) => itm.message).at(-1) || ''
}
inbox_data.sort((a, b) => {
  const cndtion1 = new Date(a.send_at) > new Date(b.send_at)
  const cndtion2 = new Date(a.send_at) < new Date(b.send_at)
  return cndtion1 ? -1 : cndtion2 ? +1 : 0
})
export default inbox_data

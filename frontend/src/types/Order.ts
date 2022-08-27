import { EventName } from './EventName'

export type Order = {
  id: string
  event_name: EventName
  price: number
  item: string
  customer: string
  destination: string
  sent_at_second: number
}

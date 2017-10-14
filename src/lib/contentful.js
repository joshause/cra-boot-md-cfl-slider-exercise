import { createClient } from 'contentful'

export const SliderContent = () => {

  const client = createClient({
    space: '7e8maa342izc',
    accessToken: 'c2fc7288c18b1a2b2525d2333a884b53b08828900cf3a02a0705af34f9b2d777'
  })
  return client.getEntries({ content_type: 'sliderExercise', locale: 'en-US', order: 'fields.order' })

}

import axios from 'axios'
import crypto from 'crypto'
import moment from 'moment'

const credentials = Object.freeze({
  'ts': moment().format('ms'),
  'public_key': 'e389c1c655226efb5133dd874553c68a',
  'private_key': '08a1cfee42486383ac29d116adfbbe6330f68e81',
})

let hash = credentials.ts + credentials.private_key + credentials.public_key
hash = crypto.createHash('md5').update(hash).digest("hex")

export const series = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/series?ts=' + credentials.ts + '&apikey=' + credentials.public_key + '&hash=' + hash,
  timeout: 10000
})

export const serie = (serieId) => {
  return axios.create({
      baseURL: 'http://gateway.marvel.com/v1/public/series/'+ serieId +'?ts=' + credentials.ts + '&apikey=' + credentials.public_key + '&hash=' + hash,
      timeout: 10000
  })
}
                                                                                    
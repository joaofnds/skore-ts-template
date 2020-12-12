/* eslint-disable import/no-unresolved */
import { check } from 'k6'
import http from 'k6/http'

export let options = {
  scenarios: {
    constant_request_rate: {
      // simulates 100 RPS for 1 minute
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
  thresholds: {
    // 95% of requests must finish within 10ms.
    http_req_duration: ['p(95) < 10'],
  },
}
export default function () {
  let mutation = `
    mutation {
      template: create(author: "Et ${__VU} Bilu", name: "${__VU}:${__ITER}") {
        id
      }
    }
  `

  const response = http.post('http://skore:3000/graphql', JSON.stringify({ query: mutation }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  check(response, {
    'is template created': (r) => !!r.json().data.template.id,
  })
}

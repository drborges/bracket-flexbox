let uuid = (function *gen() {
  var id = 1
  while(true) {
    yield id
    id++
  }
})()

let avatarURL = (id) => id % 2 == 0 ? 'http://localhost:3333/opponent1.jpg' : 'http://localhost:3333/opponent2.jpg'
let opponentFactory = (id) => {
  return { id: id, name: `Charles Curcio ${id}`, avatarURL: avatarURL(id), rank: 1 }
}
let matchFactory = (section) => {
  let id = uuid.next().value
  return {
    section: section,
    opponents: [ opponentFactory(id), opponentFactory(id)]
  }
}

let roundFactory = ({ round, active, matches } = {}) => {
  return {
    title: `Round ${round}`,
    active: active,
    matches: matches
  }
}

let roundMatchesFactory = ({ section, totalMatches }) => Array(totalMatches).fill(0).map(_ => matchFactory(section))

let round1 = roundFactory({
  round: 1,
  active: true,
  matches: roundMatchesFactory({section: 0, totalMatches: 32}).
    concat(roundMatchesFactory({section: 2, totalMatches: 32}))})

let round2 = roundFactory({
  round: 2,
  active: false,
  matches: roundMatchesFactory({section: 0, totalMatches: 16}).
    concat(roundMatchesFactory({section: 2, totalMatches: 16}))})

let round3 = roundFactory({
  round: 3,
  active: false,
  matches: roundMatchesFactory({section: 0, totalMatches: 8}).
    concat(roundMatchesFactory({section: 2, totalMatches: 8}))})

let round4 = roundFactory({
  round: 4,
  active: false,
  matches: roundMatchesFactory({section: 0, totalMatches: 4}).
    concat(roundMatchesFactory({section: 2, totalMatches: 4}))})

let round5 = roundFactory({
  round: 5,
  active: false,
  matches: roundMatchesFactory({section: 0, totalMatches: 2}).
    concat(roundMatchesFactory({section: 2, totalMatches: 2}))})

let round6 = roundFactory({
  round: 6,
  active: false,
  matches: roundMatchesFactory({section: 0, totalMatches: 1}).
    concat(roundMatchesFactory({section: 2, totalMatches: 1}))})

let round7 = roundFactory({
  round: 7,
  active: false,
  matches: roundMatchesFactory({section: 1, totalMatches: 1})})

export default {
  title: 'Marketing PPT',
  rounds: [round1, round2, round3, round4, round5, round6, round7]
}

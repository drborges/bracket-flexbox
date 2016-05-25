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
let matchFactory = (sections) => {
  let id = uuid.next().value
  return {
    sections: sections,
    opponents: [ opponentFactory(id), opponentFactory(id)]
  }
}

let roundMatchesFactory = ({ sections, totalMatches }) => Array(totalMatches).fill(0).map(_ => matchFactory(sections))

let round1 = {
  index: 1,
  active: true,
  matches: roundMatchesFactory({sections: ['top', 'left'], totalMatches: 2}).
    concat(roundMatchesFactory({sections: ['bottom', 'left'], totalMatches: 2})).
    concat(roundMatchesFactory({sections: ['top', 'right'], totalMatches: 2})).
    concat(roundMatchesFactory({sections: ['bottom', 'right'], totalMatches: 2}))
}

let round2 = {
  index: 2,
  active: false,
  matches: roundMatchesFactory({sections: ['top', 'left'], totalMatches: 1}).
    concat(roundMatchesFactory({sections: ['bottom', 'left'], totalMatches: 1})).
    concat(roundMatchesFactory({sections: ['top', 'right'], totalMatches: 1})).
    concat(roundMatchesFactory({sections: ['bottom', 'right'], totalMatches: 1}))
}

let round3 = {
  index: 3,
  active: false,
  matches: roundMatchesFactory({sections: ['top', 'left'], totalMatches: 1}).
    concat(roundMatchesFactory({sections: ['top', 'right'], totalMatches: 1}))
}

let round4 = {
  index: 4,
  active: false,
  matches: roundMatchesFactory({sections: ['top'], totalMatches: 1})
}

export default {
  title: 'Marketing PPT',
  rounds: [round1, round2, round3, round4]
}

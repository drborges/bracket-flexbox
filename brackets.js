import React from 'react'

export default class Tournament extends React.Component {
  render() {
    let roundsPerSection = (section, rounds) => {
      return rounds.map(({ index, active, matches }) => {
        return {
          index,
          active,
          matches: matches.filter(match => match.sections.includes(section))
        }
      })
    }

    let totalRounds = this.props.rounds.length
    let leftSectionRounds = roundsPerSection('left', this.props.rounds).slice(0, totalRounds-1)
    let middleSectionRounds = [this.props.rounds[totalRounds - 1]]
    let rightSectionRounds = roundsPerSection('right', this.props.rounds).slice(0, totalRounds-1)

    return (
      <div className="tournament">
        <TournamentSection key="left" rounds={leftSectionRounds} className="left-section" />
        <TournamentSection key="middle" rounds={middleSectionRounds} className="middle-section" />
        <TournamentSection key="right" rounds={rightSectionRounds} className="right-section" />
      </div>
    )
  }
}

/*
 * props.rounds: List<Round>
 * props.className: String - This component can be used to define left / right and middle sections
 */
const TournamentSection = (props) => {
  let rounds = props.rounds.map((round, i) => <TournamentRound key={i} round={round} />)
  let sectionClass = `bracket-section ${props.className}`

  return (
    <div className={sectionClass}>
      {rounds}
    </div>
  )
}

/*
 * props.round: Round
 */
const TournamentRound = (props) => {
  let topMatches = props.round.matches.filter(match => match.sections.includes('top')).map((match, i) => <RoundMatch key={i} match={match} />)
  let bottomMatches = props.round.matches.filter(match => match.sections.includes('bottom')).map((match, i) => <RoundMatch key={i} match={match} />)

  let bracketRoundClasses = props.round.active ? 'bracket-round current-round' : 'bracket-round'
  let roundBodyClasses = `round-body round-${props.round.index}`

  return (
    <div className={bracketRoundClasses}>
      <div className="round-header"><span className="title">Round {props.round.index}</span></div>
      <div className={roundBodyClasses}>
        <div className="top-section">
          {topMatches}
        </div>

        <div className="bottom-section">
          {bottomMatches}
        </div>
      </div>
    </div>
  )
}

/*
 * props.match: Match
 */
const RoundMatch = (props) => {
  let opponents = props.match.opponents.map((opponent, i) => <MatchOpponent key={i} opponent={opponent} />)

  return (
    <ul className="round-match">
      {opponents}
    </ul>
  )
}

/*
 * props.opponent: Opponent
 */
const MatchOpponent = (props) => {
  return (
    <li className="round-opponent">
      <div className="opponent-info">
        <div className="opponent-name">{props.opponent.name}</div>
        <img className="opponent-avatar" src={props.opponent.avatarURL} />
      </div>
    </li>
  )
}

# A webpage about the board game "Terraforming Mars"

## Features

### CARDS LIST
A list of all cards from the game with various filtering options.
As a secondary feature only specific cards can be displayed by selecting or open them in a new tab.

### SUBMIT GAME FORM
A submit form for completed multiplayer games.
A Gmail login is optional if personal statistics are desired.

### GAMES STATISTICS
A set of charts displaying the data from the submitted Multiplayer games. Data filtering options are available as well.

### SOLO GAMES
A submit form for completed Solo games along the charts displaying the data from the submitted games.

### M&A RANDOMIZER
A tool that randomizes the 32 official Milestones and Awards.
Specific options can be excluded from the randomization and the combinations overlapping requirements index can be controlled (less is better).

### START HAND SETUP
A tool that randomizes a staring hand based on the selected expansions.

### About the game
A link to the BGG Terraforming Mars page.

### About the topic
A link to the application's BGG topic.

### Author's solo games
Author's detailed table with completed Solo games based on included expansions.

## For developers
You can provide query params to fullfil the submit form (every param is optional)

|        Param          |                   value                    |            description            |                example               |
|-----------------------|--------------------------------------------|-----------------------------------|--------------------------------------|
| players               |  number (2,5)                              |  number of players                |  `3`                                 |
| generations           |  number (4,18)                             |  number of generations            |  `10`                                |
| expansions            |  expansion,expansion...<sup>1<sup>         |  expansions in play               |  `corporate,venus,prelude`           |
| map                   |  `elysium` \| `hellas` \| `tharsis`        |  map in play                      |  `hellas`                            |
| milestones            |  milestone,milestone,milestone<sup>2<sup>  |  funded milestones                |  `tactican,polar explorer,energizer` |
| awards                |  award,award,award<sup>3<sup>              |  funded awards                    |  `cultivator,magnate,space baron`    |
| colonies              |  colony,colony...<sup>4<sup>               |  colonies in play                 |  `io,luna,miranda`                   |
| darft                 |  string boolean                            |  draft cards                      |  `true`                              |
| wgt                   |  string boolean                            |  world government terraforming    |  `true`                              |
| player-1-corporation  |  corporation<sup>5<sup>                    |  current player corporation name  |  `ecoline`                           |
| player-2-corporation  |  corporation<sup>5<sup>                    |  player 2 corporation name        |  `celestic`                          |
| player-3-corporation  |  corporation<sup>5<sup>                    |  player 3 corporation name        |  `helion`                            |
| player-4-corporation  |  corporation<sup>5<sup>                    |  player 4 corporation name        |  `vitor`                             |
| player-1-score        |  number                                    |  current player score             |  `90`                                |
| player-2-score        |  number                                    |  player 2 score                   |  `101`                               |
| player-3-score        |  number                                    |  player 3 score                   |  `73`                                |
| player-4-score        |  number                                    |  player 4 score                   |  `88`                                |

### Annotations

1. Available expansions: `corporate` | `venus` | `prelude` | `colonies` | `turmoil` 

2. Available milestons:  `terraformer` | `mayor` | `gardener` | `builder` | `planner` | `diversifier` | `tactician` | `polar-explorer` | `energizer` | `rim-settler` | `generalist` | `specialist` | `ecologist` | `tycoon` | `legend` | `hoverlord`

3. Available awards:  `landlord` | `banker` | `scientist` | `thermalist` | `miner` | `venuphile` | `cultivator` | `magnate` | `space-baron` | `excentric` | `contractor` | `celebrity` | `industrialist` | `desert-settler` | `estate-dealer` | `benefactor`

4. Available colonies: `callisto` | `ceres` | `enceladus` | `europa` | `ganymede` | `io` | `luna` | `miranda` | `pluto` | `titan` | `triton` 
  
5. Available corporations: `aphrodite` | `arcadian communities` | `aridor` | `arklight` | `astrodrill` | `celestic` | `cheung shing mars` | `credicor` | `ecoline` | `factorum` | `helion` | `interplan. cinematics` | `inventrix` | `lakefront resorts` | `manutech` | `mining guild` | `mons insurance` | `morning star` | `pharmacy` | `philares` | `phobolog` | `point luna` | `polyphemos` | `poseidon` | `pristar` | `recyclon` | `robinson industries` | `saturn systems` | `septem tribus` | `splice` | `stormcraft` | `teractor` | `teralabs` | `tharsis republic` | `thorgate` | `unmi` | `utopia` | `valley trust` | `viron` | `vitor` `beginner` | `kuiper belt coop.`

### Example

https://ssimeonoff.github.io/submit?players=3&generations=11&player-1-corporation=unmi&player-2-corporation=viron&player-3-corporation=helion&player-1-score=90&player-2-score=101&player-3-score=72&expansions=corporate,prelude,colonies&map=hellas&milestones=rim%20settler,tactician,polar%20explorer&colonies=io,luna,ceres,titan&draft=true

## Authors

* **[Simeon Simeonov](https://github.com/ssimeonoff)** - *Initial work*

## Acknowledgments

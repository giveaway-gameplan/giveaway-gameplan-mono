import * as migration_20261115_233759_initial from './20261115_233759_initial';
import * as migration_20261117_010302_team_location from './20261117_010302_team_location';
import * as migration_20261117_012234_event_photo from './20261117_012234_event_photo';
import * as migration_20261117_014614_league_theme from './20261117_014614_league_theme';

export const migrations = [
  {
    up: migration_20261115_233759_initial.up,
    down: migration_20261115_233759_initial.down,
    name: '20261115_233759_initial',
  },
  {
    up: migration_20261117_010302_team_location.up,
    down: migration_20261117_010302_team_location.down,
    name: '20261117_010302_team_location',
  },
  {
    up: migration_20261117_012234_event_photo.up,
    down: migration_20261117_012234_event_photo.down,
    name: '20261117_012234_event_photo',
  },
  {
    up: migration_20261117_014614_league_theme.up,
    down: migration_20261117_014614_league_theme.down,
    name: '20261117_014614_league_theme'
  },
];

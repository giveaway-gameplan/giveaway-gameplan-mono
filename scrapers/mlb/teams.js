const mlbTeams = {
  diamondbacks: {
    league: "mlb",
    url: "https://www.mlb.com/dbacks/tickets/promotions",
    url2: "https://www.mlb.com/dbacks/tickets/promotions/2025",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Phoenix",
  },
  athletics: {
    league: "mlb",
    url: "https://www.mlb.com/athletics/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Los_Angeles",
  },
  braves: {
    league: "mlb",
    url: "https://www.mlb.com/braves/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  orioles: {
    league: "mlb",
    url: "https://www.mlb.com/orioles/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  redsox: {
    league: "mlb",
    url: "https://www.mlb.com/redsox/tickets/promotions",
    giveawayList: "#gate-giveaways .p-forge-list",
    giveawayListItem: ".p-forge-list-item",
    giveawaylistItemHeading: ".l-grid__content-title",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  cubs: {
    league: "mlb",
    url: "https://www.mlb.com/cubs/tickets/promotions",
    url2: "https://www.mlb.com/cubs/tickets/promotions/2025",
    url3: "https://www.mlb.com/cubs/tickets/promotions/gate-giveaways",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },

  whitesox: {
    league: "mlb",
    url: "https://www.mlb.com/whitesox/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },

  reds: {
    league: "mlb",
    url: "https://www.mlb.com/reds/tickets/promotions/2025",
    giveawayList: ".l-grid__content .p-forge-list",
    giveawayListItem: ".p-forge-list-item",
    giveawaylistItemHeading: ".p-featured-content__text .p-wysiwyg p strong",
    giveawayScript:
      '.ticket-grid.ticketing-component.events script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },

  rockies: {
    league: "mlb",
    url: "https://www.mlb.com/rockies/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Denver",
  },

  tigers: {
    league: "mlb",
    url: "https://www.mlb.com/tigers/tickets/promotions/giveaways",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Detroit",
  },

  astros: {
    league: "mlb",
    url: "https://www.mlb.com/astros/tickets/promotions",
    url2: "https://www.mlb.com/astros/tickets/promotions/2025",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },
  royals: {
    league: "mlb",
    url: "https://www.mlb.com/royals/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },
  marlins: {
    league: "mlb",
    url: "https://www.mlb.com/marlins/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  twins: {
    league: "mlb",
    url: "https://www.mlb.com/twins/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },
  mets: {
    league: "mlb",
    url: "https://www.mlb.com/mets/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  yankees: {
    league: "mlb",
    url: "https://www.mlb.com/yankees/tickets/promotions",
    url2: "https://www.mlb.com/yankees/tickets/promotions/schedule",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  phillies: {
    league: "mlb",
    url: "https://www.mlb.com/phillies/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  giants: {
    league: "mlb",
    url: "https://www.mlb.com/giants/tickets/promotions",
    giveawayList: ".p-forge-list .p-forge-list--list",
    giveawayListItem: ".p-forge-list-item.l-grid__content",
    giveawaylistItemHeading:
      ".p-featured-content__body a div.u-text-h4.u-text-flow",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Los_Angeles",
  },

  mariners: {
    league: "mlb",
    url: "https://www.mlb.com/mariners/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Los_Angeles",
  },
  brewers: {
    league: "mlb",
    url: "https://www.mlb.com/brewers/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },
  rays: {
    league: "mlb",
    url: "https://www.mlb.com/rays/tickets/promotions",
    url2: "https://www.mlb.com/rays/tickets/promotions/schedule",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  rangers: {
    league: "mlb",
    url: "https://www.mlb.com/rangers/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },
  bluejays: {
    league: "mlb",
    url: "https://www.mlb.com/bluejays/tickets/promotions",
    url2: "https://www.mlb.com/bluejays/tickets/promotions/schedule",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Toronto",
  },
  nationals: {
    league: "mlb",
    url: "https://www.mlb.com/nationals/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  padres: {
    league: "mlb",
    url: "https://www.mlb.com/padres/tickets/single-game-tickets",
    url2: "https://www.mlb.com/padres/tickets/giveaways",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Los_Angeles",
  },
  guardians: {
    league: "mlb",
    url: "https://www.mlb.com/guardians/tickets/single-game-tickets",
    url2: "https://www.mlb.com/guardians/tickets/promotions",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
  dodgers: {
    // ONLY GIVEAWAYS
    // league: "mlb",
    // url: "https://www.mlb.com/dodgers/tickets/promotions",
    // giveawayList: "#giveaways.l-grid__content",
    // giveawayListItem: ".p-forge-list-item",
    // giveawaylistItemHeading:
    //   ".l-grid__content .l-grid__content-title.u-text-h5",
    // giveawayScript:
    //   '.ticket-grid.ticketing-component.events script[type="application/ld+json"]',

    // GIVEAWAYS PLUS OTHER PROMOS AND THEMED NIGHTS
    league: "mlb",
    url: "https://www.mlb.com/dodgers/tickets/single-game-tickets",
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Los_Angeles",
  },
  cardinals: {
    league: "mlb",
    url: "https://www.mlb.com/cardinals/tickets/promotions",
    url2: "https://www.mlb.com/cardinals/tickets/promotions/2025", // consider using this
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Chicago",
  },
  angels: {
    league: "mlb",
    url: "https://www.mlb.com/angels/tickets/promotions", // this shows older promotions too
    url2: "https://www.mlb.com/angels/tickets/promotions/2025", // consider using this
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/Los_Angeles",
  },
  pirates: {
    league: "mlb",
    url: "https://www.mlb.com/pirates/tickets/promotions",
    url2: "https://www.mlb.com/pirates/tickets/promotions/2025", // consider using this
    giveawayList: ".styles__GamesBox-sc-1qz8r0a-11",
    giveawayListItem: 'div[data-testid="eventbox"]',
    giveawaylistItemHeading:
      ".styles__PromotionBox-sc-1qz8r0a-30 p.styles__PromotionOfferName-sc-1qz8r0a-35",
    giveawayScript: 'script[type="application/ld+json"]',
    timeZone: "America/New_York",
  },
};

module.exports = mlbTeams;

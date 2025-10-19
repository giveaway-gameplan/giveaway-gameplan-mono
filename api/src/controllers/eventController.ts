import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';

import pool from '../db.js';
import { Event } from '../models/event.js';

const columns = [
  'league',
  'team_name',
  'event_name',
  'raw_name',
  'matchup',
  'start_date',
  'end_date',
  'description',
  'time_and_zone',
  'location',
  'offer_url',
  'day_of_week',
];

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid ID parameter' });
      return;
    }
    const { rows }: QueryResult<Event> = await pool.query('SELECT * FROM events WHERE id = $1;', [
      id,
    ]);
    if (rows.length === 0) {
      res.status(404).json({ error: `Event with id ${id} not found` });
      return;
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { rows }: QueryResult<Event> = await pool.query('SELECT * FROM events;');
//     if (!Array.isArray(rows)) {
//       res.status(500).json({ error: 'Failed to retrieve events' });
//       return;
//     }
//     res.status(200).json(rows);
//   } catch (err) {
//     next(err);
//   }
// };

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  const { league, team, date, dow, month } = req.query as {
    league?: string;
    team?: string;
    date?: string;
    dow?: string;
    month?: string;
  };

  if (date && dow) {
    res.status(400).json({ error: 'Use either date or day of the week, not both' });
    return;
  }

  try {
    const filters: string[] = [];
    const values: (string | number)[] = [];

    if (league) {
      filters.push(`league = $${values.length + 1}`);
      values.push(league);
    }

    if (team) {
      filters.push(`team_name = $${values.length + 1}`);
      values.push(team);
    }

    if (date) {
      filters.push(`start_date = $${values.length + 1}`);
      values.push(date);
    }

    if (dow) {
      filters.push(`day_of_week = $${values.length + 1}`);
      values.push(dow);
    }

    if (month) {
      filters.push(`EXTRACT(MONTH FROM start_date) = $${values.length + 1}`);
      values.push(Number(month));
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const query = `SELECT * FROM events ${whereClause} ORDER BY start_date ASC;`;

    const { rows }: QueryResult<Event> = await pool.query(query, values);

    if (!Array.isArray(rows)) {
      res.status(500).json({ error: 'Failed to retrieve events' });
      return;
    }

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// consider something like EXTRACT(DOW FROM start_date) instead of having the scraper do it?
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      league,
      teamName,
      eventName,
      rawName,
      matchup,
      startDate,
      endDate,
      description,
      timeAndZone,
      location,
      offerURL,
      dayOfWeek,
    } = req.body as Event;

    // move to middleware if needed
    if (
      !league ||
      !teamName ||
      !eventName ||
      !rawName ||
      !matchup ||
      !startDate ||
      !endDate ||
      !description ||
      !timeAndZone ||
      !location ||
      !offerURL ||
      !dayOfWeek
    ) {
      res.status(400).json({ error: 'Missing required event fields' });
      return;
    }

    const { rows }: QueryResult<Event> = await pool.query(
      `
      INSERT INTO events (${columns.join(', ')})
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
      `,
      [
        league,
        teamName,
        eventName,
        rawName,
        matchup,
        startDate,
        endDate,
        description,
        timeAndZone,
        location,
        offerURL,
        dayOfWeek,
      ],
    );

    if (rows.length === 0) {
      res.status(500).json({ error: 'Insert succeeded but no event was returned' });
      return;
    }

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// consider something like EXTRACT(DOW FROM start_date) instead of having the scraper do it?
export const createManyEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events: Event[] = req.body;

    if (!Array.isArray(events) || events.length === 0) {
      res.status(400).json({ error: 'Request body must be a non-empty array' });
      return;
    }

    const placeholders: string[] = [];
    const values: string[] = [];

    events.forEach((event, i) => {
      const baseIndex = i * columns.length;
      const rowPlaceholders = columns.map((_, j) => `$${baseIndex + j + 1}`).join(', ');
      placeholders.push(`(${rowPlaceholders})`);

      values.push(
        event.league,
        event.teamName,
        event.eventName,
        event.rawName,
        event.matchup,
        event.startDate,
        event.endDate,
        event.description,
        event.timeAndZone,
        event.location,
        event.offerURL,
        event.dayOfWeek,
      );
    });

    const query = `
        INSERT INTO events (${columns.join(', ')})
        VALUES ${placeholders.join(', ')}
    `;

    const result: QueryResult = await pool.query(query, values);
    res.status(201).json({ inserted: result.rowCount });
  } catch (err) {
    next(err);
  }
};

export const deleteEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid ID parameter' });
      return;
    }

    const { rows }: QueryResult<Event> = await pool.query(
      'DELETE FROM events WHERE id = $1 RETURNING *;',
      [id],
    );

    if (rows.length === 0) {
      res.status(404).json({ error: `Event with id ${id} not found` });
      return;
    }
    res.status(200).json({
      message: `Event with id ${id} was deleted`,
      deletedEvent: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNHLEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rowCount }: QueryResult = await pool.query('DELETE FROM events WHERE league = $1;', [
      'nhl',
    ]);

    res.status(200).json({
      message: 'All NHL events deleted successfully',
      deletedCount: rowCount,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteNBAEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rowCount }: QueryResult = await pool.query('DELETE FROM events WHERE league = $1;', [
      'nba',
    ]);

    res.status(200).json({
      message: 'All NBA events deleted successfully',
      deletedCount: rowCount,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rowCount }: QueryResult = await pool.query('DELETE FROM events;');

    res.status(200).json({
      message: 'All events deleted successfully',
      deletedCount: rowCount,
    });
  } catch (err) {
    next(err);
  }
};

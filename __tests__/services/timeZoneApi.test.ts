/**
 * Unit tests for TimeZoneDB API service.
 */

import { fetchTimeZoneList } from '../../src/services/timeZoneApi';

const mockFetch = jest.fn();

beforeEach(() => {
  global.fetch = mockFetch;
  mockFetch.mockReset();
});

describe('fetchTimeZoneList', () => {
  it('returns mapped time zones when API responds with OK', async () => {
    const mockZones = [
      {
        zoneName: 'America/New_York',
        countryCode: 'US',
        countryName: 'United States',
        gmtOffset: -18000,
        timestamp: 1234567890,
      },
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'OK',
        zones: mockZones,
      }),
    });

    const result = await fetchTimeZoneList();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      zoneName: 'America/New_York',
      countryCode: 'US',
      countryName: 'United States',
      gmtOffset: -18000,
      timestamp: 1234567890,
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('list-time-zone'),
    );
  });

  it('throws when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchTimeZoneList()).rejects.toThrow(
      'TimeZoneDB request failed: 500 Internal Server Error',
    );
  });

  it('throws when API returns status FAILED', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'FAILED',
        message: 'Invalid API key',
      }),
    });

    await expect(fetchTimeZoneList()).rejects.toThrow('Invalid API key');
  });

  it('returns empty array when zones is empty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'OK', zones: [] }),
    });

    const result = await fetchTimeZoneList();

    expect(result).toEqual([]);
  });
});
